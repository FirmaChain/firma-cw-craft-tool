import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

import useMyToken from "../../../../../hooks/useMyToken";
import PaginatedItem from "./paginationItem";
import { Container } from "./style";

interface IProps {
  contractList: string[];
}

interface IContractItem {
  contractAddress: string;
  tokenLogoUrl: string;
  tokenSymbol: string;
  tokenName: string;
  totalSupply: string;
  decimals: number;
}

const PaginatedList = ({ contractList }: IProps) => {
  const navigate = useNavigate();

  const { getCW20ContractInfo } = useMyToken();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<IContractItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const itemsPerPage: number = 8;

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentIds = contractList.slice(startIndex, endIndex);

      const fetchedItems = await Promise.all(
        currentIds.map(async (contractAddress) => {
          const item = await getCW20ContractInfo(contractAddress);
          if (item) {
            return { ...item, contractAddress };
          } else {
            return {
              contractAddress,
              tokenLogoUrl: "",
              tokenSymbol: "",
              tokenName: "",
              totalSupply: "",
              decimals: 0,
            };
          }
        })
      );
      setPaginatedItems(fetchedItems);
      setLoading(false);
    };

    fetchItems();
  }, [currentPage, getCW20ContractInfo]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(contractList.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickItem = (contractAddress: string) => {
    navigate(`/mytoken/detail/${contractAddress}`);
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        paginatedItems.map((item, index) => (
          <PaginatedItem
            key={index}
            tokenLogoUrl={item.tokenLogoUrl}
            tokenSymbol={item.tokenSymbol}
            tokenName={item.tokenName}
            totalSupply={item.totalSupply}
            decimals={item.decimals}
            contractAddress={item.contractAddress}
            onClickItem={onClickItem}
          />
        ))
      )}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>
          &lt;
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(contractList.length / itemsPerPage)}
        >
          &gt;
        </Button>
      </Box>
    </Container>
  );
};

export default PaginatedList;
