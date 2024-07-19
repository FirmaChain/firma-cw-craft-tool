import StyledTable, { IColumn } from '@/components/atoms/table';
import { AllowanceContentWrapper, AllowanceWrapper, ItemLabel, SearchAllowancesTitleTypo, SearchAllowancesWrapper } from './style';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { parseExpires } from '@/utils/common';

interface IProps {
    searchAllowances: any[];
    searchReceivers: any[];
}

const columns: IColumn[] = [
    { id: 'Receiver', label: 'Receiver', renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />, width: '55%' },
    { id: 'Amount', label: 'Amount', renderCell: (id, row) => commaNumber(row[id]), width: '20%' },
    { id: 'Expires', label: 'Expires', renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])), width: '25%' }
];

const Allowances = ({ searchAllowances, searchReceivers }: IProps) => {
    return (
        <SearchAllowancesWrapper>
            <SearchAllowancesTitleTypo>Allowances</SearchAllowancesTitleTypo>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Allowances to others</ItemLabel>
                        <StyledTable columns={columns} rows={searchAllowances} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
                <AllowanceWrapper>
                    <AllowanceContentWrapper>
                        <ItemLabel>Received Allowances</ItemLabel>
                        <StyledTable columns={columns} rows={searchReceivers} />
                    </AllowanceContentWrapper>
                </AllowanceWrapper>
            </div>
        </SearchAllowancesWrapper>
    );
};

export default Allowances;
