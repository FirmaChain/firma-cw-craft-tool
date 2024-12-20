import { CradHeaderWrapper, HeaderSubTitleTypo, HeaderTitleTypo, TransactionContent, TransactionsCard } from './style';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import { useCW20Detail } from '@/context/cw20DetailStore';
// import useTokenDetailStore from '@/store/useTokenDetailStore';

const Transactions = () => {
    const { transactions } = useCW20Detail();

    const columns: IColumn[] = [
        { id: 'hash', label: 'Hash', renderCell: (id, row) => <Cell.Hash hash={row[id]} />, minWidth: '280px' },
        { id: 'type', label: 'Type', renderCell: (id, row) => <Cell.TransactionType type={row[id]} />, minWidth: '200px' },
        { id: 'height', label: 'Block', renderCell: (id, row) => <Cell.BlockHeight block={row[id]} />, minWidth: '120px' },
        {
            id: 'address',
            label: 'From (Wallet Address)',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} sliceLength={10} />,
            minWidth: '250px'
        },
        { id: 'success', label: 'Result', renderCell: (id, row) => <Cell.ResultStatus isSuccess={row[id]} />, minWidth: '120px' },
        {
            id: 'timestamp',
            label: 'Time',
            renderCell: (id, row) => <Cell.TimeAgo timestamp={row[id]} />,
            minWidth: '120px'
        }
    ];

    return (
        <TransactionsCard>
            <CradHeaderWrapper>
                <HeaderTitleTypo>Transactions</HeaderTitleTypo>
                <HeaderSubTitleTypo>The lastest 15 records</HeaderSubTitleTypo>
            </CradHeaderWrapper>
            <TransactionContent>
                <StyledTable
                    columns={columns}
                    rows={transactions || []}
                    rowsPerPage={15}
                    isLoading={!transactions}
                    disablePagination
                    slim
                />
            </TransactionContent>
        </TransactionsCard>
    );
};

export default Transactions;
