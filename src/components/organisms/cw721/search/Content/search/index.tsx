import SearchInputWithButton2 from "@/components/atoms/input/searchInputWithButton";
import { ContentBodyContainer, CardHeaderTypo, ContractCard, SearchButton, SpecificItem, SpecificLabelTypo, SpecificValueWrapper, SpecificValueTypo, SpecificPlaceholderTypo } from "./style";
import { Fragment, useCallback, useRef, useState } from "react";
import IconButton from "@/components/atoms/buttons/iconButton";
import Icons from "@/components/atoms/icons";
import Divider from "@/components/atoms/divider";
import CopyIconButton from "@/components/atoms/buttons/copyIconButton";
import useNFTContractDetailStore from "@/store/useNFTContractDetailStore";
import useNFTContractDetail, { ISearchData } from "@/hooks/useNFTContractDetail";
import StyledTable, { IColumn } from "@/components/atoms/table";
import Cell from "@/components/atoms/table/cells";
import { parseExpires } from "@/utils/common";

const columns: IColumn[] = [
    {
        id: 'spender',
        label: 'Receiver',
        renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
        width: '55%',
        minWidth: '450px'
    },
    {
        id: 'Expires',
        label: 'Expires',
        renderCell: (id, row) => parseExpires(JSON.stringify(row['expires'])),
        width: '25%',
        minWidth: '200px'
    }
];


const EndAdornment = ({
    keyword,
    clearKeyword,
    disableSearch,
    onClickSearch
}: {
    keyword: string;
    clearKeyword: () => void;
    disableSearch?: boolean;
    onClickSearch: () => void;
}) => {
    const disableEventBubbling = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }} onClick={disableEventBubbling}>
            {keyword.length > 0 && (
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={clearKeyword}>
                    <Icons.CloseIcon width="32px" height="32px" strokeWidth="2.6" stroke="#1A1A1A" />
                </IconButton>
            )}

            <IconButton disabled={disableSearch} style={{ display: 'flex', padding: 0 }} onClick={onClickSearch}>
                <SearchButton $disabled={disableSearch}>{'Search'}</SearchButton>
            </IconButton>
        </div>
    );
};

const Search = () => {
    const { contractDetail } = useNFTContractDetailStore();
    const { getNFTDataByTokenID } = useNFTContractDetail();

    const [keyword, setKeyword] = useState<string>('');
    const [fetchData, setFetchData] = useState<ISearchData>({
        tokenId: "",
        owner: "",
        tokenURI: "",
        approvals: []
    })
    const prevData = useRef<ISearchData | null>(null);

    const isSearched = !Boolean(prevData.current === null);

    const disableSearch = keyword.length === 0 || contractDetail === null;

    const onClickClearKeyword = () => {
        setKeyword('');
    };

    const onClickSearch = useCallback(async () => {
        try {
            if (prevData.current !== null && prevData.current.tokenId === keyword) return;
            if (contractDetail === null) return;
            const result = await getNFTDataByTokenID(contractDetail.contractAddress, keyword);

            setFetchData(result);

            if (result.owner === "") {
                prevData.current = null;
            } else {
                prevData.current = result;
            }
        } catch (error) {
            console.log(error);
        }
    }, [keyword, contractDetail, prevData]);

    return (
        <ContentBodyContainer>
            <ContractCard>
                <CardHeaderTypo>{'Search'}</CardHeaderTypo>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Search by Token ID'}
                    onChange={(v) => setKeyword(v)}
                    onClickEvent={disableSearch ? () => null : onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={onClickClearKeyword}
                                onClickSearch={onClickSearch}
                                disableSearch={disableSearch}
                            />
                        )
                    }}
                />
            </ContractCard>
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            <SpecificItem>
                <SpecificLabelTypo>{'Token ID'}</SpecificLabelTypo>
                <SpecificValueWrapper>
                    {isSearched ?
                        <SpecificValueTypo>{fetchData.tokenId}</SpecificValueTypo>
                        :
                        <SpecificPlaceholderTypo>{'Token ID'}</SpecificPlaceholderTypo>
                    }
                </SpecificValueWrapper>
            </SpecificItem>
            <SpecificItem>
                <SpecificLabelTypo>{'Owner'}</SpecificLabelTypo>
                <SpecificValueWrapper>
                    {isSearched ?
                        <Fragment>
                            <SpecificValueTypo>{fetchData.owner}</SpecificValueTypo>
                            <CopyIconButton text={fetchData.owner} width={'22px'} height={'22px'} />
                        </Fragment>
                        :
                        <SpecificPlaceholderTypo>{'Wallet Address'}</SpecificPlaceholderTypo>
                    }
                </SpecificValueWrapper>
            </SpecificItem>
            <SpecificItem>
                <SpecificLabelTypo>{'Token URI'}</SpecificLabelTypo>
                <SpecificValueWrapper>
                    {isSearched ?
                        <Fragment>
                            <SpecificValueTypo>{fetchData.tokenURI}</SpecificValueTypo>
                            <CopyIconButton text={fetchData.tokenURI} width={'22px'} height={'22px'} />
                        </Fragment>
                        :
                        <SpecificPlaceholderTypo>{'Token URI'}</SpecificPlaceholderTypo>
                    }
                </SpecificValueWrapper>
            </SpecificItem>
            <ContractCard>
                <SpecificItem>
                    <SpecificLabelTypo>{'Approvals'}</SpecificLabelTypo>
                </SpecificItem>
                <StyledTable columns={columns} rows={fetchData.approvals || []} rowsPerPage={15} isLoading={false} disablePagination />
            </ContractCard>
        </ContentBodyContainer>
    )
}

export default Search;