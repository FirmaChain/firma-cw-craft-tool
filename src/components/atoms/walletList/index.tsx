import React, { useEffect, useMemo, useState } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
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
import { useSnackbar } from 'notistack';
import useModalStore from '@/store/modalStore';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
// import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import AddWalletButton from '../buttons/addWalletButton';
import { isValidAddress } from '@/utils/address';
import { useCW20Execute } from '@/context/cw20ExecuteContext';

interface IProps {
    decimals: string;
    maxWalletCount?: number;
    onChangeWalletList: (walletList: IWallet[]) => void;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
}

interface IWalletWithID extends IWallet {
    id: string;
}

const WalletList = ({ decimals, maxWalletCount = 20, onChangeWalletList, addressTitle, addressPlaceholder, amountTitle }: IProps) => {
    const context = useCW20Execute();
    const isFetched = context.isFetched;
    const setIsFetched = context.setIsFetched;

    const { enqueueSnackbar } = useSnackbar();
    const modal = useModalStore();

    const [walletList, setWalletList] = useState<IWalletWithID[]>([{ recipient: '', amount: '', id: v4() }]);
    const [validity, setValidity] = useState<boolean[]>([true]);

    useEffect(() => {
        if (walletList.length === 0) {
            handleAddWallet();
        }

        onChangeWalletList(walletList.map(({ id, ...rest }) => rest));
    }, [walletList]);

    useEffect(() => {
        if (isFetched) {
            setWalletList([{ recipient: '', amount: '', id: v4() }]);
            setValidity([true]);
            setIsFetched(false);
        }
    }, [isFetched]);

    const deleteAllStatus = useMemo(() => {
        if (walletList.length === 1) {
            if (walletList[0].amount !== '' || walletList[0].recipient !== '') {
                return false;
            }
        }

        if (walletList.length <= 1) {
            return true;
        }
    }, [walletList]);

    const handleAddWallet = () => {
        if (walletList.length < maxWalletCount) {
            setWalletList([...walletList, { recipient: '', amount: '', id: v4() }]);
            setValidity([...validity, true]);
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
            const newValidity = validity.filter((_, i) => i !== index);
            setWalletList(newWalletList);
            setValidity(newValidity);
        }
    };

    const handleChange = (index: number, field: keyof IWallet, value: string) => {
        const newWalletList = walletList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        setWalletList(newWalletList);

        if (field === 'recipient') {
            const isValid = isValidAddress(value);
            const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
            setValidity(newValidity);
        }
    };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        setWalletList([{ recipient: '', amount: '', id: v4() }]);
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
                        <NowWalletCountTypo>{walletList.length}</NowWalletCountTypo>
                        <MaxWalletCountTypo>{`/${maxWalletCount}`}</MaxWalletCountTypo>
                    </WalletCountWrapper>
                </TotalWalletWrapper>
                <DeleteAllButton disabled={deleteAllStatus} $length={walletList.length} onClick={handleDeleteAll}>
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
                    isValid={validity[index]}
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

export default React.memo(WalletList);
