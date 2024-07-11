import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';

import { NETWORKS } from '../constants/common';

import { CRAFT_CONFIGS } from '../config';
import { useSnackbar } from 'notistack';

const useMyToken = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { network } = useSelector((state: rootState) => state.global);
    const { address } = useSelector((state: rootState) => state.wallet);

    const [firmaSDK, setFirmaSDK] = useState<FirmaSDK | null>(null);
    const [codeId, setCodeId] = useState<string>('0');

    useEffect(() => {
        const initializeFirmaSDK = () => {
            const craftConfig = network === NETWORKS[0] ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

            const newFirmaSDK = new FirmaSDK(craftConfig.FIRMACHAIN_CONFIG);
            setFirmaSDK(newFirmaSDK);

            const codeId = craftConfig.CW20.CODE_ID;
            setCodeId(codeId);
        };
        initializeFirmaSDK();
    }, [network]);

    const getCW20ContractList = useCallback(async () => {
        if (!firmaSDK) return [];

        try {
            let contracts = await firmaSDK.CosmWasm.getContractListFromCodeId(codeId);

            const myContracts = [];

            for (const contract of contracts) {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contract);
                if (contractInfo.contract_info.admin === address) {
                    myContracts.push(contractInfo.address);
                }
            }

            return myContracts;
        } catch (error) {
            enqueueSnackbar(`failed get "CW20" contract list`, {
                variant: 'error',
                autoHideDuration: 2000
            });
            return [];
        }
    }, [firmaSDK, codeId, enqueueSnackbar]);

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
