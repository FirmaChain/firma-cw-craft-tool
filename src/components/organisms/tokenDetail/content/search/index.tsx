import { useCallback, useRef, useState } from 'react';

import {
    BalanceAmountTypo,
    BalanceAmountWrapper,
    BalanceDefaultTypo,
    BalanceLabelTypo,
    BalanceSymbolTypo,
    BalanceWrapper,
    WalletSearchWrapper,
    WalletTitleTypo
} from './style';
import Allowances from './allowances';
import useTokenDetail from '@/hooks/useTokenDetail';

import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';

import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
// import useTokenDetailStore from '@/store/useTokenDetailStore';
import Divider from '@/components/atoms/divider';
import commaNumber from 'comma-number';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Skeleton from '@/components/atoms/skeleton';
import styled from 'styled-components';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { getTokenAmountFromUToken } from '@/utils/balance';
import { FirmaUtil } from '@firmachain/firma-js';
import { isValidAddress } from '@/utils/address';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW20Detail } from '@/context/cw20DetailStore';
import useWalletStore from '@/store/walletStore';

const WalletSearcBtn = styled(GreenButton)`
    min-width: unset;
    width: 168px;
    height: 40px;
`;

const SearchTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-100, #121212)')};
    text-align: center;

    /* Body/Body2 - Bd */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
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
                <SearchTypo $disabled={disableSearch}>Search</SearchTypo>
            </WalletSearcBtn>
        </div>
    );
};

const WalletSearch = () => {
    const { isInit } = useWalletStore();
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const { tokenDetail } = useCW20Detail();
    const contractAddress = tokenDetail?.contractAddress;
    const tokenSymbol = tokenDetail?.tokenSymbol;
    const decimals = tokenDetail?.decimals || '';

    const { getWalletSearch } = useTokenDetail();

    const [isLoading, setIsLoading] = useState(false);
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [balanceAmount, setBalanceAmount] = useState<string | null>('');
    const [allAllowances, setAllAllowances] = useState<any[]>([]);
    const [allReceives, setAllReceives] = useState<any[]>([]);

    const lastTime = useRef<null | Date>(null);

    const onClickSearch = () => {
        fetchWalletSearch();
    };

    const fetchWalletSearch = useCallback(async () => {
        if (Number(new Date()) - Number(lastTime.current) < 1 * 1000) return;
        else lastTime.current = new Date();

        if (!isLoading && isInit && isValidAddress(searchAddress)) {
            setIsLoading(true);

            const searchResult = await getWalletSearch(contractAddress, searchAddress);

            setBalanceAmount(searchResult.balanceAmount);
            setAllAllowances(searchResult.allAllowances);
            setAllReceives(searchResult.allSpenders);

            setIsLoading(false);
        }
    }, [contractAddress, isInit, isLoading, searchAddress]);

    return (
        <WalletSearchWrapper>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <WalletTitleTypo>Wallet Address Search</WalletTitleTypo>
                <SearchInputWithButton2
                    value={searchAddress}
                    placeHolder={'Search by CW20 Wallet Address'}
                    onChange={(v) => setSearchAddress(v.replace(WALLET_ADDRESS_REGEX, ''))}
                    onClickEvent={onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={searchAddress}
                                disableSearch={!isValidAddress(searchAddress)}
                                onClickSearch={onClickSearch}
                                onClickClear={() => setSearchAddress('')}
                            />
                        )
                    }}
                />
            </div>

            <div style={{ width: '100%', margin: '32px 0' }}>
                <Divider $direction="horizontal" $color="#383838" $variant="dash" />
            </div>

            <BalanceWrapper style={{ marginBottom: '24px' }}>
                <BalanceLabelTypo>Balances</BalanceLabelTypo>
                {!isLoading ? (
                    balanceAmount === '' ? (
                        <BalanceDefaultTypo>Balances</BalanceDefaultTypo>
                    ) : balanceAmount !== null ? (
                        <BalanceAmountWrapper>
                            <TextEllipsis
                                CustomDiv={BalanceAmountTypo}
                                text={commaNumber(getTokenAmountFromUToken(balanceAmount, decimals))}
                                breakMode={'letters'}
                            />
                            {/* <BalanceAmountTypo className="clamp-single-line">
                                {commaNumber(getTokenAmountFromUToken(balanceAmount, decimals))}
                            </BalanceAmountTypo> */}
                            <BalanceSymbolTypo>{tokenSymbol}</BalanceSymbolTypo>
                        </BalanceAmountWrapper>
                    ) : (
                        <></>
                    )
                ) : (
                    <Skeleton width="100px" height="22px" />
                )}
            </BalanceWrapper>
            <Allowances searchAllowances={allAllowances} searchReceivers={allReceives} isLoading={isLoading} />
        </WalletSearchWrapper>
    );
};

export default WalletSearch;
