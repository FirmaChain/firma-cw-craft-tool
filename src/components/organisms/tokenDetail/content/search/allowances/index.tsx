import StyledTable, { IColumn } from '@/components/atoms/table';
import { AllowanceContentWrapper, AllowanceWrapper, ItemLabel, SearchAllowancesTitleTypo, SearchAllowancesWrapper } from './style';
import Cell from '@/components/atoms/table/cells';
import { parseExpires } from '@/utils/common';
import { useCW20Detail } from '@/context/cw20DetailStore';
// import useTokenDetailStore from '@/store/useTokenDetailStore';

interface IProps {
    searchAllowances: any[];
    searchReceivers: any[];
    isLoading: boolean;
}

const Allowances = ({ searchAllowances, searchReceivers, isLoading }: IProps) => {
    const { tokenDetail } = useCW20Detail();

    const decimals = tokenDetail ? tokenDetail?.decimals : '';
    const symbol = tokenDetail ? tokenDetail?.tokenSymbol : '';

    const toOthersTableColumns: IColumn[] = [
        {
            id: 'Spender',
            label: 'Receiver',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '55%',
            minWidth: '450px'
        },
        {
            id: 'Amount',
            label: 'Amount',
            renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
            width: '20%',
            minWidth: '200px'
        },
        {
            id: 'Expires',
            label: 'Expires',
            renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])),
            width: '25%',
            minWidth: '200px'
        }
    ];

    const receivedTablecolumns: IColumn[] = [
        {
            id: 'Spender',
            label: 'Spender',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '55%',
            minWidth: '450px'
        },
        {
            id: 'Amount',
            label: 'Amount',
            renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
            width: '20%',
            minWidth: '200px'
        },
        {
            id: 'Expires',
            label: 'Expires',
            renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])),
            width: '25%',
            minWidth: '200px'
        }
    ];

    return (
        <SearchAllowancesWrapper>
            <SearchAllowancesTitleTypo>Allowances</SearchAllowancesTitleTypo>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Allowances to others</ItemLabel>
                        <StyledTable columns={toOthersTableColumns} rows={searchAllowances} isLoading={isLoading} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Received Allowances</ItemLabel>
                        <StyledTable columns={receivedTablecolumns} rows={searchReceivers} isLoading={isLoading} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
            </div>
        </SearchAllowancesWrapper>
    );
};

export default Allowances;
