import Icons from '../icons';
import { useMemo, useState } from 'react';
import Cell from './cells';
import {
    CurrentPageNumber,
    HeaderCell,
    LoadingBox,
    NoDataTypo,
    PaginationButton,
    PaginationContainer,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableInnerCell,
    TableRow
} from './styles';
import { BarLoader } from 'react-spinners';

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
    rowsPerPage = 5,
    isLoading,
    disablePagination
}: {
    columns: IColumn[];
    rows: Record<string, any>[];
    rowsPerPage?: number;
    isLoading?: boolean;
    disablePagination?: boolean;
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.max(Math.ceil(rows.length / rowsPerPage), 1);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageRows = rows.slice(startIndex, endIndex);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageList = useMemo(() => {
        if (rows !== null) {
            const totalPages = Math.ceil(rows.length / rowsPerPage);

            if (totalPages <= 1) return [1];

            if (currentPage <= 1) return [1, 2, 3].filter((page) => page <= totalPages);

            if (currentPage >= totalPages) return [totalPages - 2, totalPages - 1, totalPages].filter((page) => page > 0);

            return [currentPage - 1, currentPage, currentPage + 1].filter((page) => page <= totalPages);
        } else return [];
    }, [rows, currentPage, rowsPerPage]);

    return (
        <TableContainer>
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
                    {!isLoading && rows.length >= 0 && (
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

            {isLoading ? (
                <LoadingBox>
                    <BarLoader color="#EFEFEF" />
                </LoadingBox>
            ) : (
                <>
                    {rows.length === 0 && (
                        <LoadingBox>
                            <NoDataTypo className="select-none">There is no data</NoDataTypo>
                        </LoadingBox>
                    )}

                    {!disablePagination && rows.length !== 0 && (
                        <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
                            <PaginationButton onClick={() => handleClick(1)} disabled={currentPage === 1}>
                                <Icons.LeftDoubleArrow width={'20px'} height={'20px'} stroke={currentPage !== 1 ? '#FFFFFF' : '#707070'} />
                            </PaginationButton>
                            <PaginationButton onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
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
                            <PaginationButton onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                                <Icons.PrevPage
                                    width={'20px'}
                                    height={'20px'}
                                    style={{ transform: 'rotate(180deg)' }}
                                    stroke={currentPage !== totalPages ? '#FFFFFF' : '#707070'}
                                />
                            </PaginationButton>
                            <PaginationButton onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                                <Icons.RightDoubleArrow
                                    width={'20px'}
                                    height={'20px'}
                                    stroke={currentPage !== totalPages ? '#FFFFFF' : '#707070'}
                                />
                            </PaginationButton>
                        </PaginationContainer>
                    )}
                </>
            )}
        </TableContainer>
    );
};

export default StyledTable;
