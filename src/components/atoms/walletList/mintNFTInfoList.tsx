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

import Icons from '../icons';
import { useSnackbar } from 'notistack';
import { useModalStore } from '@/hooks/useModal';
import DeleteAllModal from '@/components/organisms/modal/deleteAllModal';
import NftMintInput from '../input/nftMintInput';

interface IMintInfo {
    token_id: string;
    token_uri: string;
    id: string;
}

interface IProps {
    list: IMintInfo[];
    maxWalletCount?: number;
    disableInput?: boolean;
    onChangeWalletList: (walletList: IMintInfo[]) => void;
    onClickDeleteAll?: () => void;
}

const MintNFTInfoList = ({ list, maxWalletCount = 20, onChangeWalletList, disableInput, onClickDeleteAll }: IProps) => {
    // const isFetched = useExecuteStore((state) => state.isFetched);
    // const setIsFetched = useExecuteStore((v) => v.setIsFetched);

    const { enqueueSnackbar } = useSnackbar();
    const modal = useModalStore();

    // const [validity, setValidity] = useState<boolean[]>([true]);

    // useEffect(() => {
    //     if (list.length === 0) {
    //         handleAddWallet();
    //     }

    //     onChangeWalletList(list);
    // }, [list]);

    // useEffect(() => {
    //     if (isFetched) {
    //         setWalletList([{ token_id: '', token_uri: '', id: v4() }]);
    //         setValidity([true]);
    //         setIsFetched(false);
    //     }
    // }, [isFetched]);

    const handleAddWallet = () => {
        if (list.length < maxWalletCount) {
            onChangeWalletList([...list, { token_id: '', token_uri: '', id: v4() }]);
            // setValidity([...validity, true]);
        } else {
            enqueueSnackbar(`You can only add up to ${maxWalletCount} wallets.`, {
                variant: 'info',
                autoHideDuration: 2000
            });
        }
    };

    const handleRemoveWallet = (index: number) => {
        if (list.length > 1) {
            const newWalletList = list.filter((_, i) => i !== index);
            // const newValidity = validity.filter((_, i) => i !== index);
            onChangeWalletList(newWalletList);

            // setValidity(newValidity);
        }
    };

    const handleChange = (index: number, field: 'token_id' | 'token_uri', value: string) => {
        const newWalletList = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        onChangeWalletList(newWalletList);

        // if (field === 'recipient') {
        //     const isValid = validateAddress(value);
        //     const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
        //     setValidity(newValidity);
        // }
    };

    // const validateAddress = (value: string): boolean => {
    //     return FirmaUtil.isValidAddress(value);
    // };

    const handleDeleteAll = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <DeleteAllModal
                    id={id}
                    onConfirm={() => {
                        onChangeWalletList([{ token_id: '', token_uri: '', id: v4() }]);
                        onClickDeleteAll && onClickDeleteAll();
                        // setValidity([true]);
                    }}
                />
            )
        });
    };

    return (
        <WalletListWrapper>
            <WalletListSummery>
                <TotalWalletWrapper>
                    <TotalWalletTypo>NFT</TotalWalletTypo>
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
                <NftMintInput
                    disabled={disableInput}
                    key={index}
                    index={index + 1}
                    leftValue={wallet.token_id}
                    rightValue={wallet.token_uri}
                    onChangeLeft={(value) => handleChange(index, 'token_id', value)}
                    onChangeRight={(value) => handleChange(index, 'token_uri', value)}
                    onRemoveClick={() => handleRemoveWallet(index)}
                    isLast={index === list.length - 1}
                    isValid={true}
                    leftTitle={'Token ID'}
                    leftPlaceholder={'0'}
                    rightTitle="NFT URIs"
                    rightPlaceholder="Input nft uri ends with ‘/’"
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

export default React.memo(MintNFTInfoList);
