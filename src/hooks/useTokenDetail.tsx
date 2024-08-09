import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Cw20SpenderAllowance, FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { NETWORKS } from '../constants/common';
import { CRAFT_CONFIGS } from '../config';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

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
    codeId: string;
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
    allAllowances: IAllowances[] | null;
    allSpenders: ISpenders[];
    allAccounts: IAccounts[];
    metadata: string;
}

interface _Cw20SpenderAllowance extends Cw20SpenderAllowance {
    owner?: string;
}

const useTokenDetail = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { firmaSDK } = useFirmaSDKContext();

    const getTokenDetail = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData: ITokenDetailState = {
                label: '',
                codeId: '',
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
                allAllowances: null,
                allSpenders: [],
                allAccounts: [],
                metadata: ''
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
                const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
                const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress?.toLowerCase());
                const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());
                const addressBalance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
                const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress?.toLowerCase(), address?.toLowerCase());
                const allSpenders = await firmaSDK.Cw20.getAllSpenderAllowances(contractAddress?.toLowerCase(), address?.toLowerCase());
                const allAccounts = await firmaSDK.Cw20.getAllAccounts(contractAddress?.toLowerCase());
                const firstHistory = (await firmaSDK.CosmWasm.getContractHistory(contractAddress?.toLowerCase()))[0];

                resultData.label = contractInfo.contract_info.label;
                resultData.codeId = contractInfo.contract_info.code_id;

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

                if (allSpenders.length > 0) {
                    for (const spenders of allSpenders) {
                        convertAllSpenders.push({
                            Receiver: spenders['owner'],
                            Amount: spenders.allowance,
                            Expires: spenders.expires
                        });
                    }
                }
                resultData.allSpenders = convertAllSpenders;

                const convertAllAccounts = [];
                for (const account of allAccounts) {
                    const balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), account?.toLowerCase());
                    convertAllAccounts.push({
                        'Wallet Address': account,
                        Balance: balance
                    });
                }
                resultData.allAccounts = convertAllAccounts;

                resultData.metadata = JSON.stringify(firstHistory);
            } catch (error) {
                console.log(error);

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
                const balanceAmount = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
                const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress?.toLowerCase(), address?.toLowerCase());
                const allSpenders: _Cw20SpenderAllowance[] = await firmaSDK.Cw20.getAllSpenderAllowances(
                    contractAddress?.toLowerCase(),
                    address?.toLowerCase()
                );

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

                for (const spenders of allSpenders) {
                    convertAllSpenders.push({
                        Receiver: spenders.owner,
                        Amount: spenders.allowance,
                        Expires: spenders.expires
                    });
                }

                resultData.allSpenders = convertAllSpenders;
            } catch (error) {
                console.log(error);

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
