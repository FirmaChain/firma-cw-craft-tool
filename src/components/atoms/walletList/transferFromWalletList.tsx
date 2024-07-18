import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import {
    AddWalletTypo,
    AddWalletWrapper,
    MaxWalletCountTypo,
    NowWalletCountTypo,
    TotalWalletTypo,
    TotalWalletWrapper,
    WalletCountWrapper,
    WalletListSummery,
    WalletListWrapper,
    DeleteAllButton
} from './style';

import Icons from '../icons';
import { useSnackbar } from 'notistack';
import TransferFromWalletInput from '../input/transferFromWalletInput';

import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';
import { useContractContext } from '@/components/organisms/execute/context/contractContext';
import useExecuteHook from '@/components/organisms/execute/hooks/useExecueteHook';
import { isValidAddress } from '@/utils/address';
import { isAtHeight, isAtTime, isNever } from '@/utils/allowance';
import { compareStringNumbers } from '@/utils/balance';
import { getCurrentUTCTimeStamp, removeNanoSeconds } from '@/utils/time';

interface IProps {
    decimals: string;
    maxWalletCount?: number;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
    transferList: ITransferFrom[];
    setTransferList: (newList: ITransferFrom[]) => void;
}

const generateId = () => {
    return v4();
};

const TransferFromWalletList = ({ decimals, maxWalletCount = 20, transferList, setTransferList }: IProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { _contract } = useContractContext();
    const { getCw20Balance, getCw20AllowanceBalance } = useExecuteHook();

    const [validity, setValidity] = useState<boolean[]>([true]);
    const [updateIndex, setUpdateIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _walletList = [...transferList];

                if (transferList[updateIndex] !== undefined) {
                    const newTransfer: ITransferFrom = {
                        fromAddress: transferList[updateIndex].fromAddress,
                        fromAmount: transferList[updateIndex].fromAmount,
                        toAddress: transferList[updateIndex].toAddress,
                        toAmount: transferList[updateIndex].toAmount,
                        allowanceAmount: transferList[updateIndex].allowanceAmount,
                        id: transferList[updateIndex].id
                    };
                    
                    if (isValidAddress(transferList[updateIndex].fromAddress)) {
    
                        const response = await getCw20Balance(_contract, transferList[updateIndex].fromAddress);
                        if (response.success === true) {
                            newTransfer.fromAmount = response.balance;
                            _walletList[updateIndex] = newTransfer;
    
                            setTransferList(_walletList);
                        }
                    } else {
                        newTransfer.fromAmount = "0";
                        _walletList[updateIndex] = newTransfer;
    
                        setTransferList(_walletList);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [_contract, transferList[updateIndex] && transferList[updateIndex].fromAddress]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _walletList = [...transferList];

                if (isValidAddress(transferList[updateIndex].fromAddress) && isValidAddress(transferList[updateIndex].toAddress)) {
                    const newTransfer: ITransferFrom = {
                        fromAddress: transferList[updateIndex].fromAddress,
                        fromAmount: transferList[updateIndex].fromAmount,
                        toAddress: transferList[updateIndex].toAddress,
                        toAmount: transferList[updateIndex].toAmount,
                        allowanceAmount: transferList[updateIndex].allowanceAmount,
                        id: transferList[updateIndex].id
                    };

                    console.log('FIRST NEW TRANSFER', newTransfer);
                    const { success, blockHeight, data } = await getCw20AllowanceBalance(_contract, transferList[updateIndex].fromAddress, transferList[updateIndex].toAddress);
                    console.log('SUCCESS', success);
                    if (success === true) {
                        const { allowance, expires} = data;

                        console.log('EXPIRES', expires);
                        if (isAtHeight(expires)) {
                            const compareHeight = compareStringNumbers(expires.at_height.toString(), blockHeight);
                            if (compareHeight === 1) {
                                newTransfer.allowanceAmount = allowance;
                            } else {
                                newTransfer.allowanceAmount = "0";
                            }
                        } else if (isAtTime(expires)) {
                            const allowanceTime = removeNanoSeconds(expires.at_time);
                            const timeStamp = getCurrentUTCTimeStamp()
                            const compareTime = compareStringNumbers(allowanceTime, timeStamp);
                            
                            console.log('COMPARE TIME', compareTime);

                            if (compareTime === 1) {
                                console.log('ALLOWANCE AMOUNT', allowance);
                                console.log('UPDATE INDEX', updateIndex);
                                console.log('NEW TRANSFER', newTransfer[updateIndex]);
                                newTransfer.allowanceAmount = allowance;
                            } else {
                                newTransfer.allowanceAmount = "0";
                            }
                            console.log(`NEW TRANSFER`, newTransfer);
                        } else if (isNever(expires)) {
                            console.log('Never expires');
                            newTransfer.allowanceAmount = allowance;
                        }

                        console.log('WALLET LIST', _walletList);
                        _walletList[updateIndex] = newTransfer;
                        setTransferList(_walletList);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [_contract, transferList[updateIndex] && transferList[updateIndex].fromAddress, transferList[updateIndex] && transferList[updateIndex].toAddress]);

    const handleAddWallet = () => {
        if (transferList.length < maxWalletCount) {
            setTransferList([...transferList, { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: generateId() }]);
        } else {
            enqueueSnackbar(`You can only add up to ${maxWalletCount} wallets.`, {
                variant: 'info',
                autoHideDuration: 2000
            });
        }
    };

    const handleRemoveWallet = (index: number) => {
        if (transferList.length !== 1) {
            const newWalletList = transferList.filter((_, i) => i !== index);
            const newValidity = validity.filter((_, i) => i !== index);
            setTransferList(newWalletList);
            setValidity(newValidity);
        }
    };

    const handleWalleInfoChange = (index: number, value: ITransferFrom) => {
        const _walletList = [...transferList];

        _walletList[index] = value;

        setUpdateIndex(index);
        setTransferList(_walletList);
    };

    const handleDeleteAll = () => {
        setTransferList([{ fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: generateId() }]);
        setValidity([true]);
    };

    return (
        <WalletListWrapper>
            <WalletListSummery>
                <TotalWalletWrapper>
                    <TotalWalletTypo>Total Wallet</TotalWalletTypo>
                    <WalletCountWrapper>
                        <NowWalletCountTypo>{transferList.length}</NowWalletCountTypo>
                        <MaxWalletCountTypo>{`/${maxWalletCount}`}</MaxWalletCountTypo>
                    </WalletCountWrapper>
                </TotalWalletWrapper>
                <DeleteAllButton disabled={transferList.length <= 1} $length={transferList.length} onClick={handleDeleteAll}>
                    <span className="button-text">Delete All</span>
                </DeleteAllButton>
            </WalletListSummery>
            {transferList.map((wallet, index) => {
                return (
                <TransferFromWalletInput
                    key={index}
                    index={index + 1}
                    transferFromInfo={wallet}
                    onChange={handleWalleInfoChange}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === transferList.length - 1}
                    isValid={validity[index]}
                    decimals={decimals}
                    inputId={wallet.id}
                    // onChangeAddress={(value) => handleChange(index, 'recipient', value)}
                    // onChangeAmount={(value) => handleChange(index, 'amount', value)}
                    // addressTitle={addressTitle}
                    // addressPlaceholder={addressPlaceholder}
                    // amountTitle={amountTitle}
                />
            )})}
            <AddWalletWrapper disabled={transferList.length === 20} onClick={handleAddWallet}>
                <Icons.Add width={'16px'} height={'16px'} />
                <AddWalletTypo>
                    Add (<span style={{ fontWeight: '600' }}>{transferList.length}</span>/{maxWalletCount})
                </AddWalletTypo>
            </AddWalletWrapper>
        </WalletListWrapper>
    );
};

export default React.memo(TransferFromWalletList);
