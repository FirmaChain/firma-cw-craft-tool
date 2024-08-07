import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { CRAFT_CONFIGS } from '../config';
import { useSnackbar } from 'notistack';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const useMyToken = () => {
    const { enqueueSnackbar } = useSnackbar();

    const network = useSelector((state: rootState) => state.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);
    const { firmaSDK } = useFirmaSDKContext();

    //? remove lines for less re-rendering
    // const [firmaSDK, setFirmaSDK] = useState<FirmaSDK | null>(null);
    // const [basicCodeId, setBasicCodeId] = useState<string>('0');
    // const [advancedCodeId, setAdvancedCodeId] = useState<string>('0');
    // useEffect(() => {
    //     const initializeFirmaSDK = () => {
    //         const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

    //         const newFirmaSDK = new FirmaSDK(craftConfig.FIRMACHAIN_CONFIG);
    //         setFirmaSDK(newFirmaSDK);

    //         setBasicCodeId(craftConfig.CW20.BASIC_CODE_ID);
    //         setAdvancedCodeId(craftConfig.CW20.ADVANCED_CODE_ID);
    //     };
    //     initializeFirmaSDK();
    // }, [network]);

    const curSDKConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

    const basicCodeId = curSDKConfig.CW20.BASIC_CODE_ID;
    const advancedCodeId = curSDKConfig.CW20.ADVANCED_CODE_ID;

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

            const contractInfoPromises = allContracts.map(async (contract) => firmaSDK.CosmWasm.getContractInfo(contract));

            const contractInfos = await Promise.all(contractInfoPromises);

            const myContracts = contractInfos
                .filter((contractInfo) => contractInfo.contract_info.admin === address)
                .map((contractInfo) => contractInfo.address);

            return myContracts;
        } catch (error) {
            enqueueSnackbar(`failed get "CW20 BASIC" contract list`, {
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
                const contractInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress);
                const { logo } = await firmaSDK.Cw20.getMarketingInfo(contractAddress);

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
