import StyledTable, { IColumn } from '@/components/atoms/table';
import { AllowanceContentWrapper, AllowanceWrapper, ItemLabel, SearchAllowancesTitleTypo, SearchAllowancesWrapper } from './style';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal2, parseExpires } from '@/utils/common';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import { TOOLTIP_ID } from '@/constants/tooltip';

interface IProps {
    searchAllowances: any[];
    searchReceivers: any[];
}

const Allowances = ({ searchAllowances, searchReceivers }: IProps) => {
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals);

    const columns: IColumn[] = [
        { id: 'Receiver', label: 'Receiver', renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />, width: '55%' },
        {
            id: 'Amount',
            label: 'Amount',
            renderCell: (id, row) => (
                <Cell.Default
                    data-tooltip-content={commaNumber(parseAmountWithDecimal2(row[id], decimals))}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {commaNumber(parseAmountWithDecimal2(row[id], decimals, true))}
                </Cell.Default>
            ),

            width: '20%'
        },
        { id: 'Expires', label: 'Expires', renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])), width: '25%' }
    ];

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
