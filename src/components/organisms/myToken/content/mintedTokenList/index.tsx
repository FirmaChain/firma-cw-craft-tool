import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMyToken from '@/hooks/useMyToken';
import MintedTokenCard from './tokenCard';
import { Container, CurrentPageNumber, PaginationButton, PaginationContainer } from './style';
import Icons from '@/components/atoms/icons';
import RowsPerPageSelect from '@/components/atoms/select/rowsPerPageSelect';

interface IProps {
    contractList: string[];
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
    const [paginatedItems, setPaginatedItems] = useState<IContractItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState<number>(8);

    const totalPages = Math.max(Math.ceil(contractList.length / rowsPerPage), 1);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
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

            console.log('update', fetchedItems);

            setPaginatedItems(fetchedItems);
            setLoading(false);
        };

        fetchItems();
    }, [currentPage, getCW20ContractInfo, rowsPerPage]);

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

    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : (
                paginatedItems.map((item, index) => (
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
                ))
            )}
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
                        <Icons.LeftDoubleArrow width={'20px'} height={'20px'} $isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                        <Icons.PrevPage width={'20px'} height={'20px'} $isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <CurrentPageNumber>{currentPage}</CurrentPageNumber>
                    <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <Icons.PrevPage
                            width={'20px'}
                            height={'20px'}
                            style={{ transform: 'rotate(180deg)' }}
                            $isCheck={currentPage !== totalPages}
                        />
                    </PaginationButton>
                    <PaginationButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                        <Icons.RightDoubleArrow width={'20px'} height={'20px'} $isCheck={currentPage !== totalPages} />
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
        </Container>
    );
};

export default MyMintedTokenList;
