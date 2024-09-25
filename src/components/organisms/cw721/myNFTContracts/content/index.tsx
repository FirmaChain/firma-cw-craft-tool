import React, { useCallback, useEffect, useState } from 'react';
import { ContentBox, ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, ContracTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import MyContractList from './contractList';
import { GlobalActions } from '@/redux/actions';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import { useMyContractQuery } from '@/api/queries';
import NetworkSelect from '@/components/atoms/select/networkSelect';
import { IMenuItem } from '@/interfaces/common';
import { useSnackbar } from 'notistack';

const sortByItems: IMenuItem[] = [
    { value: 'name', label: 'Name', isDisabled: false },
    { value: 'createdAt', label: 'Created At', isDisabled: false }
];

const MyNFTContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((v: rootState) => v.wallet.address);

    const { contracts, addContracts } = useCW721NFTContractsContext();
    const { enqueueSnackbar } = useSnackbar();

    const [showCount, setShowCount] = useState(false);

    const [sortBy, setSortBy] = useState(sortByItems[0].value);

    const { refetch: getMyContracts } = useMyContractQuery(
        { type: 'cw721', address, sortBy, sortOrder: 'desc' },
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

    const ContractListByInit = useCallback(() => {
        if (isInit) {
            return <MyContractList handleShowCount={(v) => setShowCount(v)} />;
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
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 96px' }}>
                <ContentControlWrapper style={{ opacity: showCount ? 1 : 0, transition: 'opacity 0.2s' }}>
                    <ContentInfoWrapper>
                        <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                        <ContracTypo>Contracts</ContracTypo>
                    </ContentInfoWrapper>
                    <NetworkSelect value={sortBy} options={sortByItems} onChange={handleChangeMenu} minWidth="140px" />
                </ContentControlWrapper>
            </div>
            <ContentWrapper>
                <ContractListByInit />
            </ContentWrapper>
        </ContentBox>
    );
};

export default React.memo(MyNFTContent);
