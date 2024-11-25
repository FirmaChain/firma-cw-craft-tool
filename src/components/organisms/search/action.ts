import { useSnackbar } from 'notistack';
import useExecuteHook from '../execute/hooks/useExecueteHook';
// import useSearchStore from './searchStore';

// import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender, sleep } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useEffect, useRef } from 'react';
// import { GlobalActions } from '@/redux/actions';
import { isValidAddress } from '@/utils/address';
import { useApolloClientContext } from '@/context/apolloClientContext';
import { useCW20Search } from '@/context/cw20SearchContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const useSearchActions = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { /*firmaSDK,*/ getCw20Balance } = useExecuteHook();
    const { client } = useApolloClientContext();

    const {
        contractInfo,
        setContractExist,
        setUserBalance,
        clearSearchInfo,
        setTokenInfo,
        setMinterInfo,
        setMarketingInfo,
        setContractHistory,
        setAllAccounts,
        setAllTransactions,
        setContractInfo
    } = useCW20Search();
    // const { client } = useApollo();
    const { address: userAddress } = useWalletStore();
    // const userAddress = useSelector((state: rootState) => state.wallet.address);

    const { enqueueSnackbar } = useSnackbar();
    const { globalLoading, handleGlobalLoading } = useGlobalStore();
    // useSelector((v: rootState) => v.global.globalLoading);
    const previousKeywordRef = useRef<string | null>(null);

    useEffect(() => {
        //? update balance info when wallet connected, or changed
        const contractAddress = contractInfo?.address;
        if (contractAddress && isValidAddress(userAddress?.toLowerCase())) updateMyBalance(contractAddress);
    }, [userAddress]);

    useEffect(() => {
        clearSearchInfo();
        return () => {
            handleGlobalLoading(false);
            setContractExist(null);
        };
    }, []);

    const clearSearchKeywordRef = () => {
        previousKeywordRef.current = null;
    };

    const updateMyBalance = async (contractAddress: string) => {
        const userBalance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), userAddress?.toLowerCase());
        setUserBalance(userBalance);
    };

    const checkContractExist = async (contractAddress: string) => {
        try {
            handleGlobalLoading(true);
            if (previousKeywordRef.current?.toLowerCase() === contractAddress.toLowerCase()) return;
            if (globalLoading) return null;

            if (contractAddress.length <= 44 || !isValidAddress(contractAddress)) {
                enqueueSnackbar({ variant: 'error', message: 'Invalid contract address.' });
                return;
            }

            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());

            await sleep(500);

            setContractExist(exist.length > 0);
            await searchTokenInfo(contractAddress);
        } catch (error) {
            console.log(error);
            setContractExist(false);
        } finally {
            previousKeywordRef.current = contractAddress;
            handleGlobalLoading(false);
        }
    };

    const checkCurrentHref = (base: string) => {
        if (base !== window.location.href) throw Error('NOT_SAME_ADDRESS');
    };

    const href = window.location.href;
    const searchTokenInfo = async (keyword: string) => {
        clearSearchInfo();
        handleGlobalLoading(true);

        try {
            checkCurrentHref(href);

            try {
                //? Try to get token info
                //? if error occurs in this stage, this contract is not cw20.
                const tokenInfo = await firmaSDK.Cw20.getTokenInfo(keyword?.toLowerCase());
                setTokenInfo(tokenInfo);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW20 contract.' });
                return;
            }

            checkCurrentHref(href);

            if (userAddress) {
                const userBalance = await firmaSDK.Cw20.getBalance(keyword?.toLowerCase(), userAddress?.toLowerCase());
                checkCurrentHref(href);
                setUserBalance(userBalance);
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

            setContractInfo(contractInfo);
            setMinterInfo(minterInfo);
            setMarketingInfo(marketingInfo);
            setContractHistory(contractHistory);
            setAllAccounts(allAccounts);
            setAllTransactions(allTransactions);

            previousKeywordRef.current = keyword;
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
                console.log(error);
            } else {
                console.log('CW20 contract search aborted');
            }

            clearSearchInfo();
        } finally {
            handleGlobalLoading(false);
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
