import React, { useEffect, useState } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
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

import { IWallet } from '@/interfaces/wallet';
import Icons from '../icons';
import { useSnackbar } from 'notistack';
import TransferFromWalletInput from '../input/transferFromWalletInput';

import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';

interface IProps {
    decimals: string;
    maxWalletCount?: number;
    onChangeWalletList: (walletList: IWallet[]) => void;
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

    const [validity, setValidity] = useState<boolean[]>([true]);

    const handleAddWallet = () => {
        if (transferList.length < maxWalletCount) {
            setTransferList([...transferList, { fromAddress: '', toAddress: '', amount: '', id: generateId() }]);
            // setValidity([...validity, true]);
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

    // const handleChange = (index: number, field: keyof IWallet, value: string) => {
    //     const newWalletList = walletList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    //     setWalletList(newWalletList);

    //     if (field === 'recipient') {
    //         const isValid = validateAddress(value);
    //         const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
    //         setValidity(newValidity);
    //     }
    // };

    const handleWalleInfoChange = (index, value: ITransferFrom) => {
        const _walletList = [...transferList];

        _walletList[index] = value;

        setTransferList(_walletList);
    };

    // const validateAddress = (value: string): boolean => {
    //     return FirmaUtil.isValidAddress(value);
    // };

    const handleDeleteAll = () => {
        setTransferList([{ fromAddress: '', toAddress: '', amount: '', id: generateId() }]);
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
            {transferList.map((wallet, index) => (
                <TransferFromWalletInput
                    key={index}
                    index={index + 1}
                    transfreFromInfo={wallet}
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
            ))}
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
