import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMyToken from '@/hooks/useMyToken';
import MintedTokenCard from './tokenCard';
import { Container, CurrentPageNumber, PaginationButton, PaginationContainer, TokenCardBox } from './style';
import Icons from '@/components/atoms/icons';
import RowsPerPageSelect from '@/components/atoms/select/rowsPerPageSelect';
import NoToken from '../noToken';
import { GlobalActions } from '@/redux/actions';

interface IProps {
    contractList: string[] | null;
}

interface IContractItem {
    contractAddress: string;
    tokenLogoUrl: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply: string;
    decimals: number;
}

const MyMintedTokenList = ({ contractList }: IProps) => {
    const navigate = useNavigate();

    const { getCW20ContractInfo } = useMyToken();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageItems, setPageItems] = useState<IContractItem[]>([]);

    const [rowsPerPage, setRowsPerPage] = useState<number>(8);

    const totalPages = Math.max(Math.ceil(contractList?.length / rowsPerPage), 1);

    useEffect(() => {
        if (contractList !== null) {
            const fetchItems = async () => {
                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const currentIds = contractList.slice(startIndex, endIndex);

                const fetchedItems = await Promise.all(
                    currentIds.map(async (contractAddress) => {
                        const item = await getCW20ContractInfo(contractAddress);

                        if (item) {
                            return { ...item, contractAddress };
                        } else {
                            return {
                                contractAddress,
                                tokenLogoUrl: '',
                                tokenSymbol: '',
                                tokenName: '',
                                totalSupply: '',
                                decimals: 0
                            };
                        }
                    })
                );

                setPageItems(fetchedItems);
                GlobalActions.handleGlobalLoading(false);
            };

            fetchItems();
        }
    }, [contractList, currentPage, getCW20ContractInfo, rowsPerPage]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(contractList.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        const newTotalPage = Math.max(Math.ceil(contractList.length / rowsPerPage), 1);

        setRowsPerPage(rowsPerPage);
        if (currentPage > newTotalPage) setCurrentPage(newTotalPage);
    };

    const onClickItem = (contractAddress: string) => {
        navigate(`/mytoken/detail/${contractAddress}`);
    };

    const pageList = useMemo(() => {
        if (contractList !== null) {
            const totalPages = Math.ceil(contractList.length / rowsPerPage);

            if (totalPages <= 1) return [1];

            if (currentPage <= 1) return [1, 2, 3].filter((page) => page <= totalPages);

            if (currentPage >= totalPages) return [totalPages - 2, totalPages - 1, totalPages].filter((page) => page > 0);

            return [currentPage - 1, currentPage, currentPage + 1].filter((page) => page <= totalPages);
        } else return [];
    }, [contractList, currentPage, rowsPerPage]);

    return (
        <Container>
            {contractList !== null && contractList.length === 0 ? (
                <NoToken />
            ) : (
                <>
                    <TokenCardBox>
                        {pageItems.map((item, index) => (
                            <MintedTokenCard
                                key={index}
                                tokenLogoUrl={item.tokenLogoUrl}
                                tokenSymbol={item.tokenSymbol}
                                tokenName={item.tokenName}
                                totalSupply={item.totalSupply}
                                decimals={item.decimals}
                                contractAddress={item.contractAddress}
                                onClickItem={onClickItem}
                            />
                        ))}
                    </TokenCardBox>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '10px'
                        }}
                    >
                        <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                            <PaginationButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                                <Icons.LeftDoubleArrow width={'20px'} height={'20px'} stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'} />
                            </PaginationButton>
                            <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
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
                                { label: '5', value: '5' },
                                { label: '8', value: '8' },
                                { label: '10', value: '10' }
                            ]}
                            onChange={(value) => handleChangeRowsPerPage(Number(value))}
                        />
                    </div>
                </>
            )}
        </Container>
    );
};

export default MyMintedTokenList;
