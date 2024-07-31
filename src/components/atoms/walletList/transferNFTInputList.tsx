import React, { useEffect, useMemo, useState } from 'react';
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
import InputAddressAmount from '../input/inputAddressAmount';
import Icons from '../icons';
import { useSnackbar } from 'notistack';
import { useModalStore } from '@/hooks/useModal';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import TransferNFTInput from '../input/transferNFTInput';

interface CW721TransferInfo {
    recipient: string;
    tokenId: string;
    id: string;
}

interface IProps {
    list: CW721TransferInfo[];
    maxWalletCount?: number;
    onChangeWalletList: (walletList: CW721TransferInfo[]) => void;
}

const TransferNFTInputList = ({ list, maxWalletCount = 20, onChangeWalletList }: IProps) => {
    // const isFetched = useExecuteStore((state) => state.isFetched);
    // const setIsFetched = useExecuteStore((v) => v.setIsFetched);

    const { enqueueSnackbar } = useSnackbar();
    const modal = useModalStore();

    // const [walletList, setWalletList] = useState<CW721TransferInfo[]>([{ recipient: '', amount: '', id: v4() }]);
    const [validity, setValidity] = useState<boolean[]>([true]);

    // useEffect(() => {
    //     if (list.length === 0) {
    //         handleAddWallet();
    //     }

    //     onChangeWalletList(list.map(({ id, ...rest }) => rest));
    // }, [list]);

    // useEffect(() => {
    //     if (isFetched) {
    //         setWalletList([{ recipient: '', amount: '', id: v4() }]);
    //         setValidity([true]);
    //         setIsFetched(false);
    //     }
    // }, [isFetched]);

    // const deleteAllStatus = useMemo(() => {
    //     if (walletList.length === 1) {
    //         if (walletList[0].amount !== '' || walletList[0].recipient !== '') {
    //             return false;
    //         }
    //     }

    //     if (walletList.length <= 1) {
    //         return true;
    //     }
    // }, [walletList]);

    const handleAddWallet = () => {
        if (list.length < maxWalletCount) {
            onChangeWalletList([...list, { recipient: '', tokenId: '', id: v4() }]);
            setValidity([...validity, true]);
        } else {
            enqueueSnackbar(`You can only add up to ${maxWalletCount} wallets.`, {
                variant: 'info',
                autoHideDuration: 2000
            });
        }
    };

    const handleRemoveWallet = (index: number) => {
        if (list.length !== 1) {
            const newWalletList = list.filter((_, i) => i !== index);
            const newValidity = validity.filter((_, i) => i !== index);
            onChangeWalletList(newWalletList);
            setValidity(newValidity);
        }
    };

    const handleChange = (index: number, field: keyof IWallet, value: string) => {
        const newWalletList = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        onChangeWalletList(newWalletList);

        if (field === 'recipient') {
            const isValid = validateAddress(value);
            const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
            setValidity(newValidity);
        }
    };

    const validateAddress = (value: string): boolean => {
        return FirmaUtil.isValidAddress(value);
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        onChangeWalletList([{ recipient: '', tokenId: '', id: v4() }]);
                        setValidity([true]);
                    }}
                />
            )
        });
    };

    return (
        <WalletListWrapper>
            <WalletListSummery>
                <TotalWalletWrapper>
                    <TotalWalletTypo>Total Wallet</TotalWalletTypo>
                    <WalletCountWrapper>
                        <NowWalletCountTypo>{list.length}</NowWalletCountTypo>
                        <MaxWalletCountTypo>{`/${maxWalletCount}`}</MaxWalletCountTypo>
                    </WalletCountWrapper>
                </TotalWalletWrapper>
                <DeleteAllButton disabled={list.length <= 1} $length={list.length} onClick={handleDeleteAll}>
                    <span className="button-text">Delete All</span>
                </DeleteAllButton>
            </WalletListSummery>
            {list.map((wallet, index) => (
                <TransferNFTInput
                    key={index}
                    index={index + 1}
                    leftValue={wallet.recipient}
                    rightValue={wallet.tokenId}
                    onChangeLeft={(value) => handleChange(index, 'recipient', value)}
                    onChangeRight={(value) => handleChange(index, 'amount', value)}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === list.length - 1}
                    isValid={true}
                    leftTitle={'Recipient Address'}
                    leftPlaceholder={'Input Wallet Address'}
                    rightTitle="Token ID"
                    rightPlaceholder="Input the numbers : You can input multiple numbers separated by commas (,)"
                    inputId={wallet.id}
                />
            ))}
            <AddWalletWrapper disabled={list.length === 20} onClick={handleAddWallet}>
                <Icons.Add width={'16px'} height={'16px'} />
                <AddWalletTypo>
                    Add (<span style={{ fontWeight: '600' }}>{list.length}</span>/{maxWalletCount})
                </AddWalletTypo>
            </AddWalletWrapper>
        </WalletListWrapper>
    );
};

export default React.memo(TransferNFTInputList);
