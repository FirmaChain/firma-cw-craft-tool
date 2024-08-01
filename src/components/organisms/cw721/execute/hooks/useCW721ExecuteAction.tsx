import useExecuteHook from '@/components/organisms/execute/hooks/useExecueteHook';
import { useSnackbar } from 'notistack';
import useCW721ExecuteStore from './useCW721ExecuteStore';

const useCW721ExecuteAction = () => {
    const { firmaSDK } = useExecuteHook();

    const { enqueueSnackbar } = useSnackbar();

    const checkContractExist = async (contractAddress: string) => {
        try {
            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress);
            return exist.length > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const setContractInfo = async (contractAddress: string) => {
        try {
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
            useCW721ExecuteStore.getState().setContractInfo(contractInfo);
        } catch (error) {
            console.log('error - contractAddress', contractAddress);
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setContractInfo(CW721)'
            });
        }
    };

    const setNftContractInfo = async (contractAddress: string) => {
        try {
            const nftContractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
            useCW721ExecuteStore.getState().setNftContractInfo(nftContractInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setNftContractInfo(CW721)'
            });
        }
    };

    const setFctBalance = async (address: string) => {
        try {
            const fctBalance = await firmaSDK.Bank.getBalance(address);
            useCW721ExecuteStore.getState().setFctBalance(fctBalance);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setFctBalance'
            });
        }
    }

    const searchCW721Contract = async (contractAddress: string, address: string) => {
        //? in case of searching cw721 contract in cw20 execute page

        try {
            try {
                const nftContractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
                useCW721ExecuteStore.getState().setNftContractInfo(nftContractInfo);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721.' });
                useCW721ExecuteStore.getState().clearForm();
                return;
            }

            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
            useCW721ExecuteStore.getState().setContractInfo(contractInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
        } finally {
            //? close global load
        }
    };

    const setTotalNfts = async (contractAddress: string) => {
        try {
            const totalNfts = await firmaSDK.Cw721.getTotalNfts(contractAddress);
            useCW721ExecuteStore.getState().setTotalNfts(totalNfts.toString());
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setNftContractInfo(CW721)'
            });
        }
    }
    
    return {
        checkContractExist,
        setContractInfo,
        setNftContractInfo,
        searchCW721Contract,
        setTotalNfts,
        setFctBalance
    }
}

export default useCW721ExecuteAction;
