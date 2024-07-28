import useExecuteHook from "./hooks/useExecueteHook"
import { useSnackbar } from "notistack";
import useExecuteStore from "./hooks/useExecuteStore";

const useExecuteActions = () => {
    const { firmaSDK } = useExecuteHook();

    const { enqueueSnackbar } = useSnackbar();

    const setContractInfo = async (contractAddress: string) => {
        try {
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
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
            const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress);
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
            const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress);
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
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress);
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
            const cw20Balance = await firmaSDK.Cw20.getBalance(contractAddress, address);
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
            const fctBalance = await firmaSDK.Bank.getBalance(address);
            useExecuteStore.getState().setFctBalance(fctBalance);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setFctBalance'
            });
        }
    };

    const setAllowanceInfo = async (contractAddress: string, owner: string, spender: string, ) => {
        try {
            const allowanceInfo = await firmaSDK.Cw20.getAllowance(contractAddress, owner, spender);
            useExecuteStore.getState().setAllowanceInfo(allowanceInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching getAllowanceInfo'
            });
        }
    };
    return {
        setContractInfo,
        setTokenInfo,
        setMinterInfo,
        setMarketingInfo,
        setCw20Balance,
        setFctBalance,
        setAllowanceInfo,
    }
};

export default useExecuteActions;