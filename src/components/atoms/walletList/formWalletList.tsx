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
import { useSnackbar } from 'notistack';
import { IWalletWithID } from '@/components/organisms/instantiate/instaniateStore';
import { useModalStore } from '@/hooks/useModal';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import AddWalletButton from '../buttons/addWalletButton';

interface IProps {
    walletList: IWalletWithID[];
    decimals: string;
    maxWalletCount?: number;
    setWalletList: (walletList: IWalletWithID[]) => void;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
}

const FormWalletList = ({
    walletList,
    decimals,
    maxWalletCount = 20,
    setWalletList,
    addressTitle,
    addressPlaceholder,
    amountTitle
}: IProps) => {
    const modal = useModalStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleAddWallet = () => {
        if (walletList.length < maxWalletCount) {
            setWalletList([...walletList, { recipient: '', amount: '', id: v4() }]);
        } else {
            enqueueSnackbar(`You can only add up to ${maxWalletCount} wallets.`, {
                variant: 'warning',
                autoHideDuration: 2000
            });
        }
    };

    const handleRemoveWallet = (index: number) => {
        if (walletList.length !== 1) {
            const newWalletList = walletList.filter((_, i) => i !== index);

            setWalletList(newWalletList);
        }
    };

    const handleChange = (index: number, field: keyof IWallet, value: string) => {
        const newWalletList = walletList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        setWalletList(newWalletList);
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <DeleteAllModal id={id} onConfirm={() => setWalletList([{ recipient: '', amount: '', id: v4() }])} />
        });
    };

    const enableDeleteAll = walletList.length > 1 || walletList.some((v) => v.amount !== '' || v.recipient !== '');

    return (
        <WalletListWrapper>
            <WalletListSummery>
                <TotalWalletWrapper>
                    <TotalWalletTypo>Total Wallet</TotalWalletTypo>
                    <WalletCountWrapper>
                        <NowWalletCountTypo>{walletList.length}</NowWalletCountTypo>
                        <MaxWalletCountTypo>{`/${maxWalletCount}`}</MaxWalletCountTypo>
                    </WalletCountWrapper>
                </TotalWalletWrapper>
                <DeleteAllButton disabled={!enableDeleteAll} $length={walletList.length} onClick={handleDeleteAll}>
                    <span className="button-text">Delete All</span>
                </DeleteAllButton>
            </WalletListSummery>
            {walletList.map((wallet, index) => (
                <InputAddressAmount
                    key={index}
                    index={index + 1}
                    address={wallet.recipient}
                    amount={wallet.amount}
                    onChangeAddress={(value) => handleChange(index, 'recipient', value)}
                    onChangeAmount={(value) => handleChange(index, 'amount', value)}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === walletList.length - 1}
                    isValid={true}
                    decimals={decimals}
                    addressTitle={addressTitle}
                    addressPlaceholder={addressPlaceholder}
                    amountTitle={amountTitle}
                    inputId={wallet.id}
                />
            ))}
            <AddWalletButton
                disabled={walletList.length === 20}
                count={walletList.length}
                maxCount={maxWalletCount}
                onClick={handleAddWallet}
            />
        </WalletListWrapper>
    );
};

export default React.memo(FormWalletList);
