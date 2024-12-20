import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
//
import { Cw721Approval, Cw721Expires, FirmaSDK } from '@firmachain/firma-js';

// import { rootState } from '../redux/reducers';
// import { CRAFT_CONFIGS } from '../config';
import { ITransaction } from '@/interfaces/cw20';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender, sleep } from '@/utils/common';
// import useApollo from './useApollo';
// import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { useApolloClientContext } from '@/context/apolloClientContext';
import { useCW721Detail } from '@/context/cw721DetailStore';

export interface IAllowances {
    Spender: string;
    Amount: string;
    Expires: string;
}

export interface ISpenders {
    Spender: string;
    Amount: string;
    Expires: string;
}

export interface IAccounts {
    'Wallet Address': string;
    Balance: string;
}
export interface INFTContractInfo {
    contractAddress: string;
    admin: string;
    minter: string;
    label: string;
    codeId: string;
    name: string;
    symbol: string;
    ownerInfo: {
        owner: string | null;
        pending_owner: string | null;
        pending_expiry: Cw721Expires | null;
    };
}
export interface INFTsInfo {
    totalSupply: number;
    totalNftIds: string[];
}
export interface INFTContractTxData {
    txData: ITransaction[];
}
export interface ISearchData {
    tokenId: string;
    owner: string;
    tokenURI: string;
    approvals: Cw721Approval[];
}

export interface INFTContractDetailState extends INFTContractInfo {}

