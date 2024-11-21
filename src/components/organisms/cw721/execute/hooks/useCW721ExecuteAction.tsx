import { useSnackbar } from 'notistack';
// import useCW721ExecuteStore from './useCW721ExecuteStore';
// import { /*GlobalActions,*/ WalletActions } from '@/redux/actions';
import { Cw721Approval, Cw721ContractInfo, Cw721NftInfo } from '@firmachain/firma-js';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

import { sleep } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

interface IValidTokensState {
    tokenId: string;
    valid: boolean;
    info: Cw721NftInfo | null;
}

const useCW721ExecuteAction = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { address: userAddress, handleFCTBalance } = useWalletStore();
    // useSelector((v: rootState) => v.wallet.address);

    const { handleGlobalLoading } = useGlobalStore();

    const context = useCW721Execute();
    const burnList = context.burnList;
    const nftDatas = context.nftDatas;
    const _setContractInfo = context.setContractInfo;
    const _setNftContractInfo = context.setNftContractInfo;
    const clearForm = context.clearForm;
    const setContractExist = context.setContractExist;
    const _setTotalNfts = context.setTotalNfts;
    const _setOwnershipInfo = context.setOwnershipInfo;
    const _setMyNftList = context.setMyNftList;
    const _setBlockHeight = context.setBlockHeight;
    const _setNftApprovalInfo = context.setNftApprovalInfo;
    const _setMinter = context.setMinter;
    const _setNftDatas = context.setNftDatas;

    const { enqueueSnackbar } = useSnackbar();
    const [validTokens, setValidTokens] = useState<IValidTokensState[]>([]);

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
            _setContractInfo(contractInfo);
        } catch (error) {
            console.log('error - contractAddress', contractAddress);
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setContractInfo(CW721)'
            });
        }
    };

    const setNftContractInfo = async (contractAddress: string) => {
        try {
            const nftContractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress?.toLowerCase());
            _setNftContractInfo(nftContractInfo);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setNftContractInfo(CW721)'
            });
        }
    };

    const setFctBalance = async (address: string) => {
        try {
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            // useCW721ExecuteStore.getState().setFctBalance(fctBalance);
            handleFCTBalance(fctBalance);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setFctBalance'
            });
        }
    };

    const checkCurrentHref = (base: string) => {
        if (base !== window.location.href) throw Error('NOT_SAME_ADDRESS');
    };

    const href = window.location.href;
    const searchCW721Contract = async (contractAddress: string, address: string) => {
        //? in case of searching cw721 contract in cw20 execute page

        try {
            handleGlobalLoading(true);

            let nftContractInfo: Cw721ContractInfo;

            checkCurrentHref(href);

            try {
                nftContractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress?.toLowerCase());
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721 contract.' });
                clearForm();
                setContractExist(false);
                return;
            }

            checkCurrentHref(href);

            await sleep(150);
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
            _setContractInfo(contractInfo);

            checkCurrentHref(href);

            await sleep(150);
            await setTotalNfts(contractAddress);

            checkCurrentHref(href);

            await sleep(150);
            await setFctBalance(userAddress);

            checkCurrentHref(href);

            await sleep(150);
            await setOwnershipInfo(contractAddress);

            checkCurrentHref(href);

            await sleep(150);
            await setMyNftList(contractAddress, userAddress);

            checkCurrentHref(href);

            await sleep(150);
            await setBlockHeight();

            checkCurrentHref(href);

            await sleep(150);
            await setMinter(contractAddress);

            checkCurrentHref(href);

            await sleep(150);
            _setNftContractInfo(nftContractInfo);

            checkCurrentHref(href);
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                console.log(error);
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
            } else {
                console.log('CW721 contract search aborted');
            }

            clearForm();
        } finally {
            //? close global load
            handleGlobalLoading(false);
        }
    };

    const setTotalNfts = async (contractAddress: string) => {
        try {
            const totalNfts = await firmaSDK.Cw721.getTotalNfts(contractAddress?.toLowerCase());
            _setTotalNfts(totalNfts.toString());
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setNftContractInfo(CW721)'
            });
        }
    };

    const setOwnershipInfo = async (contractAddress: string) => {
        try {
            const ownerShip = await firmaSDK.Cw721.getOwnerShip(contractAddress?.toLowerCase());
            _setOwnershipInfo(ownerShip);
        } catch (error) {
            console.log(error);
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
            const limit = 100;

            while (true) {
                const nftList = await firmaSDK.Cw721.getNFTIdListOfOwner(
                    contractAddress?.toLowerCase(),
                    address?.toLowerCase(),
                    limit,
                    startAfter
                );

                completeNftList = completeNftList.concat(nftList);

                if (nftList.length < limit) {
                    break;
                }

                startAfter = completeNftList[completeNftList.length - 1];
            }

            _setMyNftList(completeNftList);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMyNftList(CW721)'
            });
        }
    };

    const setBlockHeight = async () => {
        try {
            const height = (await firmaSDK.BlockChain.getChainSyncInfo()).latest_block_height;
            _setBlockHeight(height);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setBlockHeight(CW721)'
            });
        }
    };

    const setNftApprovalInfo = async (contractAddress: string, address: string, token_id: string) => {
        try {
            const result = await firmaSDK.Cw721.getApproval(contractAddress?.toLowerCase(), token_id, address?.toLowerCase(), false);
            _setNftApprovalInfo(result);
        } catch (error) {
            _setNftApprovalInfo({ spender: '', expires: null });
            console.log(error);
        }
    };

    const setMinter = async (contractAddress: string) => {
        try {
            const minter = await firmaSDK.Cw721.getMinter(contractAddress?.toLowerCase());
            _setMinter(minter);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMinter(CW721)'
            });
        }
    };

    const setNftDatas = async (contractAddress: string, owner: string, nftIds: string) => {
        try {
            const splitNftIds: string[] = nftIds
                .split(',')
                .filter((v) => v !== '')
                .map((v) => String(BigInt(v)));

            const existInfo = validTokens
                .filter((value) => value.info !== null && splitNftIds.includes(value.tokenId))
                .map((value) => value.info);
            const newNftInfo: Cw721NftInfo[] = [...existInfo];

            for (const splitNftId of splitNftIds) {
                if (splitNftId === '') continue;
                const alreadyVerify = validTokens.find((value) => value.tokenId === splitNftId);

                if (alreadyVerify === undefined) {
                    try {
                        const contractNftData = await firmaSDK.Cw721.getNftData(contractAddress?.toLowerCase(), splitNftId);
                        if (contractNftData.access.owner === owner) {
                            newNftInfo.push(contractNftData);

                            setValidTokens((prev) => [
                                ...(Array.isArray(prev) ? prev : []),
                                { tokenId: splitNftId, valid: true, info: contractNftData }
                            ]);
                        } else {
                            const allOperators: Cw721Approval[] = await firmaSDK.Cw721.getAllOperators(
                                contractAddress?.toLowerCase(),
                                contractNftData.access.owner?.toLowerCase(),
                                true,
                                10,
                                null
                            );
                            const approvals = contractNftData.access.approvals;

                            const { latest_block_height } = await firmaSDK.BlockChain.getChainSyncInfo();

                            const availableApprovals = approvals.filter(({ spender, expires }) => {
                                if (spender.toLowerCase() === owner) {
                                    if (expires) {
                                        if (expires['never']) {
                                            return true;
                                        }

                                        if (expires['at_time']) {
                                            const expirationTimestamp = BigInt(expires['at_time']) / BigInt(1_000_000);
                                            if (expirationTimestamp > BigInt(Number(new Date()))) {
                                                return true;
                                            }
                                        }

                                        if (expires['at_height']) {
                                            //? approved to certain block height. need to check block height
                                            const expirationBlockHeight = BigInt(expires['at_height']);
                                            if (expirationBlockHeight > BigInt(latest_block_height)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            });

                            const availableOperators = allOperators.filter(({ spender, expires }) => {
                                if (spender.toLowerCase() === owner) {
                                    if (expires) {
                                        if (expires['never']) {
                                            return true;
                                        }

                                        if (expires['at_time']) {
                                            const expirationTimestamp = BigInt(expires['at_time']) / BigInt(1_000_000);
                                            if (expirationTimestamp > BigInt(Number(new Date()))) {
                                                return true;
                                            }
                                        }

                                        if (expires['at_height']) {
                                            //? approved to certain block height. need to check block height
                                            const expirationBlockHeight = BigInt(expires['at_height']);
                                            if (expirationBlockHeight > BigInt(latest_block_height)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            });

                            const approval = [...availableApprovals, ...availableOperators].filter((value) => value.spender === owner);
                            const isApproval = approval.length > 0;

                            if (isApproval) {
                                newNftInfo.push(contractNftData);
                            }
                            setValidTokens((prev) => [
                                ...(Array.isArray(prev) ? prev : []),
                                { tokenId: splitNftId, valid: isApproval, info: isApproval ? contractNftData : null }
                            ]);
                        }
                    } catch (error) {
                        setValidTokens((prev) => [...(Array.isArray(prev) ? prev : []), { tokenId: splitNftId, valid: false, info: null }]);
                        console.log('Does not search data by nft id', splitNftId);
                    }
                }
            }

            _setNftDatas(newNftInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (burnList === '' && nftDatas.length === 0) setValidTokens([]);
    }, [burnList, nftDatas]);

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
