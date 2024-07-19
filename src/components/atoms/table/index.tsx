import styled from 'styled-components';
import Icons from '../icons';
import { useState } from 'react';
import Cell from './cells';
import IconButton from '../buttons/iconButton';

const TableContainer = styled.div`
    box-sizing: border-box;
    background: var(--Gray-150, #141414);
    padding: 20px 24px;
    border-radius: 8px;

    width: 100%;
    height: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr`
    box-sizing: border-box;
    border: unset;
    padding: 0;
`;

const HeaderCell = styled.th`
    border-bottom: 1px solid #383838;
    padding: 0;
    padding-bottom: 8px;
    text-align: left;
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const TableCell = styled.td`
    padding: 0;
    border: unset;
    box-sizing: border-box;
    vertical-align: middle;
`;

const TableInnerCell = styled.div`
    display: inline;
    box-sizing: border-box;
`;

const TableBody = styled.tbody`
    box-sizing: border-box;
    border: unset;
    padding: 0;
`;

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

export interface IColumn {
    id: string;
    label: string; //? Title visible on header
    // align?: 'left' | 'center' | 'right'; //? Align direction | default: left
    renderCell?: (id: string, row: any) => React.ReactElement | string; //? If not provided, default text will be rendered.
    width?: string;
    minWidth?: string;
}

const rowHeight = '40px';

const StyledTable = ({
    columns,
    rows,
    rowsPerPage = 5
    // emptyBox,
    // isLoading
}: {
    columns: IColumn[];
    rows: Record<string, any>[];
    rowsPerPage?: number;
    // emptyBox?: React.ReactElement;
    // isLoading?: boolean;
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.max(Math.ceil(rows.length / rowsPerPage), 1);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageRows = rows.slice(startIndex, endIndex);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <TableContainer className="hide-scrollbar">
            <div style={{ width: '100%', height: '100%', overflowX: 'scroll' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <HeaderCell key={column.id} style={{ width: column.width || 'auto', minWidth: column.minWidth || 'auto' }}>
                                    {column.label}
                                </HeaderCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {rows.length >= 0 && (
                        <TableBody>
                            {currentPageRows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, cellIndex) => {
                                        if (column.renderCell) {
                                            const rendered = column.renderCell(column.id, row);

                                            return (
                                                <TableCell height="40px" key={cellIndex}>
                                                    <TableInnerCell style={{ height: rowHeight }}>
                                                        {typeof rendered === 'string' ? <Cell.Default>{rendered}</Cell.Default> : rendered}
                                                    </TableInnerCell>
                                                </TableCell>
                                            );
                                        } else
                                            return (
                                                <TableCell height="40px">
                                                    <TableInnerCell style={{ height: rowHeight }}>
                                                        <Cell.Default>{row[column.id] || ''}</Cell.Default>
                                                    </TableInnerCell>
                                                </TableCell>
                                            );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>

            {rows.length === 0 && <NoDataWrapper>There is no data</NoDataWrapper>}

            {rows.length !== 0 && (
                <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                    <PaginationButton onClick={() => handleClick(1)} disabled={currentPage === 1}>
                        <Icons.LeftDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <PaginationButton onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                        <Icons.PrevPage width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
                    </PaginationButton>
                    <CurrentPageNumber>{currentPage}</CurrentPageNumber>
                    <PaginationButton onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                        <Icons.PrevPage
                            width={'20px'}
                            height={'20px'}
                            style={{ transform: 'rotate(180deg)' }}
                            isCheck={currentPage !== totalPages}
                        />
                    </PaginationButton>
                    <PaginationButton onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                        <Icons.RightDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== totalPages} />
                    </PaginationButton>
                </PaginationContainer>
            )}
        </TableContainer>
    );
};

export default StyledTable;
