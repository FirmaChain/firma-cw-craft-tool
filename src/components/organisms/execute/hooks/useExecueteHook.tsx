import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Expires } from '@firmachain/firma-js';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

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
    const { firmaSDK } = useFirmaSDKContext();

    const getCw20Balance = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData = {
                success: true,
                balance: ''
            };

            if (!firmaSDK) return resultData;

            try {
                const balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
                resultData.balance = balance;
            } catch (error) {
                resultData.success = false;
            } finally {
                return resultData;
            }
        },
        [firmaSDK, enqueueSnackbar]
    );

    return {
        getCw20Balance
    };
};

export default useExecuteHook;
