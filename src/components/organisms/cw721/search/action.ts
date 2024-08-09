import { useSnackbar } from 'notistack';
import useCW721SearchStore from './cw721SearchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useEffect, useRef } from 'react';
import { GlobalActions } from '@/redux/actions';
import { CRAFT_CONFIGS } from '@/config';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { isValidAddress } from '@/utils/address';

const useCW721SearchActions = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { client } = useApollo();
    const globalLoading = useSelector((v: rootState) => v.global.globalLoading);
    const { enqueueSnackbar } = useSnackbar();

    const userAddress = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);
    const previousKeywordRef = useRef<string | null>(null);

    const currentCodeIds = CRAFT_CONFIGS[network].CW721;

    useEffect(() => {
        //? reset cached search address & contract exist value when network change
        previousKeywordRef.current = null;
        useCW721SearchStore.getState().setContractExist(null);
    }, [network]);

    useEffect(() => {
        //? update balance info when wallet connected, or changed
        const contractAddress = useCW721SearchStore.getState().contractInfo?.address;
        if (contractAddress) updateMyBalance(contractAddress);
    }, [userAddress]);

    useEffect(() => {
        useCW721SearchStore.getState().clearSearchInfo();
        return () => {
            GlobalActions.handleGlobalLoading(false);
            useCW721SearchStore.getState().setContractExist(null);
        };
    }, []);

    const clearSearchKeywordRef = () => {
        previousKeywordRef.current = null;
    };

    const updateMyBalance = async (contractAddress: string) => {
        //! change to user nft ids
        const userNFTIdList = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress?.toLowerCase(), userAddress?.toLowerCase());
        useCW721SearchStore.getState().setUserNftIds(userNFTIdList);
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
            useCW721SearchStore.getState().setContractExist(exist.length > 0);
            await searchTokenInfo(contractAddress);
        } catch (error) {
            console.log(error);
            useCW721SearchStore.getState().setContractExist(false);
        } finally {
            previousKeywordRef.current = contractAddress;
        }
    };

    const searchTokenInfo = async (keyword: string) => {
        useCW721SearchStore.getState().clearSearchInfo();
        GlobalActions.handleGlobalLoading(true);

        try {
            try {
                //? Try to get nft info
                //? if error occurs in this stage, this contract is not cw721.
                const nftInfo = await firmaSDK.Cw721.getContractInfo(keyword?.toLowerCase());
                useCW721SearchStore.getState().setNftInfo(nftInfo);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721 contract.' });
                return;
            }

            if (userAddress) updateMyBalance(keyword);

            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(keyword?.toLowerCase());
            const minterInfo = await firmaSDK.Cw721.getMinter(keyword?.toLowerCase());
            const ownerInfo = await firmaSDK.Cw721.getOwnerShip(keyword?.toLowerCase());
            const nftIdList = await firmaSDK.Cw721.getAllNftIdList(keyword?.toLowerCase());
            const totalNfts = await firmaSDK.Cw721.getTotalNfts(keyword?.toLowerCase());
            const recentTx = await getAllTransactinos(keyword?.toLowerCase());

            useCW721SearchStore.getState().setContractInfo(contractInfo);
            useCW721SearchStore.getState().setMinterInfo(minterInfo);
            useCW721SearchStore.getState().setOwnerInfo(ownerInfo);
            useCW721SearchStore.getState().setAllNftIds(nftIdList);
            useCW721SearchStore.getState().setTotalNfts(totalNfts);
            useCW721SearchStore.getState().setAllTransactions(recentTx);

            previousKeywordRef.current = keyword;
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
            useCW721SearchStore.getState().clearSearchInfo();
        } finally {
            GlobalActions.handleGlobalLoading(false);
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
