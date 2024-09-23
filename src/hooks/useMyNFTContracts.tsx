import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FirmaSDK, Pagination } from '@firmachain/firma-js';

import { rootState } from '../redux/reducers';
import { CRAFT_CONFIGS } from '../config';
import { useSnackbar } from 'notistack';
import { IContractInfo } from '@/context/cw721MyNFTContractsContext';
import { IMG_NFT_EMPTY_THUMBNAIL } from '@/components/atoms/icons/pngIcons';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const useMyNFTContracts = () => {
    const { enqueueSnackbar } = useSnackbar();

    const address = useSelector((state: rootState) => state.wallet.address);

    const { firmaSDK } = useFirmaSDKContext();

    const basicCodeId = CRAFT_CONFIGS.CW721.BASIC_CODE_ID;
    const advancedCodeId = CRAFT_CONFIGS.CW721.ADVANCED_CODE_ID;

    const getAllContracts = async (codeId: string): Promise<string[]> => {
        let allContracts: string[] = [];
        let nextKey = null;

        do {
            const response = await firmaSDK.CosmWasm.getContractListFromCodeId(codeId, nextKey);
            allContracts = allContracts.concat(response.dataList);
            nextKey = response.pagination.next_key;
        } while (nextKey);

        return allContracts;
    };

    const getCW721ContractList = useCallback(async () => {
        if (!firmaSDK) return [];

        try {
            const codeIds = [basicCodeId, advancedCodeId];

            const contractListsPromises = codeIds.map((codeId) => getAllContracts(codeId));
            const contractLists = await Promise.all(contractListsPromises);
            const allContracts = contractLists.flat();

            const ownershipDataPromises = allContracts.map(async (contract) => {
                const ownershipInfo = await firmaSDK.Cw721.getOwnerShip(contract?.toLowerCase());
                return { contract, ownershipInfo };
            });

            const ownershipDatas = await Promise.all(ownershipDataPromises);

            const myContracts = ownershipDatas
                .filter((ownershipData) => ownershipData.ownershipInfo.owner !== null)
                .filter((ownershipData) => ownershipData.ownershipInfo.owner === address)
                .map((ownershipData) => ownershipData.contract);
            return myContracts;
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
                nftThumbnailURI: null
            };

            if (!firmaSDK) return resultData;

            try {
                const contractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress?.toLowerCase());
                const getTotalNfts = await firmaSDK.Cw721.getTotalNfts(contractAddress?.toLowerCase());
                const contractInfoFromCW = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());

                resultData.contractAddress = contractAddress;
                resultData.name = contractInfo.name;
                resultData.symbol = contractInfo.symbol;
                resultData.totalNFTs = getTotalNfts;
                resultData.label = contractInfoFromCW.contract_info.label;
                resultData.nftThumbnailURI = null;
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

    const getCW721NFTsThumbnail = async ({ contractAddress }: { contractAddress: string }) => {
        try {
            const images = [];
            if (!firmaSDK) return images;
            const getAllNftIdList = await firmaSDK.Cw721.getAllNftIdList(contractAddress?.toLowerCase());
            const contractInfoFromCW = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());

            const isDeploiedFromFirma = Boolean(
                [basicCodeId, advancedCodeId].find((code) => code === contractInfoFromCW.contract_info.code_id) !== undefined
            );

            for (let i = 0; i < Math.min(3, getAllNftIdList.length); i++) {
                const id = getAllNftIdList[i];
                try {
                    const image = await getCW721NFTImage({ contractAddress: contractAddress, tokenId: id });
                    if (isDeploiedFromFirma) {
                        if (image === '') {
                            images.push(IMG_NFT_EMPTY_THUMBNAIL);
                        } else {
                            images.push(image);
                        }
                    } else {
                        images.push(image);
                    }
                } catch (error) {
                    console.error(`Failed to fetch image for NFT ID: ${id}`, error);
                }
            }

            return images;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const getCW721NFTImage = async ({ contractAddress, tokenId }: { contractAddress: string; tokenId: string }) => {
        try {
            const tokenURI = await firmaSDK.Cw721.getNftTokenUri(contractAddress?.toLowerCase(), tokenId);

            const response = await fetch(tokenURI);
            const metadata = await response.json();
            const imageURI = metadata.imageURI || '';

            return imageURI;
        } catch (error) {
            console.log(error);
            return '';
        }
    };

    return {
        getCW721ContractList,
        getCW721ContractInfo,
        getCW721NFTsThumbnail,
        getCW721NFTImage
    };
};

export default useMyNFTContracts;
