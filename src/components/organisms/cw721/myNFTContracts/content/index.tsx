import React, { useCallback, useEffect, useState } from 'react';
import { ContentBox, ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, ContracTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import MyContractList from './contractList';
import { GlobalActions } from '@/redux/actions';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';

const MyNFTContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const { contracts, addContracts } = useCW721NFTContractsContext();
    const { getCW721ContractList } = useMyNFTContracts();

    const [showCount, setShowCount] = useState(false);

    const fetchTokenList = useCallback(async () => {
        try {
            const contract = await getCW721ContractList();
            console.log('fetchTokenList : ', contract);

            addContracts(contract);
            if (contract.length === 0) {
                GlobalActions.handleGlobalLoading(false);
            }
        } catch (error) {
            console.log(error);
            GlobalActions.handleGlobalLoading(false);
        }
    }, [getCW721ContractList]);

    useEffect(() => {
        if (isInit) {
            // GlobalActions.handleGlobalLoading(true);
            fetchTokenList();
        }

        return () => {
            GlobalActions.handleGlobalLoading(false);
        };
    }, [isInit, fetchTokenList]);

    const ContractListByInit = useCallback(() => {
        if (isInit) {
            return <MyContractList handleShowCount={(v) => setShowCount(v)} />;
        } else {
            return <ConnectWallet />;
        }
    }, [isInit]);

    return (
        <ContentBox>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 96px' }}>
                <ContentControlWrapper>
                    <ContentInfoWrapper style={{ opacity: showCount ? 1 : 0, transition: 'opacity 0.2s' }}>
                        <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                        <ContracTypo>Contracts</ContracTypo>
                    </ContentInfoWrapper>
                </ContentControlWrapper>
            </div>
            <ContentWrapper>
                <ContractListByInit />
            </ContentWrapper>
        </ContentBox>
    );
};

export default React.memo(MyNFTContent);
