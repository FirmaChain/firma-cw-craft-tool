import { Fragment, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Icons from "../../../../../atoms/icons";
import { addCommasToNumberString, getTimeAgo, shortenAddress } from "../../../../../../utils/common";
import CopyIconButton from "../../../../../atoms/buttons/copyIconButton";
import { useSelector } from "react-redux";
import { rootState } from "../../../../../../redux/reducers";
import { CRAFT_CONFIGS } from "../../../../../../config";

const TableContainer = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 20px;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #383838;
  padding: 10px;
  text-align: left;
  color: var(--Gray-650, #807E7E);
  font-family: "General Sans Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const TableCell = styled.td`
`;

const TagWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const CellColorTypo = styled.div<{ color: string }>`
  padding: 10px;
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => props.color};
  &:hover {
    cursor: pointer;
  };
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const PaginationButton = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  
  &:disabled {
    color: #555;
    cursor: pointer;
  }
`;

const CurrentPageNumber = styled.div`
  color: var(--Green-500, #02E191);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-left: 12px;
  margin-right: 12px;
`;

const TypeCover = styled.div<{bgColor: string}>`
  padding: 5px 10px;
  background-color: ${(props) => props.bgColor};
  border-radius: 4px;
`;

const TypeTypo = styled.div<{color: string}>`
  color: ${(props) => props.color};
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const WalletCell = styled.div`
  display: flex;
  gap: 6px;
`;

const ResultCell = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const CellWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TimeTypo = styled.div`
  color: var(--Gray-700, #999);
  text-align: right;
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

interface IProps {
  enablePagination?: boolean;
  headers: string[];
  data: Record<string, any>[];
  itemsPerPage?: number;
}

const PaginatedTable = ({ enablePagination = false, headers, data, itemsPerPage = 5 }: IProps) => {
  const { network } = useSelector((state: rootState) => state.global);
  
  const [blockExplorerLink, setBlockExplorerLink] = useState<string>();
  
  useEffect(() => {
    const link = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
    setBlockExplorerLink(link);
  }, [network]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onClickHash = (e: any, hash: string) => {
    window.open(`${blockExplorerLink}/transactions/${hash}`);
  };

  const onClickBlock = (e: any, block: string) => {
    window.open(`${blockExplorerLink}/blocks/${block}`);
  };

  const onClickAddress = (e: any, address: string) => {
    window.open(`${blockExplorerLink}/accounts/${address}`);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage) === 0 ? 1 : Math.ceil(data.length / itemsPerPage);
  const displayedData = data.length !== 0 ? data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : [];

  return (
    <TableContainer
      style={{
        width: '1424px', height: '100%', padding: '20px 24px',
        borderRadius: '8px',
        background: 'var(--Gray-150, #141414)'
      }}
    >
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => { 
                let cell: ReactNode = <></>;
                switch (header) {
                  case "Hash":
                    cell =  <TableCell key={cellIndex}>
                              <CellColorTypo color={'#00827A'} onClick={(e: any) => onClickHash(e, item.hash)}>{shortenAddress(item.hash, 11, 11)}</CellColorTypo>
                            </TableCell>;
                    break;

                  case "Type":
                    let bgColor = '';
                    let typoColor = '';

                    switch (item.type) {
                      case 'Mint':
                      case 'Transfer':
                      case 'TransferFrom':
                      case 'Burn':
                      case 'BurnFrom':
                        bgColor = 'rgba(80, 110, 229, 0.20)';
                        typoColor = '#506EE5';
                        break;
                      
                      case 'IncreaseAllowance':
                      case 'DecreaseAllowance':
                        bgColor = 'rgba(80, 209, 229, 0.10)';
                        typoColor = '#50D1E5';
                        break;

                      case 'UpdateMinter':
                      case 'UpdateMarketing':
                      case 'UploadLogo':
                        bgColor = 'rgba(130, 80, 229, 0.20)';
                        typoColor = '#8250E5';
                        break;
                    }
                    cell =  <TableCell key={cellIndex}>
                              <TagWrapper>
                                <TypeCover bgColor={bgColor}>
                                  <TypeTypo color={typoColor}>{item.type}</TypeTypo>
                                </TypeCover>
                              </TagWrapper>
                            </TableCell>
                    break;

                  case "Block":
                    cell = <TableCell key={cellIndex}>
                            <CellColorTypo color={'#00827A'} onClick={(e: any) => onClickBlock(e, item.height)} >{addCommasToNumberString(item.height)}</CellColorTypo>
                          </TableCell>;
                    break;

                  case "From (Wallet Address)":
                    if (item.address === "") {
                      <TableCell key={cellIndex}>
                        <CellWrapper></CellWrapper>
                      </TableCell>
                    } else {
                      cell = <TableCell key={cellIndex}>
                              <CellWrapper>
                                <Icons.wallet width={'22px'} height={'22px'} fill={'#00827A'} />
                                <CellColorTypo color={'#00827A'} onClick={(e: any) => onClickAddress(e, item.address)}>{shortenAddress(item.address, 8, 10)}</CellColorTypo>
                                <CopyIconButton text={item.address} width={'22px'} height={'22px'} />
                              </CellWrapper>
                            </TableCell>
                    }
                    break;

                  case "Result":
                    if (item.success == true) {
                      cell = <TableCell key={cellIndex}>
                          <CellWrapper>
                            <Icons.Success width={'16px'} height={'16px'} />
                            Success
                          </CellWrapper>
                        </TableCell>
                    } else {
                      cell = <TableCell key={cellIndex}>
                          <CellWrapper>
                            <Icons.Failed width={'16px'} height={'16px'} />
                            Failed
                          </CellWrapper>
                        </TableCell>
                    }
                    break;
                  
                  case "Time":
                    cell = <TableCell key={cellIndex}>
                      <CellWrapper>
                        <TimeTypo>{getTimeAgo(item.timestamp)}</TimeTypo>
                      </CellWrapper>
                    </TableCell>
                    break;
                }

                return cell;
                  // <TableCell color={COLOR_CELL.includes(header) ? '#00827A' :'#DCDCDC'} key={cellIndex}>{item[names[cellIndex]]}</TableCell>
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      {enablePagination ? 
      <PaginationContainer style={{ justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
        <PaginationButton
          onClick={() => handleClick(1)}
          disabled={currentPage === 1}
        >
          <Icons.LeftDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
        </PaginationButton>
        <PaginationButton
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icons.LeftArrow width={'20px'} height={'20px'} isCheck={currentPage !== 1} />
        </PaginationButton>
        <CurrentPageNumber>{currentPage}</CurrentPageNumber>
        <PaginationButton
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icons.RightArrow width={'20px'} height={'20px'} isCheck={currentPage !== totalPages} />
        </PaginationButton>
        <PaginationButton
          onClick={() => handleClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          <Icons.RightDoubleArrow width={'20px'} height={'20px'} isCheck={currentPage !== totalPages} />
        </PaginationButton>
      </PaginationContainer>
      : <></>
      }
    </TableContainer>
  );
};

export default PaginatedTable;