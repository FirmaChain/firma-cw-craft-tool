import IconButton from "@/components/atoms/buttons/iconButton";
import FirmaLoading from "@/components/atoms/globalLoader/firmaLoad";
import Icons from "@/components/atoms/icons";
import { IMG_NFT_EMPTY_THUMBNAIL } from "@/components/atoms/icons/pngIcons";
import { CRAFT_CONFIGS } from "@/config";
import { INFTState, useCW721NFTListContext } from "@/context/cw721NFTListContext";
import useNFTContractDetail from "@/hooks/useNFTContractDetail";
import { rootState } from "@/redux/reducers";
import useNFTContractDetailStore from "@/store/useNFTContractDetailStore";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
    display: grid;
    grid-template-columns: repeat(10, minmax(80px, 1fr));
    gap: 16px;
`

const LoadingBox = styled.div`
    width: 100%;
    height: 208px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const NFTItemBox = styled.div`
    width: 100%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 208px;
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


const NFTsTable = () => {
    const network = useSelector((state: rootState) => state.global.network);
    const { handleCW721NFTIdList } = useNFTContractDetail();
    const { contractDetail } = useNFTContractDetailStore();
    const { nfts, addNFTs, updateNFTs, fetchNFTImage, isFetching, clearCW721NFTListData, currentPage, setCurrentPage } = useCW721NFTListContext();

    const curSDKConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    const basicCodeId = curSDKConfig.CW721.BASIC_CODE_ID;
    const advancedCodeId = curSDKConfig.CW721.ADVANCED_CODE_ID;

    const [pageItems, setPageItems] = useState<INFTState[]>([]);
    const itemsPerPage = 20;

    const NFTIds = useMemo(() => {
        if (contractDetail === null) return [];
        return contractDetail.totalNftIds;
    }, [contractDetail])

    useEffect(() => {
        if (contractDetail === null) return;
        const isDeploiedFromFirma = Boolean([basicCodeId, advancedCodeId].find((code) => code === contractDetail.codeId) !== undefined);
        addNFTs(NFTIds, isDeploiedFromFirma)
    }, [NFTIds, basicCodeId, advancedCodeId])

    const fetchItems = async () => {
        try {
            if (contractDetail === null) return;
            const isDeploiedFromFirma = Boolean([basicCodeId, advancedCodeId].find((code) => code === contractDetail.codeId) !== undefined);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentNfts = nfts.slice(startIndex, endIndex);

            const fetchedItems = await Promise.all(
                currentNfts.map(async ({ tokenId, image }) => {
                    if (image !== '') {
                        return {
                            tokenId, image
                        };
                    } else {
                        try {
                            const item = await fetchNFTImage(tokenId, contractDetail.contractAddress, isDeploiedFromFirma);
                            if (item) {
                                updateNFTs(item);
                                return { ...item };
                            } else {
                                return { tokenId, image };
                            }
                        } catch (error) {
                            return { tokenId, image };
                        }
                    }
                })
            );
            setPageItems(fetchedItems);
        } catch (error) {
            console.error('Error fetching contract items:', error);
        }
    };

    const totalPages = useMemo(() => {
        if (contractDetail === null) return 0;
        return Math.ceil(contractDetail.totalSupply / itemsPerPage);
    }, [contractDetail])

    useEffect(() => {
        if (!contractDetail) return;
        const totalFetched = contractDetail.totalNftIds.length;
        const totalRequired = currentPage * itemsPerPage;

        if (totalFetched < totalRequired && totalFetched < contractDetail.totalSupply) {
            handleCW721NFTIdList(contractDetail.contractAddress);
        }
    }, [currentPage, contractDetail]);

    useEffect(() => {
        if (contractDetail !== null && contractDetail.totalNftIds.length > 0) {
            fetchItems();
        }
    }, [contractDetail, currentPage, itemsPerPage, updateNFTs]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const pageList = useMemo(() => {
        if (contractDetail !== null) {
            const totalPages = Math.ceil(contractDetail.totalSupply / itemsPerPage);
            if (totalPages <= 1) return [1];
            if (currentPage <= 1) return [1, 2, 3].filter((page) => page <= totalPages);
            if (currentPage >= totalPages) return [totalPages - 2, totalPages - 1, totalPages].filter((page) => page > 0);

            return [currentPage - 1, currentPage, currentPage + 1].filter((page) => page <= totalPages);
        } else return [];
    }, [contractDetail, currentPage, itemsPerPage]);

    useEffect(() => {
        return () => {
            clearCW721NFTListData()
        }
    }, [])

    return (<Container>
        {isFetching === true && <LoadingBox><FirmaLoading size={'40px'} /></LoadingBox>}
        {isFetching === false &&
            <TableContainer>
                {nfts === null ?
                    <EmptyNFTsTypo>{'There is no data'}</EmptyNFTsTypo>
                    :
                    pageItems.map((nft) => {
                        return (
                            <NFTItemBox key={nft.tokenId}>
                                <NFTImg src={nft.image} alt={`${contractDetail?.contractAddress}-${nft}`} />
                                <NFTTokenIdTypo>{nft.tokenId}</NFTTokenIdTypo>
                            </NFTItemBox>
                        )
                    }
                    )}
            </TableContainer>

        }
        {nfts !== null &&
            <PaginationContainer style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <Icons.PrevPage width={'20px'} height={'20px'} stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'} />
                </PaginationButton>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '0 12px' }}>
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
                </div>
                <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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