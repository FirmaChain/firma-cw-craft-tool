import { ITransaction } from '@/interfaces/cw20';
import { CradHeaderWrapper, HeaderSubTitleTypo, HeaderTitleTypo, TransactionContent, TransactionsCard } from './style';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface IProps {
    transactionList: ITransaction[];
}

const Transactions = ({ transactionList }: IProps) => {
    const columns: IColumn[] = [
        { id: 'hash', label: 'Hash', renderCell: (id, row) => <Cell.Hash hash={row[id]} />, minWidth: '280px' },
        { id: 'type', label: 'Type', renderCell: (id, row) => <Cell.TransactionType type={row[id]} />, minWidth: '150px' },
        { id: 'height', label: 'Block', renderCell: (id, row) => <Cell.BlockHeight block={row[id]} />, minWidth: '100px' },
        {
            id: 'address',
            label: 'From (Wallet Address)',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} sliceLength={10} />,
            minWidth: '250px'
        },
        { id: 'success', label: 'Result', renderCell: (id, row) => <Cell.ResultStatus isSuccess={row[id]} />, minWidth: '100px' },
        {
            id: 'timestamp',
            label: 'Time',
            renderCell: (id, row) => (
                <Cell.Default>{formatDistanceToNow(parseISO(row[id]), { addSuffix: true }).replace('about ', '')}</Cell.Default>
            ),
            minWidth: '120px'
        }
    ];

    return (
        <TransactionsCard>
            <CradHeaderWrapper>
                <HeaderTitleTypo>Transactions</HeaderTitleTypo>
                <HeaderSubTitleTypo>Lastest 15 records</HeaderSubTitleTypo>
            </CradHeaderWrapper>
            <TransactionContent>
                <StyledTable columns={columns} rows={transactionList} rowsPerPage={15} />
            </TransactionContent>
        </TransactionsCard>
    );
};

export default Transactions;
