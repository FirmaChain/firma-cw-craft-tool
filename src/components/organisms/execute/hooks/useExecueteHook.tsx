import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../../../../redux/reducers';
import { NETWORKS } from '../../../../constants/common';
import { CRAFT_CONFIGS } from '../../../../config';

export interface ITokenInfoState {
    success: boolean;

    contractAddress: string;
    label: string;

    tokenName: string;
    tokenSymbol: string;
    decimals: string;
    totalSupply: string;

    minter: {
        minter: string;
        cap: string;
    };

    marketingLogoUrl: string;
    marketingDescription: string;
    marketingProject: string;
    marketingAddress: string;

    addressAmount: string;
}

const useExecuteHook = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { network } = useSelector((state: rootState) => state.global);

    const firmaSDK = useCallback(() => {
        const craftConfig = network === NETWORKS[0] ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

        const _firmaSDK = new FirmaSDK(craftConfig.FIRMACHAIN_CONFIG);
        return _firmaSDK;
    }, [network]);

    const getContractTokenInfo = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData: ITokenInfoState = {
                success: false,

                contractAddress: '',
                label: '',

                tokenName: '',
                tokenSymbol: '',
                decimals: '',
                totalSupply: '',

                minter: {
                    minter: '',
                    cap: ''
                },

                marketingLogoUrl: '',
                marketingDescription: '',
                marketingProject: '',
                marketingAddress: '',

                addressAmount: '',
            };

            if (!firmaSDK()) return resultData;

            try {
                const contractInfo = await firmaSDK().CosmWasm.getContractInfo(contractAddress);
                const tokenInfo = await firmaSDK().Cw20.getTokenInfo(contractAddress);
                const minterInfo = await firmaSDK().Cw20.getMinter(contractAddress);
                const marketingInfo = await firmaSDK().Cw20.getMarketingInfo(contractAddress);
                const balanceInfo = await firmaSDK().Cw20.getBalance(contractAddress, address)

                resultData.success = true;
                resultData.contractAddress = contractInfo.address;
                resultData.label = contractInfo.contract_info.label;

                resultData.tokenName = tokenInfo.name;
                resultData.tokenSymbol = tokenInfo.symbol;
                resultData.decimals = tokenInfo.decimals.toString();
                resultData.totalSupply = tokenInfo.total_supply;

                resultData.minter.minter = minterInfo.minter;
                resultData.minter.cap = minterInfo.cap;

                resultData.marketingLogoUrl = marketingInfo.logo.url;
                resultData.marketingDescription = marketingInfo.description;
                resultData.marketingAddress = marketingInfo.marketing;
                resultData.marketingProject = marketingInfo.project;

                resultData.addressAmount = balanceInfo;
            } catch (error) {
                resultData.success = false;
            } finally {
                return resultData;
            }
        },
        [firmaSDK, enqueueSnackbar]
    );

    return {
        getContractTokenInfo
    };
};

export default useExecuteHook;
