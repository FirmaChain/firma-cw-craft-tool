import React, { useCallback, useEffect, useState } from "react";
import SortSelect from "./sortSelect";
import { ContentControlWrapper, ContentInfoWrapper, ContentWrapper, ContractCountTypo, TokenTypo } from "./style";
import ConnectWallet from "./connectWallet";
import { useSelector } from "react-redux";
import { rootState } from "../../../../redux/reducers";
import useMyToken from "../../../../hooks/useMyToken";
import NoToken from "./noToken";
import PaginatedList from "./paginatedList/paginatedList";

const MyTokenContent = () => {
  const { isInit } = useSelector((state: rootState) => state.wallet);
  
  const [selectSort, setSelectSort] = useState<number>(0);
  const [contractList, setContractList] = useState<string[]>([]);

  const { getCW20ContractList } = useMyToken();
  
  const fetchTokenList = useCallback(async () => {
    const contract = await getCW20ContractList();
    setContractList(contract);
  }, [getCW20ContractList]);

  useEffect(() => {
    if (isInit) {
      fetchTokenList();
    }
  }, [isInit, fetchTokenList]);

  return (
    <ContentWrapper>
      <ContentControlWrapper>
        <SortSelect onChange={setSelectSort} />
        <ContentInfoWrapper>
          <ContractCountTypo>{contractList.length}</ContractCountTypo>
          <TokenTypo>Tokens</TokenTypo>
        </ContentInfoWrapper>
      </ContentControlWrapper>
      {!isInit ? 
        <ConnectWallet />
        : contractList.length === 0 ? 
          <NoToken />
          : <PaginatedList contractList={contractList} />
      }
      
    </ContentWrapper>
  )
};

export default React.memo(MyTokenContent);