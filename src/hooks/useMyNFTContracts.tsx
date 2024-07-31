import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FirmaSDK } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { CRAFT_CONFIGS } from '../config';
import { useSnackbar } from 'notistack';
import { IContractInfo } from '@/context/cw721MyNFTContractsContext';
import { IMG_NFT_EMPTY_THUMBNAIL } from '@/components/atoms/icons/pngIcons';

const TESTNET_SDK = new FirmaSDK(CRAFT_CONFIGS.TESTNET.FIRMACHAIN_CONFIG);
const MAINNET_SDK = new FirmaSDK(CRAFT_CONFIGS.MAINNET.FIRMACHAIN_CONFIG);

const useMyNFTContracts = () => {
    const { enqueueSnackbar } = useSnackbar();

    const network = useSelector((state: rootState) => state.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);

    const curSDKConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    const firmaSDK = network === 'MAINNET' ? MAINNET_SDK : TESTNET_SDK;

    const basicCodeId = curSDKConfig.CW721.BASIC_CODE_ID;
    const advancedCodeId = curSDKConfig.CW721.ADVANCED_CODE_ID;

    const getCW721ContractList = useCallback(async () => {
        if (!firmaSDK) return [];

        try {
            const codeIds = [basicCodeId, advancedCodeId];

            const contractListsPromises = codeIds.map((codeId) => firmaSDK.CosmWasm.getContractListFromCodeId(codeId));

            const contractLists = await Promise.all(contractListsPromises);
            const allContracts = contractLists.flat();

            const contractInfoPromises = allContracts.map((contract) => firmaSDK.CosmWasm.getContractInfo(contract));

            const contractInfos = await Promise.all(contractInfoPromises);

            const myContracts = contractInfos
                .filter((contractInfo) => contractInfo.contract_info.admin === address)
                .map((contractInfo) => contractInfo.address);

            return ["firma1h7kqndzgm0mj6wur0s3ynldnpffgqj8dlsx4q7w66g8xfkhq30asglkqcp", ...myContracts];
        } catch (error) {
            enqueueSnackbar(`failed get "CW20 BASIC" contract list`, {
                variant: 'error',
                autoHideDuration: 2000
            });
            return [];
        }
    }, [firmaSDK, address]);

    const getCW721ContractInfo = useCallback(
        async (contractAddress: string) => {
            const resultData: IContractInfo = {
                contractAddress: contractAddress,
                label: '',
                totalNFTs: 0,
                name: '',
                symbol: '',
                nftThumbnailURI: []
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
                const getTotalNfts = await firmaSDK.Cw721.getTotalNfts(contractAddress);
                const contractInfoFromCW = await firmaSDK.CosmWasm.getContractInfo(contractAddress)
                const getAllNftIdList = await firmaSDK.Cw721.getAllNftIdList(contractAddress);

                const images = [];
                const isDeploiedFromFirma = Boolean([basicCodeId, advancedCodeId].find((code) => code === contractInfoFromCW.contract_info.code_id) !== undefined);
                for (let i = 0; i < Math.min(3, getAllNftIdList.length); i++) {
                    const id = getAllNftIdList[i];
                    try {
                        const image = await getCW721NFTImage({ contractAddress: contractAddress, tokenId: id });
                        if (isDeploiedFromFirma && image === "") {
                            images.push(IMG_NFT_EMPTY_THUMBNAIL);
                        } else {
                            images.push(image);
                        }
                    } catch (error) {
                        console.error(`Failed to fetch image for NFT ID: ${id}`, error);
                    }
                }

                resultData.contractAddress = contractAddress;
                resultData.name = contractInfo.name;
                resultData.symbol = contractInfo.symbol;
                resultData.totalNFTs = getTotalNfts;
                resultData.label = contractInfoFromCW.contract_info.label;
                resultData.nftThumbnailURI = images;


            } catch (error) {
                enqueueSnackbar(`failed get '${contractAddress}' contract info`, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            }

            return resultData;
        },
        [firmaSDK]
    );

    const getCW721NFTImage = async ({ contractAddress, tokenId }: { contractAddress: string, tokenId: string }) => {
        try {
            const tokenURI = await firmaSDK.Cw721.getNftTokenUri(contractAddress, tokenId);
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            const imageURI = metadata.imageURI || "";

            return imageURI
        } catch (error) {
            console.log(error);
            return ''
        }
    }

    return {
        getCW721ContractList,
        getCW721ContractInfo,
        getCW721NFTImage
    };
};

export default useMyNFTContracts;
