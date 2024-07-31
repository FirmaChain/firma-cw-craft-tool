import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import { parseExpires } from '@/utils/common';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import { AllowanceContentWrapper, AllowanceWrapper, ItemLabel, SearchAllowancesTitleTypo, SearchAllowancesWrapper } from './style';

interface IProps {
    searchAllowances: any[];
    searchReceivers: any[];
    isLoading: boolean;
}

const Allowances = ({ searchAllowances, searchReceivers, isLoading }: IProps) => {
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals);
    const symbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);

    const columns: IColumn[] = [
        {
            id: 'Receiver',
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

    return (
        <SearchAllowancesWrapper>
            <SearchAllowancesTitleTypo>Allowances</SearchAllowancesTitleTypo>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Allowances to others</ItemLabel>
                        <StyledTable columns={columns} rows={searchAllowances} isLoading={isLoading} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Received Allowances</ItemLabel>
                        <StyledTable columns={columns} rows={searchReceivers} isLoading={isLoading} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
            </div>
        </SearchAllowancesWrapper>
    );
};

export default Allowances;