const useNFTContractDetail = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { firmaSDK } = useFirmaSDKContext();
    const { client } = useApolloClientContext();
    // const { client } = useApollo();

    const { nftsInfo, setNftsInfo, ownedNftsInfo, setOwnedNftsInfo } = useCW721Detail();

    const checkExistContract = async (contractAddress: string) => {
        try {
            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());
            if (exist.length === 0) {
                return false;
            }

            try {
                await firmaSDK.Cw721.getContractInfo(contractAddress?.toLowerCase());
                return true;
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW721 contract.' });
                return false;
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ variant: 'error', message: 'Invalid contract address' });
            return false;
        }
    };

    const getNFTsInfo = useCallback(
        async (contractAddress: string) => {
            const nftInfo: INFTsInfo = {
                totalSupply: 0,
                totalNftIds: []
            };
            if (!firmaSDK) return nftInfo;

            try {
                const totalNftsCount = await firmaSDK.Cw721.getTotalNfts(contractAddress?.toLowerCase());
                const nftIdList = await firmaSDK.Cw721.getAllNftIdList(contractAddress?.toLowerCase(), 40);

                nftInfo.totalSupply = totalNftsCount;
                nftInfo.totalNftIds = nftIdList;
            } catch (error) {
                console.log(error);
                enqueueSnackbar(`failed get NFT List info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return nftInfo;
            }
        },
        [firmaSDK]
    );

    const getOwnedNFTsInfo = useCallback(
        async (contractAddress: string, address: string) => {
            const nftInfo: INFTsInfo = {
                totalSupply: 0,
                totalNftIds: []
            };
            if (!firmaSDK) return nftInfo;

            try {
                const nftIdList = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress?.toLowerCase(), address?.toLowerCase(), 100);

                nftInfo.totalNftIds = nftIdList;

                // Check if next page exist
                // await sleep(200);
                // const lastIndex = nftIdList[nftIdList.length - 1];
                // const nextPage = await firmaSDK.Cw721.getNFTIdListOfOwner(
                //     contractAddress?.toLowerCase(),
                //     address?.toLowerCase(),
                //     1,
                //     lastIndex
                // );

                // if (nextPage.length > 0) nftInfo.hasNextPage = true;
            } catch (error) {
                console.log(error);
                enqueueSnackbar(`failed get NFT List info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return nftInfo;
            }
        },
        [firmaSDK]
    );

    const getNFTContractDetail = useCallback(
        async (contractAddress: string) => {
            const resultData: INFTContractDetailState = {
                contractAddress: '',
                admin: '',
                minter: '',
                label: '',
                codeId: '',
                name: '',
                symbol: '',
                ownerInfo: {
                    owner: null,
                    pending_owner: null,
                    pending_expiry: null
                }
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
                const nftInfo = await firmaSDK.Cw721.getContractInfo(contractAddress?.toLowerCase());
                const ownerInfo = await firmaSDK.Cw721.getOwnerShip(contractAddress?.toLowerCase());
                const minter = await firmaSDK.Cw721.getMinter(contractAddress?.toLowerCase());

                resultData.contractAddress = contractInfo.address;
                resultData.admin = contractInfo.contract_info.admin;
                resultData.label = contractInfo.contract_info.label;
                resultData.codeId = contractInfo.contract_info.code_id;
                resultData.name = nftInfo.name;
                resultData.symbol = nftInfo.symbol;
                resultData.ownerInfo = ownerInfo;
                resultData.minter = minter;
            } catch (error) {
                console.log(error);

                enqueueSnackbar(`failed get contract info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return resultData;
            }
        },
        [firmaSDK]
    );

    const handleCW721NFTIdList = useCallback(
        async (contractAddress: string) => {
            try {
                const nftIdList = nftsInfo.totalNftIds;
                const lastNftId = nftsInfo.totalNftIds[nftsInfo.totalNftIds.length - 1];
                const result = await firmaSDK.Cw721.getAllNftIdList(contractAddress?.toLowerCase(), 40, lastNftId);

                const newNftIdList = result.filter((nft) => nftIdList.some((existNft) => existNft === nft) === false);
                setNftsInfo({
                    ...nftsInfo,
                    totalNftIds: [...nftIdList, ...newNftIdList]
                });
            } catch (error) {
                console.log(error);
                enqueueSnackbar(`failed get NFT ID list`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            }
        },
        [nftsInfo, firmaSDK]
    );

    const handleCW721OwnedNFTIdList = useCallback(
        async (contractAddress: string, address: string) => {
            try {
                const nftIdList = ownedNftsInfo.totalNftIds;

                if (nftIdList.length > 0) {
                    const lastNftId = ownedNftsInfo.totalNftIds[ownedNftsInfo.totalNftIds.length - 1];

                    const result = await firmaSDK.Cw721.getNFTIdListOfOwner(
                        contractAddress?.toLowerCase(),
                        address?.toLowerCase(),
                        100,
                        lastNftId
                    );

                    const newNftIdList = result.filter((nft) => nftIdList.some((existNft) => existNft === nft) === false);
                    const totalNftIds = [...nftIdList, ...newNftIdList];

                    // const nextPage = await firmaSDK.Cw721.getNFTIdListOfOwner(
                    //     contractAddress?.toLowerCase(),
                    //     address?.toLowerCase(),
                    //     1,
                    //     totalNftIds[totalNftIds.length - 1]
                    // );

                    setOwnedNftsInfo({
                        ...ownedNftsInfo,
                        totalNftIds
                    });
                }
            } catch (error) {
                console.log(error);
                enqueueSnackbar(`failed get NFT ID list`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            }
        },
        [ownedNftsInfo, firmaSDK]
    );

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

    const getNFTContractTransactions = async (contractAddress: string) => {
        const result: INFTContractTxData = {
            txData: []
        };
        try {
            const recentTx = await getAllTransactinos(contractAddress);
            result.txData = recentTx;
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`failed get '${contractAddress}' transactions info`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        } finally {
            return result;
        }
    };

    const getNFTDataByTokenID = async (contractAddress: string, tokenId: string) => {
        const resultData: ISearchData = {
            tokenId: tokenId,
            owner: '',
            tokenURI: '',
            approvals: []
        };
        try {
            if (!firmaSDK) return resultData;

            const data = await firmaSDK.Cw721.getNftData(contractAddress?.toLowerCase(), tokenId);

            resultData.owner = data.access.owner;
            resultData.approvals = data.access.approvals;
            resultData.tokenURI = data.info.token_uri;
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`failed get '#${tokenId}' info`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        } finally {
            return resultData;
        }
    };

    return {
        checkExistContract,
        getNFTContractDetail,
        getNFTsInfo,
        getOwnedNFTsInfo,
        getNFTContractTransactions,
        handleCW721NFTIdList,
        handleCW721OwnedNFTIdList,
        getNFTDataByTokenID
    };
};

export default useNFTContractDetail;
