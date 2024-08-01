import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { rootState } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { CRAFT_CONFIGS } from "@/config";
import { IMG_NFT_EMPTY_THUMBNAIL } from "@/components/atoms/icons/pngIcons";
import { INFTState, useCW721NFTListContext } from "@/context/cw721NFTListContext";
import IconButton from "@/components/atoms/buttons/iconButton";
import FirmaLoading from "@/components/atoms/globalLoader/firmaLoad";
import Icons from "@/components/atoms/icons";
import styled from "styled-components";
import { INFTsInfo } from "@/hooks/useNFTContractDetail";

const Container = styled.div`
    width: 100%;   
    display: flex;
    padding: 36px 40px 20px 40px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
`

const TableContainer = styled.div`
    min-height: 244px;
    display: grid;
    grid-template-columns: repeat(10, minmax(80px, 1fr));
    gap: 16px;

    @media only screen and (max-width: 1750px) {
        grid-template-columns: repeat(8, minmax(80px, 1fr));
    }

    @media only screen and (max-width: 1550px) {
        grid-template-columns: repeat(6, minmax(80px, 1fr));
    }

    @media only screen and (max-width: 1370px) {
        grid-template-columns: repeat(5, minmax(80px, 1fr));
    }

    @media only screen and (max-width: 1250px) {
        grid-template-columns: repeat(4, minmax(80px, 1fr));
    }
`

const LoadingBox = styled.div`
    width: 100%;
    min-height: 244px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const NFTItemBox = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 6px;
    padding: 12px 12px 8px;
    border-radius: 12px;
    border: 1px solid var(--Gray-500, #383838);
    overflow: hidden;
`

const NFTImg = styled.img`
    display: flex;
    width: 64px;
    height: 64px;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    border-radius: 8.727px;
    border: 0.727px solid var(--Gray-550, #444);
    background: #222;
`

const NFTTokenIdTypo = styled.div`
    width: 100%;
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const EmptyNFTsTypo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 244px;
    color: var(--Gray-800, #DCDCDC);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const PaginationButton = styled(IconButton)`
    display: flex;
    padding: 0;
    align-items: center;

    color: white;
