import { useSnackbar } from 'notistack';
import useExecuteStore from './hooks/useExecuteStore';
import { GlobalActions } from '@/redux/actions';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { Cw20TokenInfo } from '@firmachain/firma-js';
import { sleep } from '@/utils/common';

const useExecuteActions = () => {
    const { firmaSDK } = useFirmaSDKContext();

    const { enqueueSnackbar } = useSnackbar();

    const checkContractExist = async (contractAddress: string) => {
        try {
            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());
            return exist.length > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const setContractInfo = async (contractAddress: string) => {
        try {
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
            useExecuteStore.getState().setContractInfo(contractInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setContractInfo'
            });
        }
    };

    const setTokenInfo = async (contractAddress: string) => {
        try {
            const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
            useExecuteStore.getState().setTokenInfo(tokenInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setTokenInfo'
            });
        }
    };

    const setMinterInfo = async (contractAddress: string) => {
        try {
            const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress?.toLowerCase());
            useExecuteStore.getState().setMinterInfo(minterInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMinterInfo'
            });
        }
    };

    const setMarketingInfo = async (contractAddress: string) => {
        try {
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());
            useExecuteStore.getState().setMarketingInfo(marketingInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMarketingInfo'
            });
        }
    };

    const setCw20Balance = async (contractAddress: string, address: string) => {
        try {
            const cw20Balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
            useExecuteStore.getState().setCw20Balance(cw20Balance);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setCw20Balance'
            });
        }
    };

    const setFctBalance = async (address: string) => {
        try {
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            useExecuteStore.getState().setFctBalance(fctBalance);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setFctBalance'
            });
        }
    };

    const setAllowanceInfo = async (contractAddress: string, owner: string, spender: string) => {
        try {
            const allowanceInfo = await firmaSDK.Cw20.getAllowance(
                contractAddress?.toLowerCase(),
                owner?.toLowerCase(),
                spender?.toLowerCase()
            );
            useExecuteStore.getState().setAllowanceInfo(allowanceInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching getAllowanceInfo'
            });
        }
    };

    const checkCurrentHref = (base: string) => {
        if (base !== window.location.href) throw Error('NOT_SAME_ADDRESS');
    };

    const href = window.location.href;
    const searchCW20Contract = async (contractAddress: string, address: string) => {
        //? in case of searching cw721 contract in cw20 execute page

        try {
            GlobalActions.handleGlobalLoading(true);

            await sleep(200);

            let tokenInfo: Cw20TokenInfo;

            checkCurrentHref(href);

            try {
                tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW20 contract.' });
                useExecuteStore.getState().clearForm();
                useExecuteStore.getState().setContractExist(false);
                return;
            }

            checkCurrentHref(href);

            await sleep(200);
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const cw20Balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            useExecuteStore.getState().setContractInfo(contractInfo);
            useExecuteStore.getState().setMarketingInfo(marketingInfo);
            useExecuteStore.getState().setMinterInfo(minterInfo);
            useExecuteStore.getState().setCw20Balance(cw20Balance);
            useExecuteStore.getState().setFctBalance(fctBalance);
            useExecuteStore.getState().setTokenInfo(tokenInfo);

            checkCurrentHref(href);
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
                console.log('error', error);
            } else {
                console.log('CW20 contract search aborted');
            }

            useExecuteStore.getState().clearForm();
        } finally {
            //? close global load
            GlobalActions.handleGlobalLoading(false);
        }
    };

    return {
        checkContractExist,
        setContractInfo,
        setTokenInfo,
        setMinterInfo,
        setMarketingInfo,
        setCw20Balance,
        setFctBalance,
        setAllowanceInfo,
        searchCW20Contract
    };
};

export default useExecuteActions;
