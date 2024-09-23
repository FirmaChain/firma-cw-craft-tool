import styled from 'styled-components';
import IconButton from '../buttons/iconButton';

export const DefaultTypo = styled.div`
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #dcdcdc;
    width: fit-content;
`;

export const TypeCover = styled.div<{ $bgColor: string }>`
    padding: 2px 10px;
    height: 24px;
    background-color: ${(props) => props.$bgColor};
    border-radius: 4px;
    width: fit-content;
`;

export const TypeTypo = styled.div<{ $color: string }>`
    color: ${(props) => props.$color};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const WalletAddressWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const LoadingBox = styled.div`
    width: 100%;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 36px;
    padding-bottom: 16px;
`;

export const TableContainer = styled.div`
    box-sizing: border-box;
    background: var(--Gray-150, #141414);
    padding: 20px 24px;
    border-radius: 8px;

    width: 100%;
    height: 100%;
    min-height: 147px;

    & ::-webkit-scrollbar {
        display: none;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr`
    box-sizing: border-box;
    border: unset;
    padding: 0;
`;

export const HeaderCell = styled.th`
    padding: 0;
    padding-bottom: 8px;
    text-align: left;
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

export const TableCell = styled.td`
    padding: 0;
    border: unset;
    box-sizing: border-box;
    vertical-align: middle;
`;

export const TableInnerCell = styled.div`
    display: inline;
    box-sizing: border-box;
`;

export const TableBody = styled.tbody`
    box-sizing: border-box;
    border: unset;
    padding: 0;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
`;

export const PaginationButton = styled(IconButton)`
    display: flex;
    padding: 0;
    align-items: center;

    color: white;
`;

export const NoDataTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 14px;

    font-weight: 400;
    line-height: 20px;
`;

export const CurrentPageNumber = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const TokenAmountSymbolTypo = styled.span`
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #565656;
    width: fit-content;
`;
