import React, { useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';

import {
    MaxWalletCountTypo,
    NowWalletCountTypo,
    TotalWalletTypo,
    TotalWalletWrapper,
    WalletCountWrapper,
    WalletListSummery,
    WalletListWrapper,
    DeleteAllButton
} from './style';

import { useSnackbar } from 'notistack';
import TransferFromWalletInput from '../input/transferFromWalletInput';

import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';
import { addStringAmount, compareStringNumbers, getTokenAmountFromUToken } from '@/utils/balance';
import { useModalStore } from '@/hooks/useModal';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import AddWalletButton from '../buttons/addWalletButton';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import useFormStore from '@/store/formStore';

interface IProps {
    contractAddress: string;
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

const TransferFromWalletList = ({ contractAddress, decimals, maxWalletCount = 20, transferList, setTransferList }: IProps) => {
    // const address = useSelector((state: rootState) => state.wallet.address);

    const { enqueueSnackbar } = useSnackbar();
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);
    const allowanceByAddress = useExecuteStore((v) => v.allowanceByAddress);
    const balanceByAddress = useExecuteStore((v) => v.balanceByAddress);

    const modal = useModalStore();

    const [validity, setValidity] = useState<boolean[]>([true]);
    // const [updateIndex, setUpdateIndex] = useState<number>(0);

    const totalAmountByAddress = useMemo(() => {
        const result: Record<string, string> = {};

        transferList.map(({ fromAddress, toAmount }) => {
            const _addr = fromAddress.toLowerCase();

            if (!result[_addr]) result[_addr] = '';

            result[_addr] = addStringAmount(result[_addr], toAmount);
        });

        return result;
    }, [transferList]);

    useEffect(() => {
        transferList.forEach(({ id, toAmount, fromAddress }) => {
            if (toAmount !== '') {
                const _addr = fromAddress.toLowerCase();

                const requiredBalance = totalAmountByAddress[_addr] || '0';
                const ownerBalance = balanceByAddress[_addr] || '0';
                const ownerAllowance = allowanceByAddress[_addr] || '0';

                if (
                    compareStringNumbers(requiredBalance, ownerBalance) > 0 ||
                    compareStringNumbers(requiredBalance, getTokenAmountFromUToken(ownerAllowance, decimals)) > 0
                ) {
                    setFormError({ id: `${id}_TO_AMOUNT`, type: 'EXCEED_AVAIL_AMOUNT', message: 'Input exceeds the allowance.' });
                } else {
                    clearFormError({ id: `${id}_TO_AMOUNT`, type: 'EXCEED_AVAIL_AMOUNT' });
                }
            }
        });
    }, [allowanceByAddress, balanceByAddress, decimals, totalAmountByAddress, transferList]);

    const handleAddWallet = () => {
        if (transferList.length < maxWalletCount) {
            setTransferList([
                ...transferList,
                { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: generateId() }
            ]);
        } else {
            enqueueSnackbar(`You can only add up to ${maxWalletCount} wallets.`, {
                variant: 'warning',
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

        setTransferList(_walletList);
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        setTransferList([
                            { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: generateId() }
                        ]);
                        setValidity([true]);
                    }}
                />
            )
        });
    };

    const enableDeleteAll =
        transferList.length > 1 || transferList.some((v) => v.fromAddress !== '' || v.toAddress !== '' || v.toAmount !== '');

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
                <DeleteAllButton disabled={!enableDeleteAll} $length={transferList.length} onClick={handleDeleteAll}>
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
                        isLast={transferList.length === 1}
                        isValid={validity[index]}
                        decimals={decimals}
                        inputId={wallet.id}
                    />
                );
            })}
            <AddWalletButton
                disabled={transferList.length === 20}
                count={transferList.length}
                maxCount={maxWalletCount}
                onClick={handleAddWallet}
            />
        </WalletListWrapper>
    );
};

export default React.memo(TransferFromWalletList);
