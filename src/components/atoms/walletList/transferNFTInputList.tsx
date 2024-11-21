import React, { useEffect, useMemo } from 'react';
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
import Icons from '../icons';
import useModalStore from '@/store/modalStore';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import TransferNFTInput from '../input/transferNFTInput';
import { IExecuteTransfer } from '@/interfaces/cw721';
import AddWalletButton from '../buttons/addWalletButton';

interface IProps {
    list: IExecuteTransfer[];
    maxWalletCount?: number;
    onChangeWalletList: (walletList: IExecuteTransfer[]) => void;
}

const TransferNFTInputList = ({ list, maxWalletCount = 20, onChangeWalletList }: IProps) => {
    const modal = useModalStore();

    const handleAddWallet = () => {
        onChangeWalletList([...list, { recipient: '', token_ids: [], id: v4() }]);
    };

    const handleRemoveWallet = (index: number) => {
        if (list.length !== 1) {
            const newWalletList = list.filter((_, i) => i !== index);

            onChangeWalletList(newWalletList);
        }
    };

    const handleChange = (index: number, field: keyof IExecuteTransfer, value: string) => {
        if (field === 'token_ids') {
            const parsedTokenIds = value.split(',');

            const newWalletList = list.map((item, i) => (i === index ? { ...item, [field]: parsedTokenIds } : item));
            onChangeWalletList(newWalletList);
        } else {
            const newWalletList = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
            onChangeWalletList(newWalletList);
        }
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        onChangeWalletList([{ recipient: '', token_ids: [], id: v4() }]);
                    }}
                />
            )
        });
    };

    const enableDeleteAll = list.length > 1 || list.some((v) => v.recipient !== '' || v.token_ids.filter((v) => v !== '').length > 0);

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
                <DeleteAllButton disabled={!enableDeleteAll} $length={list.length} onClick={handleDeleteAll}>
                    <span className="button-text">Delete All</span>
                </DeleteAllButton>
            </WalletListSummery>
            {list.map((wallet, index) => (
                <TransferNFTInput
                    key={index}
                    index={index + 1}
                    leftValue={wallet.recipient}
                    rightValue={wallet.token_ids.join(',')}
                    onChangeLeft={(value) => handleChange(index, 'recipient', value)}
                    onChangeRight={(value) => handleChange(index, 'token_ids', value)}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === list.length - 1}
                    isValid={true}
                    leftTitle={'Recipient Address'}
                    leftPlaceholder={'Input Wallet Address'}
                    rightTitle="Token ID"
                    rightPlaceholder="Input the numbers : You can input multiple numbers separated by commas (,)"
                    inputId={wallet.id}
                    allList={list}
                />
            ))}
            <AddWalletButton disabled={list.length === 20} count={list.length} maxCount={maxWalletCount} onClick={handleAddWallet} />
        </WalletListWrapper>
    );
};

export default React.memo(TransferNFTInputList);
