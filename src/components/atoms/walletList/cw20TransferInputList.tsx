import React from 'react';
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

import { IWallet } from '@/interfaces/wallet';
import Icons from '../icons';
import useModalStore from '@/store/modalStore';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import Cw20TransferInput from '../input/cw20TransferInput';
import AddWalletButton from '../buttons/addWalletButton';

interface IProps {
    list: IWallet[];
    decimals: string;
    maxWalletCount?: number;
    onChangeWalletList: (walletList: IWallet[]) => void;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
}

const CW20TransferInputList = ({
    list,
    decimals,
    maxWalletCount = 20,
    onChangeWalletList,
    addressTitle,
    addressPlaceholder,
    amountTitle
}: IProps) => {
    const modal = useModalStore();

    const handleAddWallet = () => {
        onChangeWalletList([...list, { recipient: '', amount: '', id: v4() }]);
    };

    const handleRemoveWallet = (index: number) => {
        if (list.length > 1) {
            const newWalletList = list.filter((_, i) => i !== index);

            onChangeWalletList(newWalletList);
        }
    };

    const handleAddress = (index: number, value: string) => {
        const newWalletList = list.map((item, i) => (i === index ? { ...item, recipient: value } : item));
        onChangeWalletList(newWalletList);
    };

    const handleAmount = (index: number, value: string) => {
        const newWalletList = list.map((item, i) => (i === index ? { ...item, amount: value } : item));
        onChangeWalletList(newWalletList);
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        onChangeWalletList([{ recipient: '', amount: '', id: v4() }]);
                    }}
                />
            )
        });
    };

    const enableDeleteAll = list.length > 1 || list.some((v) => v.amount !== '' || v.recipient !== '');

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
                <Cw20TransferInput
                    key={index}
                    index={index + 1}
                    address={wallet.recipient}
                    amount={wallet.amount}
                    onChangeAddress={(value) => handleAddress(index, value)}
                    onChangeAmount={(value) => handleAmount(index, value)}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === list.length - 1}
                    decimals={decimals}
                    addressTitle={addressTitle}
                    addressPlaceholder={addressPlaceholder}
                    amountTitle={amountTitle}
                    isValid={true}
                    inputId={wallet.id}
                />
            ))}
            <AddWalletButton disabled={list.length === 20} count={list.length} maxCount={maxWalletCount} onClick={handleAddWallet} />
        </WalletListWrapper>
    );
};

export default React.memo(CW20TransferInputList);
