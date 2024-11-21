import { useCallback } from 'react';

import { FirmaSDK } from '@firmachain/firma-js';

import { CRAFT_CONFIGS } from '../config';
import { useSnackbar } from 'notistack';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import useWalletStore from '@/store/walletStore';

const useMyToken = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { address } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);

    const { firmaSDK } = useFirmaSDKContext();

    const basicCodeId = CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    const advancedCodeId = CRAFT_CONFIGS.CW20.ADVANCED_CODE_ID;

    const getAllContracts = async (codeId: string): Promise<string[]> => {
        let allContracts: string[] = [];
        let nextKey = null;

        do {
            const response = await firmaSDK.CosmWasm.getContractListFromCodeId(codeId, nextKey);
            allContracts = allContracts.concat(response.dataList);
            nextKey = response.pagination.next_key;
        } while (nextKey);

        return allContracts;
    };

    const getCW20ContractList = useCallback(async () => {
        if (!firmaSDK) return [];

        try {
            const codeIds = [basicCodeId, advancedCodeId];

            const contractListsPromises = codeIds.map(async (codeId) => getAllContracts(codeId));
            const contractLists = await Promise.all(contractListsPromises);
            const allContracts = contractLists.flat();

            const contractInfoPromises = allContracts.map(async (contract) => firmaSDK.CosmWasm.getContractInfo(contract?.toLowerCase()));

            const contractInfos = await Promise.all(contractInfoPromises);

            const myContracts = contractInfos
                .filter((contractInfo) => contractInfo.contract_info.admin === address)
                .map((contractInfo) => contractInfo.address);

            return myContracts;
        } catch (error) {
            enqueueSnackbar(`failed get CW20 contract list`, {
                variant: 'error',
                autoHideDuration: 2000
            });
            return [];
        }
    }, [firmaSDK, address]);

    const getCW20ContractInfo = useCallback(
        async (contractAddress: string) => {
            const resultData = {
                contractAddress: contractAddress,
                tokenLogoUrl: '',
                tokenSymbol: '-',
                tokenName: '-',
                totalSupply: '0',
                decimals: 0
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
                const { logo } = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());

                resultData.tokenLogoUrl = logo !== null ? logo.url : '';
                resultData.tokenSymbol = contractInfo.symbol;
                resultData.tokenName = contractInfo.name;
                resultData.totalSupply = contractInfo.total_supply;
                resultData.decimals = contractInfo.decimals;

                return resultData;
            } catch (error) {
                enqueueSnackbar(`failed get '${contractAddress}' contract info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
                return resultData;
            }
        },
        [firmaSDK]
    );

    return {
        getCW20ContractList,
        getCW20ContractInfo
    };
};

export default useMyToken;
