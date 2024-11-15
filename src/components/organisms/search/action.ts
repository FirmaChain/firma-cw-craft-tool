import { useSnackbar } from 'notistack';
import useExecuteHook from '../execute/hooks/useExecueteHook';
import useSearchStore from './searchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
// import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender, sleep } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useEffect, useRef } from 'react';
import { GlobalActions } from '@/redux/actions';
import { isValidAddress } from '@/utils/address';
import { useApolloClientContext } from '@/context/apolloClientContext';

const useSearchActions = () => {
    const { firmaSDK, getCw20Balance } = useExecuteHook();
    const { client } = useApolloClientContext();
    // const { client } = useApollo();
    const userAddress = useSelector((state: rootState) => state.wallet.address);

    const { enqueueSnackbar } = useSnackbar();
    const globalLoading = useSelector((v: rootState) => v.global.globalLoading);
    const previousKeywordRef = useRef<string | null>(null);

    useEffect(() => {
        //? update balance info when wallet connected, or changed
        const contractAddress = useSearchStore.getState().contractInfo?.address;
        if (contractAddress && isValidAddress(userAddress?.toLowerCase())) updateMyBalance(contractAddress);
    }, [userAddress]);

    useEffect(() => {
        useSearchStore.getState().clearSearchInfo();
        return () => {
            GlobalActions.handleGlobalLoading(false);
            useSearchStore.getState().setContractExist(null);
        };
    }, []);

    const clearSearchKeywordRef = () => {
        previousKeywordRef.current = null;
    };

    const updateMyBalance = async (contractAddress: string) => {
        const userBalance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), userAddress?.toLowerCase());
        useSearchStore.getState().setUserBalance(userBalance);
    };

    const checkContractExist = async (contractAddress: string) => {
        try {
            GlobalActions.handleGlobalLoading(true);
            if (previousKeywordRef.current?.toLowerCase() === contractAddress.toLowerCase()) return;
            if (globalLoading) return null;

            if (contractAddress.length <= 44 || !isValidAddress(contractAddress)) {
                enqueueSnackbar({ variant: 'error', message: 'Invalid contract address.' });
                return;
            }

            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());

            await sleep(500);

            useSearchStore.getState().setContractExist(exist.length > 0);
            await searchTokenInfo(contractAddress);
        } catch (error) {
            console.log(error);
            useSearchStore.getState().setContractExist(false);
        } finally {
            previousKeywordRef.current = contractAddress;
            GlobalActions.handleGlobalLoading(false);
        }
    };

    const checkCurrentHref = (base: string) => {
        if (base !== window.location.href) throw Error('NOT_SAME_ADDRESS');
    };

    const href = window.location.href;
    const searchTokenInfo = async (keyword: string) => {
        useSearchStore.getState().clearSearchInfo();
        GlobalActions.handleGlobalLoading(true);

        try {
            checkCurrentHref(href);

            try {
                //? Try to get token info
                //? if error occurs in this stage, this contract is not cw20.
                const tokenInfo = await firmaSDK.Cw20.getTokenInfo(keyword?.toLowerCase());
                useSearchStore.getState().setTokenInfo(tokenInfo);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW20 contract.' });
                return;
            }

            checkCurrentHref(href);

            if (userAddress) {
                const userBalance = await firmaSDK.Cw20.getBalance(keyword?.toLowerCase(), userAddress?.toLowerCase());
                checkCurrentHref(href);
                useSearchStore.getState().setUserBalance(userBalance);
            }

            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(keyword?.toLowerCase());
            checkCurrentHref(href);

            const minterInfo = await firmaSDK.Cw20.getMinter(keyword?.toLowerCase());
            checkCurrentHref(href);

            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(keyword?.toLowerCase());
            checkCurrentHref(href);

            const contractHistory = await firmaSDK.CosmWasm.getContractHistory(keyword?.toLowerCase());
            checkCurrentHref(href);

            const allAccounts = await getAllAccounts(keyword?.toLowerCase());
            checkCurrentHref(href);

            const allTransactions = await getAllTransactinos(keyword?.toLowerCase());
            checkCurrentHref(href);

            useSearchStore.getState().setContractInfo(contractInfo);
            useSearchStore.getState().setMinterInfo(minterInfo);
            useSearchStore.getState().setMarketingInfo(marketingInfo);
            useSearchStore.getState().setContractHistory(contractHistory);
            useSearchStore.getState().setAllAccounts(allAccounts);
            useSearchStore.getState().setAllTransactions(allTransactions);

            previousKeywordRef.current = keyword;
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
                console.log(error);
            } else {
                console.log('CW20 contract search aborted');
            }

            useSearchStore.getState().clearSearchInfo();
        } finally {
            GlobalActions.handleGlobalLoading(false);
        }
    };

    const getAllAccounts = async (contractAddress: string) => {
        const allAccounts = await firmaSDK.Cw20.getAllAccounts(contractAddress?.toLowerCase());

        const result = await Promise.all(
            allAccounts.map(async (address) => {
                try {
                    const { success, balance } = await getCw20Balance(contractAddress?.toLowerCase(), address?.toLowerCase());
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

    return { searchTokenInfo, updateMyBalance, checkContractExist, clearSearchKeywordRef };
};

export default useSearchActions;
