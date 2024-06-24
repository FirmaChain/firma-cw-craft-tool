import { useEffect, useState } from "react";
import SearchInput from "../../../../../atoms/input/searchInput";
import PaginatedTable from "./pagination";
import { AllAccountsCard, AllAccountsCardHeaderTypo, AllAccountsCardWrapper, AllAccountsContentWrapper, AllAccountsItem, ItemLabel } from "./style";
import Icons from "../../../../../atoms/icons";

interface IProps {
  decimals: string;
  allAccounts: any[];
};

const Headers = ["Wallet Address", "Balance"];

const AllAccounts = ({ decimals, allAccounts }: IProps) => {
  const [searchAddress, setSearchAddress] = useState<string>('');
  const [allAccountsToShow, setAllAccountsToShow] = useState<any[]>([]);

  const handleSearchAddress = (value: string) => {
    setSearchAddress(value);
  };

  useEffect(() => {
    const filteredAllAccounts = searchAddress
    ? allAccounts.filter(account => account['Wallet Address'] === searchAddress)
    : allAccounts;
    const findAllowance = filteredAllAccounts.length > 0 ? filteredAllAccounts : allAccounts;
    setAllAccountsToShow(findAllowance);
  }, [searchAddress, allAccounts]);
  
  return (
    <AllAccountsCard>
      <AllAccountsCardWrapper>
        <AllAccountsCardHeaderTypo>All Accounts</AllAccountsCardHeaderTypo>
        <SearchInput
          placeholder={"Search Wallet Address"}
          value={searchAddress}
          onChange={handleSearchAddress}
          icon={<Icons.search width={'15px'} height={'15px'} />}
          sx={{
            width: '564px',
            height: '44px'
          }}
        />
      </AllAccountsCardWrapper>
      <AllAccountsContentWrapper>
        <PaginatedTable decimals={decimals} headers={Headers} data={allAccountsToShow} itemsPerPage={5} />
      </AllAccountsContentWrapper>
    </AllAccountsCard>
  )
};

export default AllAccounts;