import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ContentBox, ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, TokenTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useMyToken from '@/hooks/useMyToken';

import MyMintedTokenList from './mintedTokenList';
import { GlobalActions } from '@/redux/actions';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { IMenuItem } from '@/interfaces/common';
import { useSnackbar } from 'notistack';
import { useMyContractQuery } from '@/api/queries';
import NetworkSelect from '@/components/atoms/select/networkSelect';

const sortByItems: IMenuItem[] = [
    { value: 'newest', label: 'Newest', isDisabled: false },
    { value: 'oldest', label: 'Oldest', isDisabled: false },
    { value: 'alphabetical', label: 'Alphabetical', isDisabled: false }
];

const MyTokenContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((v: rootState) => v.wallet.address);

    const { contracts, addContracts } = useCW20MyTokenContext();
    const { enqueueSnackbar } = useSnackbar();

    const [showCount, setShowCount] = useState(false);

    const [sortBy, setSortBy] = useState(sortByItems[0].value);

    const sortInfo = useMemo(() => {
        if (sortBy === 'alphabetical') {
            return { sortBy: 'name', sortOrder: 'asc' };
        } else if (sortBy === 'newest') {
            return { sortBy: 'createdAt', sortOrder: 'desc' };
        } else {
            return { sortBy: 'createdAt', sortOrder: 'asc' };
        }
    }, [sortBy]);

    const { refetch: getMyContracts } = useMyContractQuery(
        { type: 'cw20', address, sortBy: sortInfo.sortBy, sortOrder: sortInfo.sortOrder as 'asc' | 'desc' },
        {
            enabled: false,
            onSuccess: ({ success, error, data: contracts }) => {
                if (!success) {
                    enqueueSnackbar({ message: 'Failed to get contract list. Please Try again later.', variant: 'error' });
                    return;
                }

                try {
                    addContracts(contracts);

                    if (contracts.length === 0) {
                        GlobalActions.handleGlobalLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                    GlobalActions.handleGlobalLoading(false);
                }
            },
            onError: (error: any) => {
                console.log(error);
                enqueueSnackbar({ message: 'Failed to get CW20 contract list.', variant: 'error' });
            }
        }
    );

    useEffect(() => {
        if (isInit) {
            getMyContracts();
        }

        return () => {
            GlobalActions.handleGlobalLoading(false);
        };
    }, [isInit, sortBy]);

    const TokenListByInit = useCallback(() => {
        if (isInit) {
            return <MyMintedTokenList handleShowCount={(v) => setShowCount(v)} />;
        } else {
            return <ConnectWallet />;
        }
    }, [isInit]);

    const handleChangeMenu = (menu: string) => {
        const _selectMenu = sortByItems.find((item) => item.value === menu);

        setSortBy(_selectMenu.value);
    };

    return (
        <ContentBox>
            <div
                style={{
                    width: '100%',
                    display: address ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 96px'
                }}
            >
                <ContentControlWrapper style={{ opacity: showCount ? 1 : 0, transition: 'opacity 0.2s' }}>
                    <NetworkSelect value={sortBy} options={sortByItems} onChange={handleChangeMenu} minWidth="150px" />
                    <ContentInfoWrapper style={{ opacity: showCount ? 1 : 0, transition: 'opacity 0.2s' }}>
                        <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                        <TokenTypo>Tokens</TokenTypo>
                    </ContentInfoWrapper>
                </ContentControlWrapper>
            </div>
            <ContentWrapper>
                <TokenListByInit />
            </ContentWrapper>
        </ContentBox>
    );
};

export default React.memo(MyTokenContent);
