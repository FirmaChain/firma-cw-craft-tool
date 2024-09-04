import { useEffect, useMemo, useState } from 'react';
import { GlobalActions } from '@/redux/actions';
import { IContractInfo, useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import { Container, CurrentPageNumber, PaginationButton, PaginationContainer, ContractCardBox, ContractCardContainer } from './style';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import RowsPerPageSelect from '@/components/atoms/select/rowsPerPageSelect';
import Icons from '@/components/atoms/icons';
import NoToken from '../noToken';
import ContractCard from './contractCard';
import { sleep } from '@/utils/common';

const MyContractList = ({ handleShowCount }: { handleShowCount: (newValue: boolean) => void }) => {
    const { getCW721ContractInfo } = useMyNFTContracts();
    const { contracts, updateContractInfo, currentPage, setCurrentPage } = useCW721NFTContractsContext();

    const [pageItems, setPageItems] = useState<IContractInfo[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(16);

    const totalPages = Math.max(Math.ceil(contracts?.length / rowsPerPage), 1);

    const [fetching, setFetching] = useState(false);
    const fetchItems = async () => {
        if (fetching) return false;
        else setFetching(true);

        try {
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const currentContracts = contracts.slice(startIndex, endIndex);

            GlobalActions.handleGlobalLoading(true);

            const fetchedItems = await Promise.all(
                currentContracts.map(async ({ contractAddress, info }) => {
                    if (info) {
                        return info;
                    } else {
                        try {
                            await sleep(1000);
                            const item = await getCW721ContractInfo(contractAddress);
                            await sleep(500);

                            if (item) {
                                updateContractInfo(item);
                                return { ...item, contractAddress };
                            } else {
                                return {
                                    contractAddress,
                                    name: '',
                                    symbol: '',
                                    label: '',
                                    totalNFTs: 0,
                                    nftThumbnailURI: null
                                };
                            }
                        } catch (error) {
                            console.error(`Error fetching info for contract ${contractAddress}:`, error);
                            return {
                                contractAddress,
                                name: '',
                                symbol: '',
                                label: '',
                                totalNFTs: 0,
                                nftThumbnailURI: null
                            };
                        }
                    }
                })
            );

            setPageItems(fetchedItems);
        } catch (error) {
            console.error('Error fetching contract items:', error);
        } finally {
            GlobalActions.handleGlobalLoading(false);
            setFetching(false);
        }
    };

    useEffect(() => {
        if (contracts !== null && contracts.length > 0) {
            fetchItems();
        }
    }, [contracts, currentPage, rowsPerPage]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(contracts.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        const newTotalPage = Math.max(Math.ceil(contracts.length / rowsPerPage), 1);

        setRowsPerPage(rowsPerPage);
        if (currentPage > newTotalPage) setCurrentPage(newTotalPage);
    };

    const pageList = useMemo(() => {
        if (contracts !== null) {
            const totalPages = Math.ceil(contracts.length / rowsPerPage);

            if (totalPages <= 1) return [1];

            if (currentPage <= 1) return [1, 2, 3].filter((page) => page <= totalPages);

            if (currentPage >= totalPages) return [totalPages - 2, totalPages - 1, totalPages].filter((page) => page > 0);

            return [currentPage - 1, currentPage, currentPage + 1].filter((page) => page <= totalPages);
        } else return [];
    }, [contracts, currentPage, rowsPerPage]);

    const showValue = pageItems.length > 0;

    useEffect(() => {
        handleShowCount(showValue);
    }, [showValue]);

    return (
        <>
            {/* <ContentControlWrapper style={{ opacity: showValue ? 1 : 0, transition: 'all 0.2s' }}>
                <ContentInfoWrapper style={{ opacity: contracts !== null && contracts?.length > 0 ? 1 : 0 }}>
                    <ContractCountTypo>{contracts === null ? 0 : contracts.length}</ContractCountTypo>
                    <ContracTypo>Contracts</ContracTypo>
                </ContentInfoWrapper>
            </ContentControlWrapper> */}

            <Container>
                {contracts !== null && contracts.length === 0 ? (
                    <NoToken />
                ) : (
                    <>
                        <ContractCardContainer>
                            <ContractCardBox
                                style={{
                                    opacity: showValue ? 1 : 0,
                                    filter: fetching ? 'brightness(0.5)' : 'brightness(1)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {pageItems.map((item, index) => {
                                    return <ContractCard key={`${item.contractAddress}-${index}`} data={item} />;
                                })}
                            </ContractCardBox>
                        </ContractCardContainer>

                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                opacity: showValue ? 1 : 0,
                                filter: fetching ? 'brightness(0.5)' : 'brightness(1)',
                                transition: 'all 0.2s',
                                paddingBottom: '68px'
                            }}
                        >
                            <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                                <PaginationButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                                    <Icons.LeftDoubleArrow
                                        width={'20px'}
                                        height={'20px'}
                                        stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'}
                                    />
                                </PaginationButton>
                                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                                    <Icons.PrevPage width={'20px'} height={'20px'} stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'} />
                                </PaginationButton>
                                <div
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '0 12px' }}
                                >
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
                                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <Icons.PrevPage
                                        width={'20px'}
                                        height={'20px'}
                                        style={{ transform: 'rotate(180deg)' }}
                                        stroke={currentPage !== totalPages ? '#FFFFFF' : '#707070'}
                                    />
                                </PaginationButton>
                                <PaginationButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                                    <Icons.RightDoubleArrow
                                        width={'20px'}
                                        height={'20px'}
                                        stroke={currentPage !== totalPages ? '#FFFFFF' : '#707070'}
                                    />
                                </PaginationButton>
                            </PaginationContainer>

                            <RowsPerPageSelect
                                value={String(rowsPerPage)}
                                minWidth="55px"
                                options={[
                                    { label: '6', value: '6' },
                                    { label: '16', value: '16' },
                                    { label: '24', value: '24' },
                                    { label: '40', value: '40' },
                                    { label: '80', value: '80' }
                                ]}
                                onChange={(value) => handleChangeRowsPerPage(Number(value))}
                            />
                        </div>
                    </>
                )}
            </Container>
        </>
    );
};

export default MyContractList;
