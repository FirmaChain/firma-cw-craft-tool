import { useSnackbar } from 'notistack';
// import useCW721SearchStore from './cw721SearchStore';

// import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useEffect, useRef } from 'react';
// import { GlobalActions } from '@/redux/actions';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { isValidAddress } from '@/utils/address';
import { useApolloClientContext } from '@/context/apolloClientContext';
import { useCW721Search } from '@/context/cw721SearchContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

const useCW721SearchActions = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { client } = useApolloClientContext();
    const {
        contractInfo,
        clearSearchInfo,
        setContractExist,
        setUserNftIds,
        setNftInfo,
        setContractInfo,
        setMinterInfo,
        setOwnerInfo,
        setAllNftIds,
        setTotalNfts,
        setAllTransactions
    } = useCW721Search();
    // const { client } = useApollo();
    const { globalLoading, handleGlobalLoading } = useGlobalStore();
    // useSelector((v: rootState) => v.global.globalLoading);
    const { enqueueSnackbar } = useSnackbar();

    const { address: userAddress } = useWalletStore();
    // const userAddress = useSelector((state: rootState) => state.wallet.address);
    const previousKeywordRef = useRef<string | null>(null);

    useEffect(() => {
        //? update balance info when wallet connected, or changed
        const contractAddress = contractInfo?.address;
        if (contractAddress) updateMyBalance(contractAddress);
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
        //! change to user nft ids
        const userNFTIdList = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress?.toLowerCase(), userAddress?.toLowerCase());
        setUserNftIds(userNFTIdList);
    };

    const checkContractExist = async (contractAddress: string) => {
        try {
            if (previousKeywordRef.current === contractAddress) return;
            if (globalLoading) return null;

            if (contractAddress.length <= 44 || !isValidAddress(contractAddress)) {
                enqueueSnackbar({ variant: 'error', message: 'Invalid contract address.' });
                return;
            }

            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());
            setContractExist(exist.length > 0);
            await searchTokenInfo(contractAddress);
        } catch (error) {
            console.log(error);
            setContractExist(false);
        } finally {
            previousKeywordRef.current = contractAddress;
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
                //? Try to get nft info
                //? if error occurs in this stage, this contract is not cw721.
                const nftInfo = await firmaSDK.Cw721.getContractInfo(keyword?.toLowerCase());
                setNftInfo(nftInfo);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721 contract.' });
                return;
            }

            checkCurrentHref(href);

            if (userAddress) {
                const userNFTIdList = await firmaSDK.Cw721.getNFTIdListOfOwner(keyword?.toLowerCase(), userAddress?.toLowerCase());
                checkCurrentHref(href);
                setUserNftIds(userNFTIdList);
            }

            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(keyword?.toLowerCase());
            checkCurrentHref(href);

            const minterInfo = await firmaSDK.Cw721.getMinter(keyword?.toLowerCase());
            checkCurrentHref(href);

            const ownerInfo = await firmaSDK.Cw721.getOwnerShip(keyword?.toLowerCase());
            checkCurrentHref(href);

            const nftIdList = await firmaSDK.Cw721.getAllNftIdList(keyword?.toLowerCase());
            checkCurrentHref(href);

            const totalNfts = await firmaSDK.Cw721.getTotalNfts(keyword?.toLowerCase());
            checkCurrentHref(href);

            const recentTx = await getAllTransactinos(keyword?.toLowerCase());
            checkCurrentHref(href);

            setContractInfo(contractInfo);
            setMinterInfo(minterInfo);
            setOwnerInfo(ownerInfo);
            setAllNftIds(nftIdList);
            setTotalNfts(totalNfts);
            setAllTransactions(recentTx);

            previousKeywordRef.current = keyword;
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
                console.log(error);
            } else {
                console.log('CW721 contract search aborted');
            }
            clearSearchInfo();
        } finally {
            handleGlobalLoading(false);
        }
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

export default useCW721SearchActions;
