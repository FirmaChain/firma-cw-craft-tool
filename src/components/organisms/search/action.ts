import { useSnackbar } from 'notistack';
import useExecuteHook from '../execute/hooks/useExecueteHook';
import useSearchStore from './searchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useEffect, useRef } from 'react';
import { GlobalActions } from '@/redux/actions';

const useSearchActions = () => {
    const { firmaSDK, getCw20Balance } = useExecuteHook();
    const { client } = useApollo();
    const userAddress = useSelector((state: rootState) => state.wallet.address);
    const { enqueueSnackbar } = useSnackbar();
    const globalLoading = useSelector((v: rootState) => v.global.globalLoading);
    const previousKeywordRef = useRef<string | null>(null);

    useEffect(() => {
        //? update balance info when wallet connected, or changed
        const contractAddress = useSearchStore.getState().contractInfo?.address;
        if (contractAddress) updateMyBalance(contractAddress);
    }, [userAddress]);

    useEffect(() => {
        useSearchStore.getState().clearSearchInfo();
        return () => {
            GlobalActions.handleGlobalLoading(false);
        }
    }, [])

    const updateMyBalance = async (contractAddress: string) => {
        const userBalance = await firmaSDK.Cw20.getBalance(contractAddress, userAddress);
        useSearchStore.getState().setUserBalance(userBalance);
    };

    const searchTokenInfo = async (keyword: string) => {
        if (previousKeywordRef.current === keyword) return;
        if (globalLoading) return null;

        useSearchStore.getState().clearSearchInfo();
        GlobalActions.handleGlobalLoading(true);

        try {
            if (userAddress) updateMyBalance(keyword);

            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(keyword);
            const tokenInfo = await firmaSDK.Cw20.getTokenInfo(keyword);
            const minterInfo = await firmaSDK.Cw20.getMinter(keyword);
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(keyword);
            const contractHistory = await firmaSDK.CosmWasm.getContractHistory(keyword);
            const allAccounts = await getAllAccounts(keyword);
            const allTransactions = await getAllTransactinos(keyword);

            useSearchStore.getState().setContractInfo(contractInfo);
            useSearchStore.getState().setTokenInfo(tokenInfo);
            useSearchStore.getState().setMinterInfo(minterInfo);
            useSearchStore.getState().setMarketingInfo(marketingInfo);
            useSearchStore.getState().setContractHistory(contractHistory);
            useSearchStore.getState().setAllAccounts(allAccounts);
            useSearchStore.getState().setAllTransactions(allTransactions);

            previousKeywordRef.current = keyword;
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
            useSearchStore.getState().clearSearchInfo();
        } finally {
            GlobalActions.handleGlobalLoading(false);
        }
    };

    const getAllAccounts = async (contractAddress: string) => {
        const allAccounts = await firmaSDK.Cw20.getAllAccounts(contractAddress);

        const result = await Promise.all(
            allAccounts.map(async (address) => {
                try {
                    const { success, balance } = await getCw20Balance(contractAddress, address);
                    return { address, balance: success ? balance : 'Error fetching balance' };
                } catch (error) {
                    enqueueSnackbar({ variant: 'error', message: `Error while fetching blance of ${address}` });
                    return { address, balance: '' };
                }
            })
        );

        return result;
    };

    const getAllTransactinos = async (contractAddress: string): Promise<ITransaction[]> => {
        const { messagesByAddress } = await getTransactionsByAddress(client, contractAddress, 15);

        const result = messagesByAddress.map((message) => {
            const { block, hash, height, messages, success } = message.transaction;
            const type = determineMsgTypeAndSpender(messages);

            return {
                hash: hash,
                height: height.toString(),
                timestamp: block.timestamp,
                type: type[0].type,
                address: type[0].sender,
                success: success
            };
        });

        return result;
    };

    return { searchTokenInfo, updateMyBalance };
};

export default useSearchActions;
