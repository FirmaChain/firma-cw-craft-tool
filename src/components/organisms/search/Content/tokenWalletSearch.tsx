import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { BalanceAmount, CardContainer, CardTitle, SearchButton, SectionContainer, WalletBalance } from './style';
import Divider from '@/components/atoms/divider';
import StyledTable, { IColumn } from '@/components/atoms/table';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import { useEffect, useRef, useState } from 'react';
import { parseAmountWithDecimal2, parseExpires } from '@/utils/common';
import useTokenDetail from '@/hooks/useTokenDetail';
// import useSearchStore from '../searchStore';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Skeleton from '@/components/atoms/skeleton';
import GreenButton from '@/components/atoms/buttons/greenButton';
import styled from 'styled-components';
import { getTokenAmountFromUToken } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW20Search } from '@/context/cw20SearchContext';

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
                    <Icons.XCircle width={'32px'} height={'32px'} fill="#707070" />
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
    const { contractInfo, tokenInfo } = useCW20Search();

    const contractAddress = contractInfo?.address;
    const symbol = tokenInfo?.symbol;
    const decimals = tokenInfo?.decimals || 0;

    //? Search keyword (wallet address)
    const [keyword, setKeyword] = useState<string>('');
    //? Search result
    const [balanceAmount, setBalanceAmount] = useState<string | null>('');
    const [allAllowances, setAllAllowances] = useState<any[] | null>([]);
    const [allReceives, setAllReceives] = useState<any[] | null>([]);

    const lastTime = useRef<null | Date>(null);

    const { getWalletSearch } = useTokenDetail();

    const getAddressInfo = async () => {
        if (Number(new Date()) - Number(lastTime.current) < 1 * 1000) return;
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

    const toOtherTablecolumns: IColumn[] = [
        {
            id: 'Spender',
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

    const receivedTablecolumns: IColumn[] = [
        {
            id: 'Spender',
            label: 'Spender',
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
        <CardContainer style={{ gap: 0 }}>
            <CardTitle className="card-title" style={{ marginBottom: '28px' }}>
                Wallet Address Search
            </CardTitle>
            <SearchInputWithButton2
                value={keyword}
                placeHolder={'Search by CW20 Wallet Address'}
                onChange={(v) => setKeyword(v.replace(WALLET_ADDRESS_REGEX, ''))}
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
            <div style={{ width: '100%', margin: '32px 0' }}>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
            </div>
            <SectionContainer className="section-horizontal" style={{ marginBottom: '24px' }}>
                <div className="box-row">
                    <div className="section-title" style={{ minWidth: '224px' }}>
                        Balances
                    </div>
                    {balanceAmount === null ? (
                        <Skeleton width="100px" height="22px" />
                    ) : balanceAmount === '' ? (
                        <WalletBalance>
                            <div className="default">Balances</div>
                        </WalletBalance>
                    ) : (
                        <WalletBalance className="balance-box">
                            <TextEllipsis
                                CustomDiv={BalanceAmount}
                                text={commaNumber(getTokenAmountFromUToken(balanceAmount, String(decimals)))}
                                breakMode={'letters'}
                            />
                            {/* <div className="balance-amount clamp-single-line">
                                {commaNumber(getTokenAmountFromUToken(balanceAmount, String(decimals)))}
                            </div> */}
                            <div className="balance-symbol">{symbol}</div>
                        </WalletBalance>
                    )}
                </div>
            </SectionContainer>
            <SectionContainer className="section-vertical" style={{ gap: '20px' }}>
                <div className="section-title">Allowances</div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
                    <div className="table-box">
                        <div className="table-title">Allowances to others</div>
                        <StyledTable columns={toOtherTablecolumns} rows={allAllowances || []} isLoading={!allAllowances} />
                    </div>
                    <div className="table-box">
                        <div className="table-title">Received Allowances</div>
                        <StyledTable columns={receivedTablecolumns} rows={allReceives || []} isLoading={!allReceives} />
                    </div>
                </div>
            </SectionContainer>
        </CardContainer>
    );
};

export default TokenWalletSearch;