`;

const CurrentPageNumber = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

interface IProps {
    codeId: string;
    contractAddress: string;
    nftsInfo: INFTsInfo;
    nfts: INFTState[];
    currentPage: number;
    handleNFTIdList: (address: string) => void;
    addNFTs: (newNFTs: string[], isDeploiedFromFirma: boolean) => void;
    updateNFTs: (newNft: INFTState) => void;
    clearListData: () => void;
    setCurrentPage: (page: number) => void;
}


const NFTsTable = ({ codeId, contractAddress, nftsInfo, nfts, currentPage, handleNFTIdList, addNFTs, updateNFTs, clearListData, setCurrentPage }: IProps) => {
    const network = useSelector((state: rootState) => state.global.network);
    const { fetchNFTImage, } = useCW721NFTListContext();

    const curSDKConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    const basicCodeId = curSDKConfig.CW721.BASIC_CODE_ID;
    const advancedCodeId = curSDKConfig.CW721.ADVANCED_CODE_ID;
    const isDeploiedFromFirma = [basicCodeId, advancedCodeId].includes(codeId.toString());
    const prevNftsLength = useRef<number | null>(null)

    const [pageItems, setPageItems] = useState<INFTState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const itemsPerPage = 20;

    const NFTIds = useMemo(() => {
        if (nftsInfo === null) return [];
        return nftsInfo.totalNftIds;
    }, [nftsInfo])

    const fetchItems = useCallback(async () => {
        if (!nftsInfo) return;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentNfts = nfts.slice(startIndex, endIndex);

        const fetchedItems = await Promise.all(
            currentNfts.map(async ({ tokenId, image }) => {
                if (image) {
                    return { tokenId, image };
                } else {
                    try {
                        const item = await fetchNFTImage(tokenId, contractAddress, isDeploiedFromFirma);
                        if (item) {
                            return item;
                        }
                    } catch (error) {
                        console.error(`Error fetching image for NFT ID: ${tokenId}`, error);
                    }
                    return { tokenId, image: IMG_NFT_EMPTY_THUMBNAIL };
                }
            })
        );

        setPageItems(prevItems => {
            if (JSON.stringify(prevItems) !== JSON.stringify(fetchedItems)) {
                return fetchedItems;
            }
            return prevItems;
        });
        setIsLoading(false);
    }, [isDeploiedFromFirma, contractAddress, nftsInfo, currentPage, nfts]);

    const existItemsOnPage = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentNfts = nfts.slice(startIndex, endIndex);

        return currentNfts.length;
    }, [nfts, currentPage])

    const totalPages = useMemo(() => {
        if (nftsInfo === null) return 0;
        if (nftsInfo.totalSupply === 0) {
            return Math.ceil(nftsInfo.totalNftIds.length / itemsPerPage);
        } else {
            return Math.ceil(nftsInfo.totalSupply / itemsPerPage);
        }
    }, [nftsInfo])

    const lastPage = useMemo(() => {
        if (nftsInfo?.totalSupply === 0) {
            return existItemsOnPage < itemsPerPage
        }
        return currentPage === totalPages
    }, [nftsInfo, currentPage, totalPages, existItemsOnPage])

    const handlePageChange = useCallback((page: number) => {
        if (existItemsOnPage <= 0) {
            setCurrentPage(page - 1)
        } else {
            setCurrentPage(page);
        }
    }, [setCurrentPage, existItemsOnPage]);

    const pageList = useMemo(() => {
        if (!nftsInfo) return [];
        let totalPages = 0;
        if (nftsInfo.totalSupply === 0) {
            totalPages = Math.ceil(nftsInfo.totalNftIds.length / itemsPerPage);
        } else {
            totalPages = Math.ceil(nftsInfo.totalSupply / itemsPerPage);
        }
        if (totalPages <= 1) return [1];
        if (currentPage <= 1) return [1, 2, 3].filter(page => page <= totalPages);
        if (currentPage >= totalPages) return [totalPages - 2, totalPages - 1, totalPages].filter(page => page > 0);
        return [currentPage - 1, currentPage, currentPage + 1].filter(page => page <= totalPages);
    }, [nftsInfo, currentPage, itemsPerPage]);

    useEffect(() => {
        addNFTs(NFTIds, isDeploiedFromFirma);
    }, [NFTIds, isDeploiedFromFirma, nftsInfo]);

    useEffect(() => {
        if (!nftsInfo) return;
        const totalFetched = nftsInfo.totalNftIds.length;
        const totalRequired = currentPage * itemsPerPage;

        if (nftsInfo.totalSupply === 0) {
            if (totalFetched < totalRequired && (prevNftsLength.current === null || prevNftsLength.current < nftsInfo.totalNftIds.length)) {
                handleNFTIdList(contractAddress);
                prevNftsLength.current = nftsInfo.totalNftIds.length;
            }
        } else {
            if (totalFetched < totalRequired && totalFetched < nftsInfo.totalSupply) {
                handleNFTIdList(contractAddress);
            }
        }
    }, [currentPage, contractAddress, nftsInfo]);

    useEffect(() => {
        pageItems.map((nft) => {
            updateNFTs(nft);
        })
    }, [pageItems])

    useEffect(() => {
        fetchItems();
    }, [updateNFTs, nftsInfo, contractAddress, currentPage]);

    useEffect(() => {
        return () => {
            clearListData()
            prevNftsLength.current = null;
        }
    }, [])

    return (<Container>
        {isLoading === true && <LoadingBox><FirmaLoading size={'40px'} /></LoadingBox>}
        {isLoading === false &&
            <Fragment>
                {NFTIds.length === 0 ?
                    <EmptyNFTsTypo>{'There is no data'}</EmptyNFTsTypo>
                    :
                    <TableContainer>
                        {pageItems.map((nft) => {
                            return (
                                <NFTItemBox key={nft.tokenId}>
                                    <NFTImg src={nft.image} alt={`${contractAddress}-${nft}`} />
                                    <NFTTokenIdTypo>{nft.tokenId}</NFTTokenIdTypo>
                                </NFTItemBox>
                            )
                        })}
                    </TableContainer>
                }
            </Fragment>
        }
        {nfts &&
            <PaginationContainer style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <Icons.PrevPage width={'20px'} height={'20px'} stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'} />
                </PaginationButton>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '0 12px' }}>
                    {pageList.length === 0 ?
                        <CurrentPageNumber
                            key={`pagination_pageindex_${currentPage}`}
                            style={{ color: 'var(--Green-500, #02e191)' }}
                            onClick={() => null}
                            className="select-none pointer"
                        >
                            {currentPage}
                        </CurrentPageNumber>
                        :
                        <Fragment>
                            {pageList.map((v) => (
                                <CurrentPageNumber
                                    key={`pagination_pageindex_${v}`}
                                    style={{ color: v === currentPage ? 'var(--Green-500, #02e191)' : '#FFF' }}
                                    onClick={() => setCurrentPage(v)}
                                    className="select-none pointer"
                                >
                                    {v}
                                </CurrentPageNumber>
                            ))}
                        </Fragment>
                    }
                </div>
                <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={lastPage}>
                    <Icons.PrevPage
                        width={'20px'}
                        height={'20px'}
                        style={{ transform: 'rotate(180deg)' }}
                        stroke={currentPage !== totalPages ? '#FFFFFF' : '#707070'}
                    />
                </PaginationButton>
            </PaginationContainer>
        }
    </Container>)
}

export default NFTsTable;