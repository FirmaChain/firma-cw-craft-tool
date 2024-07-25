import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Expires, FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';

export interface ITokenInfoState {
    success: boolean;

    contractAddress: string;
    codeId: string;
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
    fctAmount: string;
}

interface IAllowanceBalanceState {
    success: boolean;
    blockHeight: string;
    data: {
        allowance: string;
        expires: Expires;
    };
}

const useExecuteHook = () => {
    const { enqueueSnackbar } = useSnackbar();

    const network = useSelector((state: rootState) => state.global.network);

    const MAINNET_SDK = new FirmaSDK(CRAFT_CONFIGS.MAINNET.FIRMACHAIN_CONFIG);
    const TESTNET_SDK = new FirmaSDK(CRAFT_CONFIGS.TESTNET.FIRMACHAIN_CONFIG);
    const firmaSDK = network === 'MAINNET' ? MAINNET_SDK : TESTNET_SDK;

    const getContractTokenInfo = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData: ITokenInfoState = {
                success: false,

                contractAddress: '',
                codeId: '',
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
                fctAmount: '',
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
                const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress);
                const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress);
                const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress);
                const balanceInfo = await firmaSDK.Cw20.getBalance(contractAddress, address);
                const fctBalanceInfo = await firmaSDK.Bank.getBalance(address);

                resultData.success = true;
                resultData.contractAddress = contractInfo.address;
                resultData.codeId = contractInfo.contract_info.code_id;
                resultData.label = contractInfo.contract_info.label;

                resultData.tokenName = tokenInfo.name;
                resultData.tokenSymbol = tokenInfo.symbol;
                resultData.decimals = tokenInfo.decimals.toString();
                resultData.totalSupply = tokenInfo.total_supply;
                
                resultData.minter.minter = minterInfo && minterInfo.minter;
                resultData.minter.cap = minterInfo && minterInfo.cap;
                
                resultData.marketingLogoUrl = marketingInfo.logo?.url || '';
                resultData.marketingDescription = marketingInfo.description;
                resultData.marketingAddress = marketingInfo.marketing;
                resultData.marketingProject = marketingInfo.project;

                resultData.addressAmount = balanceInfo;
                resultData.fctAmount = fctBalanceInfo;
            } catch (error) {
                resultData.success = false;
            } finally {
                return resultData;
            }
        },
        [firmaSDK, enqueueSnackbar]
    );

    const getCw20Balance = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData = {
                success: true,
                balance: ''
            };

            if (!firmaSDK) return resultData;

            try {
                const balance = await firmaSDK.Cw20.getBalance(contractAddress, address);
                resultData.balance = balance;
            } catch (error) {
                resultData.success = false;
            } finally {
                return resultData;
            }
        },
        [firmaSDK, enqueueSnackbar]
    );

    const getCw20AllowanceBalance = useCallback(
        async (contractAddress: string, owner: string, spender: string) => {
            const resultData: IAllowanceBalanceState = {
                success: true,
                blockHeight: '0',
                data: {
                    allowance: '',
                    expires: {
                        at_height: 0
                    }
                }
            };

            if (!firmaSDK) return resultData;

            try {
                const allowance = await firmaSDK.Cw20.getAllowance(contractAddress, owner, spender);
                const blockHeight = (await firmaSDK.BlockChain.getChainSyncInfo()).latest_block_height;

                resultData.blockHeight = blockHeight;
                resultData.data = allowance;
            } catch (error) {
                console.log(error);
                resultData.success = false;
            } finally {
                return resultData;
            }
        },
        [firmaSDK, enqueueSnackbar]
    );

    return {
        firmaSDK,
        getContractTokenInfo,
        getCw20Balance,
        getCw20AllowanceBalance
    };
};

export default useExecuteHook;
