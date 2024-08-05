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
import InputAddressAmount from '../input/inputAddressAmount';
import Icons from '../icons';
import { useModalStore } from '@/hooks/useModal';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
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

const CW721MintInput = ({
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

    const handleChange = (index: number, field: keyof IWallet, value: string) => {
        const newWalletList = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
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
                <InputAddressAmount
                    key={index}
                    index={index + 1}
                    address={wallet.recipient}
                    amount={wallet.amount}
                    onChangeAddress={(value) => handleChange(index, 'recipient', value)}
                    onChangeAmount={(value) => handleChange(index, 'amount', value)}
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

export default React.memo(CW721MintInput);
