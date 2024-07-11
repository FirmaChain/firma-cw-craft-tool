import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { NETWORKS } from '../constants/common';
import { CRAFT_CONFIGS } from '../config';

export interface IAllowances {
    Receiver: string;
    Amount: string;
    Expires: string;
}

export interface ISpenders {
    Receiver: string;
    Amount: string;
    Expires: string;
}

export interface IAccounts {
    'Wallet Address': string;
    Balance: string;
}

export interface ITokenDetailState {
    label: string;
    decimals: string;
    tokenName: string;
    tokenSymbol: string;
    totalSupply: string;
    minterCap: string;
    minterAddress: string;
    marketingDescription: string;
    marketingLogoUrl: string;
    marketing: string;
    marketingProject: string;
    addressBalance: string;
    allAllowances: IAllowances[];
    allSpenders: ISpenders[];
    allAccounts: IAccounts[];
    metadata: string;
}

const useTokenDetail = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { network } = useSelector((state: rootState) => state.global);

    const [firmaSDK, setFirmaSDK] = useState<FirmaSDK | null>(null);

    useEffect(() => {
        const initializeFirmaSDK = () => {
            const craftConfig = network === NETWORKS[0] ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

            const newFirmaSDK = new FirmaSDK(craftConfig.FIRMACHAIN_CONFIG);
            setFirmaSDK(newFirmaSDK);
        };
        initializeFirmaSDK();
    }, [network]);

    const getTokenDetail = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData: ITokenDetailState = {
                label: '',
                decimals: '',
                tokenName: '',
                tokenSymbol: '',
                totalSupply: '',
                minterCap: '',
                minterAddress: '',
                marketingDescription: '',
                marketingLogoUrl: '',
                marketing: '',
                marketingProject: '',
                addressBalance: '',
                allAllowances: [],
                allSpenders: [],
                allAccounts: [],
                metadata: ''
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
                const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress);
                const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress);
                const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress);
                const addressBalance = await firmaSDK.Cw20.getBalance(contractAddress, address);
                const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress, address);
                const allSpenders = await firmaSDK.Cw20.getAllSpenderAllowances(contractAddress, address);
                const allAccounts = await firmaSDK.Cw20.getAllAccounts(contractAddress);
                const firstHistory = (await firmaSDK.CosmWasm.getContractHistory(contractAddress))[0];

                resultData.label = contractInfo.contract_info.label;

                resultData.decimals = tokenInfo.decimals.toString();
                resultData.tokenName = tokenInfo.name;
                resultData.totalSupply = tokenInfo.total_supply;
                resultData.tokenSymbol = tokenInfo.symbol;

                if (minterInfo) {
                    resultData.minterCap = minterInfo.cap;
                    resultData.minterAddress = minterInfo.minter;
                }

                resultData.marketingDescription = marketingInfo.description || '';
                resultData.marketingLogoUrl = marketingInfo.logo === null ? '' : marketingInfo.logo.url;
                resultData.marketing = marketingInfo.marketing || '';
                resultData.marketingProject = marketingInfo.project || '';

                resultData.addressBalance = addressBalance;

                const convertAllAllowances = [];
                for (const allowance of allAllowances) {
                    convertAllAllowances.push({
                        Receiver: allowance.spender,
                        Amount: allowance.allowance,
                        Expires: allowance.expires
                    });
                }
                resultData.allAllowances = convertAllAllowances;

                const convertAllSpenders = [];
                const parseAllSpenders = JSON.parse(JSON.stringify(allSpenders)).allowances;

                for (const spenders of parseAllSpenders) {
                    convertAllSpenders.push({
                        Receiver: spenders.owner,
                        Amount: spenders.allowance,
                        Expires: spenders.expires
                    });
                }
                resultData.allSpenders = convertAllSpenders;

                const convertAllAccounts = [];
                for (const account of allAccounts) {
                    const balance = await firmaSDK.Cw20.getBalance(contractAddress, account);
                    convertAllAccounts.push({
                        'Wallet Address': account,
                        Balance: balance
                    });
                }
                resultData.allAccounts = convertAllAccounts;

                resultData.metadata = JSON.stringify(firstHistory);
            } catch (error) {
                enqueueSnackbar(`failed get '${contractAddress}' contract info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return resultData;
            }
        },
        [firmaSDK]
    );

    const getWalletSearch = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData = {
                balanceAmount: '',
                allAllowances: [],
                allSpenders: []
            };

            if (!firmaSDK) return resultData;

            try {
                const balanceAmount = await firmaSDK.Cw20.getBalance(contractAddress, address);
                const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress, address);
                const allSpenders = await firmaSDK.Cw20.getAllSpenderAllowances(contractAddress, address);

                resultData.balanceAmount = balanceAmount;
                const convertAllAllowances = [];
                for (const allowance of allAllowances) {
                    convertAllAllowances.push({
                        Receiver: allowance.spender,
                        Amount: allowance.allowance,
                        Expires: allowance.expires
                    });
                }
                resultData.allAllowances = convertAllAllowances;

                const convertAllSpenders = [];
                const parseAllSpenders = JSON.parse(JSON.stringify(allSpenders)).allowances;

                for (const spenders of parseAllSpenders) {
                    convertAllSpenders.push({
                        Receiver: spenders.owner,
                        Amount: spenders.allowance,
                        Expires: spenders.expires
                    });
                }
                resultData.allSpenders = convertAllSpenders;
            } catch (error) {
                enqueueSnackbar(`failed get search wallet address: ${address}`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return resultData;
            }
        },
        [firmaSDK]
    );

    return {
        getTokenDetail,
        getWalletSearch
    };
};

export default useTokenDetail;
