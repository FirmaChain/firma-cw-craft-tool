import { useEffect, useState } from 'react';
import { Expires } from '@firmachain/firma-js';
import styled from 'styled-components';

import Icons from '../../../../../atoms/icons';
import { getTokenStrFromUTokenStr, shortenAddress } from '../../../../../../utils/common';
import CopyIconButton from '../../../../../atoms/buttons/copyIconButton';
import { useSelector } from 'react-redux';
import { rootState } from '../../../../../../redux/reducers';
import { CRAFT_CONFIGS } from '../../../../../../config';

const TableContainer = styled.div`
    background-color: #1e1e1e;
    color: white;
    padding: 20px;
    border-radius: 5px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    border-bottom: 1px solid #383838;
    padding: 10px;
    text-align: left;
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const TableCell = styled.td<{ color: string }>`
    padding: 10px;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) => props.color};
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const PaginationButton = styled.button`
    display: flex;
    padding: 0;
    align-items: center;
    background: none;
    border: none;
    color: white;
    cursor: pointer;

    &:disabled {
        color: #555;
        cursor: pointer;
    }
`;

const NoDataWrapper = styled.div`
    width: 100%;
    padding: 36px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--Gray-750, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const CurrentPageNumber = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-left: 12px;
    margin-right: 12px;
`;

const CellWrapper = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`;

const CellColorTypo = styled.div<{ color: string }>`
    padding: 10px;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) => props.color};
    &:hover {
        cursor: pointer;
    }
`;

interface IProps {
    decimals: string;
    headers: string[];
    data: Record<string, any>[];
    itemsPerPage: number;
}

const parseExpires = (data: string) => {
    const parsedData: Expires = JSON.parse(data);

    if ('at_time' in parsedData) {
        const date = new Date(Number(parsedData.at_time) / 1_000_000); // Convert nanoseconds to milliseconds
        return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul', hour12: true });
    }

    if ('never' in parsedData) {
        return 'No Expiration';
    }

    if ('at_height' in parsedData) {
        return `${parsedData.at_height.toLocaleString()} Block`;
    }

    return '';
};

const PaginatedTable = ({ decimals, headers, data, itemsPerPage }: IProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { network } = useSelector((state: rootState) => state.global);

    const [blockExplorerLink, setBlockExplorerLink] = useState<string>();

    useEffect(() => {
        const link = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
        setBlockExplorerLink(link);
    }, [network]);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onClickAddress = (e: any, address: string) => {
        window.open(`${blockExplorerLink}/accounts/${address}`);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage) === 0 ? 1 : Math.ceil(data.length / itemsPerPage);
    const displayedData = data.length !== 0 ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    return (
        <TableContainer
            style={{
                width: 'calc(100% - 48px)',
                height: '100%',
                padding: '20px 24px',
                borderRadius: '8px',
                background: 'var(--Gray-150, #141414)'
            }}
        >
            <Table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <TableHeader key={index}>{header}</TableHeader>
                        ))}
                    </tr>
                </thead>
                {displayedData.length !== 0 ? (
                    <tbody>
                        {displayedData.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, cellIndex) =>
                                    // header === 'Receiver' ? '#00827A' :'#DCDCDC'
                                    header === 'Receiver' ? (
                                        <TableCell width={'740px'} color={'#00827A'} key={cellIndex}>
                                            <CellWrapper>
                                                <Icons.wallet width={'22px'} height={'22px'} fill={'#00827A'} />
                                                <CellColorTypo color={'#00827A'} onClick={(e: any) => onClickAddress(e, item[header])}>
                                                    {shortenAddress(item[header], 11, 11)}
                                                </CellColorTypo>
                                                <CopyIconButton text={item[header]} width={'22px'} height={'22px'} />
                                            </CellWrapper>
                                        </TableCell>
                                    ) : header === 'Amount' ? (
                                        <TableCell width={'264px'} color={'#DCDCDC'} key={cellIndex}>
                                            {getTokenStrFromUTokenStr(item[header], decimals)}
                                        </TableCell>
                                    ) : (
                                        <TableCell color={'#DCDCDC'} key={cellIndex}>
                                            {parseExpires(JSON.stringify(item[header]))}
                                        </TableCell>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <></>
                )}
            </Table>
            {displayedData.length === 0 && <NoDataWrapper>There is no data</NoDataWrapper>}
            {displayedData.length !== 0 && (
                <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                    <PaginationButton onClick={() => handleClick(1)} disabled={currentPage === 1}>
                        <Icons.LeftDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <PaginationButton onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                        <Icons.LeftArrow width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <CurrentPageNumber>{currentPage}</CurrentPageNumber>
                    <PaginationButton onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                        <Icons.RightArrow width={'20px'} height={'20px'} isCheck={currentPage !== totalPages} />
                    </PaginationButton>
                    <PaginationButton onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                        <Icons.RightDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== totalPages} />
                    </PaginationButton>
                </PaginationContainer>
            )}
        </TableContainer>
    );
};

export default PaginatedTable;
