import { ITransaction } from "../../../../../../interfaces/cw20"
import { CradHeaderWrapper, HeaderSubTitleTypo, HeaderTitleTypo, TransactionContent, TransactionsCard } from "./style";
import TransactionSwitch from "./transactionSwitch";
import { TRANSACTION_TYPE } from "../../../../../../constants/common";
import PaginatedTable from "./pagination";

interface IProps {
  transactionList: ITransaction[];
}

const Headers = ["Hash", "Type", "Block", "From (Wallet Address)", "Result", "Time"];

const Transactions = ({ transactionList }: IProps) => {

  const onChangeSelectType = (type: TRANSACTION_TYPE) => {

  };

  return (
    <TransactionsCard>
      <CradHeaderWrapper>
        <HeaderTitleTypo>Transactions</HeaderTitleTypo>
         <HeaderSubTitleTypo>lastest 15 records</HeaderSubTitleTypo>
      </CradHeaderWrapper>
      <TransactionContent>
        {/* <TransactionSwitch onChange={onChangeSelectType} /> */}
        <PaginatedTable headers={Headers} data={transactionList} itemsPerPage={15} />
      </TransactionContent>
    </TransactionsCard>
  )
};

export default Transactions;