import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { CardContainer, CardTitle, SearchButton, SectionContainer, WalletBalance } from './style';
import Divider from '@/components/atoms/divider';
import StyledTable, { IColumn } from '@/components/atoms/table';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import { useEffect, useRef, useState } from 'react';
import { parseAmountWithDecimal2, parseExpires } from '@/utils/common';
import useTokenDetail from '@/hooks/useTokenDetail';
import useSearchStore from '../searchStore';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Skeleton from '@/components/atoms/skeleton';
import GreenButton from '@/components/atoms/buttons/greenButton';
import styled from 'styled-components';
import { getTokenAmountFromUToken } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';

const WalletSearcBtn = styled(GreenButton)`
    min-width: unset;
    width: 168px;
    height: 40px;
`;

const EndAdornment = ({
    keyword,
    disableSearch = false,
    onClickSearch,
    onClickClear
}: {
    keyword: string;
    disableSearch?: boolean;
    onClickSearch: () => void;
    onClickClear: () => void;
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {keyword && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            <WalletSearcBtn disabled={disableSearch} onClick={onClickSearch}>
                <div className="button-text" style={{ fontSize: '14px' }}>
                    Search
                </div>
            </WalletSearcBtn>
        </div>
    );
};

const TokenWalletSearch = () => {
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);
    const symbol = useSearchStore((state) => state.tokenInfo?.symbol);
    const decimals = useSearchStore((state) => state.tokenInfo?.decimals) || 0;

    //? Search keyword (wallet address)
    const [keyword, setKeyword] = useState<string>('');
    //? Search result
    const [balanceAmount, setBalanceAmount] = useState<string | null>('');
    const [allAllowances, setAllAllowances] = useState<any[] | null>([]);
    const [allReceives, setAllReceives] = useState<any[] | null>([]);

    const lastTime = useRef<null | Date>(null);

    const { getWalletSearch } = useTokenDetail();

    const getAddressInfo = async () => {
        if (Number(new Date()) - Number(lastTime.current) < 2 * 1000) return;
        else lastTime.current = new Date();

        if (keyword.length > 0 && isValidAddress(keyword)) {
            setBalanceAmount(null);
            setAllAllowances(null);
            setAllReceives(null);

            const searchResult = await getWalletSearch(contractAddress, keyword);

            if (searchResult) {
                setBalanceAmount(searchResult.balanceAmount);
                setAllAllowances(searchResult.allAllowances);
                setAllReceives(searchResult.allSpenders);
            }
        }
    };

    useEffect(() => {
        //? Reset inforamtion when contract changed
        //? May be useless [if all component un-mounted] when contract change
        setKeyword('');
        setBalanceAmount('');
        setAllAllowances([]);
        setAllReceives([]);
    }, [contractAddress]);

    const columns: IColumn[] = [
        {
            id: 'Receiver',
            label: 'Receiver',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '55%',
            minWidth: '450px'
        },
        {
            id: 'Amount',
            label: 'Amount',
            renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
            width: '20%',
            minWidth: '200px'
        },
        {
            id: 'Expires',
            label: 'Expires',
            renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])),
            width: '25%',
            minWidth: '200px'
        }
    ];

    return (
        <CardContainer>
            <CardTitle className="card-title">Wallet Address Search</CardTitle>
            <SearchInputWithButton2
                value={keyword}
                placeHolder={'Search Wallet Address'}
                onChange={(v) => setKeyword(v)}
                onClickEvent={getAddressInfo}
                adornment={{
                    end: (
                        <EndAdornment
                            keyword={keyword}
                            disableSearch={!isValidAddress(keyword)}
                            onClickSearch={getAddressInfo}
                            onClickClear={() => setKeyword('')}
                        />
                    )
                }}
            />
            <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
            <SectionContainer className="section-horizontal">
                <div className="box-row">
                    <div className="section-title" style={{ minWidth: '224px' }}>
                        Balance
                    </div>
                    {balanceAmount === null ? (
                        <Skeleton width="100px" height="22px" />
                    ) : (
                        balanceAmount && (
                            <WalletBalance
                                className="balance-box"
                                // data-tooltip-content={
                                //     decimals > 2 ? commaNumber(parseAmountWithDecimal2(balanceAmount, String(decimals))) : ''
                                // }
                                // data-tooltip-id={TOOLTIP_ID.COMMON}
                                // data-tooltip-wrapper="span"
                                // data-tooltip-place="bottom"
                            >
                                <div className="balance-amount">
                                    {commaNumber(getTokenAmountFromUToken(balanceAmount, String(decimals)))}
                                </div>
                                <div className="balance-symbol">{symbol}</div>
                            </WalletBalance>
                        )
                    )}
                </div>
            </SectionContainer>
            <SectionContainer className="section-vertical">
                <div className="section-title">Allowance</div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '24px' }}>
                    <div className="table-box">
                        <div className="table-title">Allowances to others</div>
                        <StyledTable columns={columns} rows={allAllowances || []} isLoading={!allAllowances} />
                    </div>
                    <div className="table-box">
                        <div className="table-title">Received Allowances</div>
                        <StyledTable columns={columns} rows={allReceives || []} isLoading={!allReceives} />
                    </div>
                </div>
            </SectionContainer>
        </CardContainer>
    );
};

export default TokenWalletSearch;
