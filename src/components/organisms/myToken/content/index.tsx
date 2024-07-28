import React, { useCallback, useEffect, useState } from 'react';
import { ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, TokenTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useMyToken from '@/hooks/useMyToken';

import MyMintedTokenList from './mintedTokenList';
import { GlobalActions } from '@/redux/actions';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
// import NetworkSelect from '@/components/atoms/select/networkSelect';

// const menuItems = [
//     { value: '0', label: 'Newest' },
//     { value: '1', label: 'Oldest' },
//     { value: '2', label: 'Most Popular' },
//     { value: '4', label: 'Alphabetical' }
// ];

const MyTokenContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const { contracts, addContracts } = useCW20MyTokenContext();
    // const [selectSort, setSelectSort] = useState<number>(0);
    // const [contractList, setContractList] = useState<null | string[]>(null);

    const { getCW20ContractList } = useMyToken();

    const fetchTokenList = useCallback(async () => {
        const contract = await getCW20ContractList();
        addContracts(contract);
    }, [getCW20ContractList]);

    useEffect(() => {
        if (isInit) {
            GlobalActions.handleGlobalLoading(true);
            fetchTokenList();
        }

        return () => {
            GlobalActions.handleGlobalLoading(false);
        }
    }, [isInit, fetchTokenList]);

    const TokenListByInit = useCallback(() => {
        if (isInit) {
            return <MyMintedTokenList />
        } else {
            return <ConnectWallet />
        }
    }, [isInit])

    return (
        <ContentWrapper>
            <ContentControlWrapper>
                {/* <NetworkSelect
                    value={selectSort.toString()}
                    onChange={(v) => setSelectSort(Number(v))}
                    options={menuItems}
                    minWidth="182px"
                /> */}

                <ContentInfoWrapper style={{ opacity: contracts !== null && contracts?.length > 0 ? 1 : 0 }}>
                    <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                    <TokenTypo>Tokens</TokenTypo>
                </ContentInfoWrapper>
            </ContentControlWrapper>
            <TokenListByInit />
        </ContentWrapper>
    );
};

export default React.memo(MyTokenContent);
