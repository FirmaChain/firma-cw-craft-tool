import React, { useCallback, useEffect } from 'react';
import { ContentBox, ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, ContracTypo } from './style';
import ConnectWallet from './connectWallet';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import MyContractList from './contractList';
import { GlobalActions } from '@/redux/actions';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
// import NetworkSelect from '@/components/atoms/select/networkSelect';

// const menuItems = [
//     { value: '0', label: 'Newest' },
//     { value: '1', label: 'Oldest' },
//     { value: '2', label: 'Most Popular' },
//     { value: '4', label: 'Alphabetical' }
// ];

const MyNFTContent = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const { contracts, addContracts } = useCW721NFTContractsContext();
    const { getCW721ContractList } = useMyNFTContracts();

    const fetchTokenList = useCallback(async () => {
        try {
            const contract = await getCW721ContractList();
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
            GlobalActions.handleGlobalLoading(true);
            fetchTokenList();
        }

        return () => {
            GlobalActions.handleGlobalLoading(false);
        }
    }, [isInit, fetchTokenList]);

    const ContractListByInit = useCallback(() => {
        if (isInit) {
            return <MyContractList />
        } else {
            return <ConnectWallet />
        }
    }, [isInit])

    return (
        <ContentBox>
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
                        <ContracTypo>Contracts</ContracTypo>
                    </ContentInfoWrapper>
                </ContentControlWrapper>
                <ContractListByInit />
            </ContentWrapper>
        </ContentBox>
    );
};

export default React.memo(MyNFTContent);
