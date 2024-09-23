import React, { useCallback, useEffect, useState } from 'react';
import { ContentBox, ContentInfoWrapper, ContentWrapper, ContractCountTypo, TokenTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useMyToken from '@/hooks/useMyToken';

import MyMintedTokenList from './mintedTokenList';
import { GlobalActions } from '@/redux/actions';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';

const MyTokenContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const { contracts, addContracts } = useCW20MyTokenContext();
    const [showCount, setShowCount] = useState(false);

    const { getCW20ContractList } = useMyToken();

    const fetchTokenList = useCallback(async () => {
        try {
            const contract = await getCW20ContractList();

            addContracts(contract);
            if (contract.length === 0) {
                GlobalActions.handleGlobalLoading(false);
            }
        } catch (error) {
            console.log(error);
            GlobalActions.handleGlobalLoading(false);
        }
    }, [getCW20ContractList]);

    useEffect(() => {
        if (isInit) {
            fetchTokenList();
        }

        return () => {
            GlobalActions.handleGlobalLoading(false);
        };
    }, [isInit, fetchTokenList]);

    const TokenListByInit = useCallback(() => {
        if (isInit) {
            return <MyMintedTokenList handleShowCount={(v) => setShowCount(v)} />;
        } else {
            return <ConnectWallet />;
        }
    }, [isInit]);

    return (
        <ContentBox>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 96px' }}>
                <ContentInfoWrapper style={{ opacity: showCount ? 1 : 0, transition: 'opacity 0.2s' }}>
                    <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                    <TokenTypo>Tokens</TokenTypo>
                </ContentInfoWrapper>
            </div>
            <ContentWrapper>
                <TokenListByInit />
            </ContentWrapper>
        </ContentBox>
    );
};

export default React.memo(MyTokenContent);
