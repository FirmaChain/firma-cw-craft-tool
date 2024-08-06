import { useSnackbar } from 'notistack';
import useCW721ExecuteStore from './useCW721ExecuteStore';
import { GlobalActions } from '@/redux/actions';
import { Cw721ContractInfo, Cw721NftInfo } from '@firmachain/firma-js';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { sleep } from '@/utils/common';

const useCW721ExecuteAction = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const userAddress = useSelector((v: rootState) => v.wallet.address);

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
    };

    const searchCW721Contract = async (contractAddress: string, address: string) => {
        //? in case of searching cw721 contract in cw20 execute page

        try {
            GlobalActions.handleGlobalLoading(true);

            let nftContractInfo: Cw721ContractInfo;

            try {
                nftContractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721.' });
                useCW721ExecuteStore.getState().clearForm();
                useCW721ExecuteStore.getState().setContractExist(false);
                return;
            }

            await sleep(150);
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
            useCW721ExecuteStore.getState().setContractInfo(contractInfo);

            await sleep(150);
            await setTotalNfts(contractAddress);

            await sleep(150);
            await setFctBalance(userAddress);

            await sleep(150);
            await setOwnershipInfo(contractAddress);

            await sleep(150);
            await setMyNftList(contractAddress, userAddress);

            await sleep(150);
            await setBlockHeight();

            await sleep(150);
            await setMinter(contractAddress);

            await sleep(150);
            useCW721ExecuteStore.getState().setNftContractInfo(nftContractInfo);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
        } finally {
            //? close global load
            GlobalActions.handleGlobalLoading(false);
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
    };

    const setOwnershipInfo = async (contractAddress: string) => {
        try {
            const ownerShip = await firmaSDK.Cw721.getOwnerShip(contractAddress);
            useCW721ExecuteStore.getState().setOwnershipInfo(ownerShip);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setOwnership(CW721)'
            });
        }
    };

    const setMyNftList = async (contractAddress: string, address: string) => {
        try {
            let completeNftList: string[] = [];
            let startAfter: string | undefined = undefined;
            const limit = 150;

            while (true) {
                const nftList = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress, address, limit, startAfter);
                completeNftList = completeNftList.concat(nftList);

                if (nftList.length < limit) {
                    break;
                }

                startAfter = nftList[nftList.length - 1];
            }

            useCW721ExecuteStore.getState().setMyNftList(completeNftList);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMyNftList(CW721)'
            });
        }
    };

    const setBlockHeight = async () => {
        try {
            const height = (await firmaSDK.BlockChain.getChainSyncInfo()).latest_block_height;
            useCW721ExecuteStore.getState().setBlockHeight(height);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setBlockHeight(CW721)'
            });
        }
    };

    const setNftApprovalInfo = async (contractAddress: string, address: string, token_id: string) => {
        try {
            // console.log("contractAddress", contractAddress);
            // console.log("address", address);
            // console.log("token_id", token_id);
            const result = await firmaSDK.Cw721.getApproval(contractAddress, token_id, address, false);
            // console.log("result", result);
            useCW721ExecuteStore.getState().setNftApprovalInfo(result);
        } catch (error) {
            useCW721ExecuteStore.getState().setNftApprovalInfo({ spender: '', expires: null });
            // console.log('error', error);
        }
    };

    const setMinter = async (contractAddress: string) => {
        try {
            const minter = await firmaSDK.Cw721.getMinter(contractAddress);
            useCW721ExecuteStore.getState().setMinter(minter);
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMinter(CW721)'
            });
        }
    };

    const setNftDatas = async (contractAddress: string, owner: string, nftIds: string) => {
        try {
            const splitNftIds: string[] = nftIds.split(',');
            const newNftInfo: Cw721NftInfo[] = [];

            for (const splitNftId of splitNftIds) {
                if (splitNftId === '') continue;
                try {
                    const contractNftData = await firmaSDK.Cw721.getNftData(contractAddress, splitNftId);
                    if (contractNftData.access.owner === owner) {
                        newNftInfo.push(contractNftData);
                    } else {
                        const approvals = contractNftData.access.approvals;
                        for (const approval of approvals) {
                            if (approval.spender === owner) {
                                newNftInfo.push(contractNftData);
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.log('Does not search data by nft id', splitNftId);
                }
            }
            useCW721ExecuteStore.getState().setNftDatas(newNftInfo);
        } catch (error) {
            console.log('error', error);
        }
    };

    return {
        checkContractExist,
        setContractInfo,
        setNftContractInfo,
        searchCW721Contract,
        setTotalNfts,
        setFctBalance,
        setOwnershipInfo,
        setMyNftList,
        setBlockHeight,
        setNftApprovalInfo,
        setMinter,
        setNftDatas
    };
};

export default useCW721ExecuteAction;
