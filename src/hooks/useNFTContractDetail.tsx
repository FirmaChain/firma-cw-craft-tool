import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Cw20SpenderAllowance, Cw721Expires, FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { CRAFT_CONFIGS } from '../config';
import { ITransaction } from '@/interfaces/cw20';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender } from '@/utils/common';
import useApollo from './useApollo';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

export interface IAllowances {
    Receiver: string;
    Amount: string;
    Expires: string;
}

export interface ISpenders {
    Receiver: string;
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
    totalSupply: number;
    totalNftIds: string[];
    ownerInfo: {
        owner: string | null;
        pending_owner: string | null;
        pending_expiry: Cw721Expires | null;
    }
}

export interface INFTContractTxData {
    txData: ITransaction[];
}

export interface INFTContractDetailState extends INFTContractInfo { }

const useNFTContractDetail = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { network } = useSelector((state: rootState) => state.global);
    const { client } = useApollo();
    const { contractDetail, setContractDetail } = useNFTContractDetailStore();

    const [firmaSDK, setFirmaSDK] = useState<FirmaSDK | null>(null);

    useEffect(() => {
        const initializeFirmaSDK = () => {
            const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

            const newFirmaSDK = new FirmaSDK(craftConfig.FIRMACHAIN_CONFIG);
            setFirmaSDK(newFirmaSDK);
        };
        initializeFirmaSDK();
    }, [network]);

    const getNFTContractDetail = useCallback(
        async (contractAddress: string, address: string) => {
            const resultData: INFTContractDetailState = {
                contractAddress: '',
                admin: '',
                minter: '',
                label: '',
                codeId: '',
                name: '',
                symbol: '',
                totalSupply: 0,
                totalNftIds: [],
                ownerInfo: {
                    owner: null,
                    pending_owner: null,
                    pending_expiry: null,
                },

            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress);
                const nftInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
                const ownerInfo = await firmaSDK.Cw721.getOwnerShip(contractAddress);
                const totalNftsCount = await firmaSDK.Cw721.getTotalNfts(contractAddress);
                const nftIdList = await firmaSDK.Cw721.getAllNftIdList(contractAddress, 30);
                const minter = await firmaSDK.Cw721.getMinter(contractAddress);

                resultData.contractAddress = contractInfo.address;
                resultData.admin = contractInfo.contract_info.admin;
                resultData.label = contractInfo.contract_info.label;
                resultData.codeId = contractInfo.contract_info.code_id;
                resultData.name = nftInfo.name;
                resultData.symbol = nftInfo.symbol;
                resultData.totalSupply = totalNftsCount;
                resultData.totalNftIds = nftIdList;
                resultData.ownerInfo = ownerInfo;
                resultData.minter = minter;
            } catch (error) {
                console.log(error);

                enqueueSnackbar(`failed get '${contractAddress}' contract info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            } finally {
                return resultData;
            }
        },
        [firmaSDK]
    );


    const handleCW721NFTIdList = useCallback(async (contractAddress: string) => {
        try {
            const nftIdList = contractDetail.totalNftIds;
            const lastNftId = contractDetail.totalNftIds[contractDetail.totalNftIds.length - 1];
            const result = await firmaSDK.Cw721.getAllNftIdList(contractAddress, 30, lastNftId);

            const newNftIdList = result.filter((nft) => nftIdList.some((existNft) => existNft === nft) === false);
            setContractDetail({
                ...contractDetail,
                totalNftIds: [...nftIdList, ...newNftIdList]
            })
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`failed get '${contractAddress}' NFT ID list`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
    }, [contractDetail]);

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
        }
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
    }

    return {
        getNFTContractDetail,
        getNFTContractTransactions,
        handleCW721NFTIdList
    };
};

export default useNFTContractDetail;
