import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    BalanceAmountTypo,
    BalanceAmountWrapper,
    BalanceLabelTypo,
    BalanceSymbolTypo,
    BalanceWrapper,
    WalletSearchWrapper,
    WalletTitleTypo
} from './style';
import Allowances from './allowances';
import useTokenDetail from '@/hooks/useTokenDetail';
import { rootState } from '@/redux/reducers';
import { isValidAddress, parseAmountWithDecimal2 } from '@/utils/common';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';

import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Divider from '@/components/atoms/divider';
import commaNumber from 'comma-number';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Skeleton from '@/components/atoms/skeleton';
import styled from 'styled-components';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { getTokenAmountFromUToken } from '@/utils/balance';

// const WalletSearcBtn = styled(GreenButton)`
//     min-width: unset;
//     width: 168px;
//     height: 40px;
// `;

export const SearchButton = styled.div<({ $disabled: boolean }) >`
    display: flex;
    width: 168px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: ${({ $disabled }) => $disabled ? `#707070` : `var(--Green-500, #02E191)`};
    color: ${({ $disabled }) => $disabled ? `#444` : `var(--Green-500, #121212)`};
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
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
    const _disableSearch = keyword === '' || disableSearch;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {keyword && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            <IconButton disabled={disableSearch} style={{ display: 'flex', padding: 0 }} onClick={onClickSearch}>
                <SearchButton $disabled={disableSearch}>{'Search'}</SearchButton>
            </IconButton>

            {/* <WalletSearcBtn disabled={_disableSearch} onClick={onClickSearch}>
                <div className="button-typo" style={{ fontSize: '14px', color: '#444' }}>
                    Search
                </div>
            </WalletSearcBtn> */}
        </div>
    );
};

const WalletSearch = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress);
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';

    const { getWalletSearch } = useTokenDetail();

    const [isLoading, setIsLoading] = useState(false);
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [balanceAmount, setBalanceAmount] = useState<string | null>(null);
    const [allAllowances, setAllAllowances] = useState<any[]>([]);
    const [allReceives, setAllReceives] = useState<any[]>([]);

    const lastTime = useRef<null | Date>(null);

    const onClickSearch = () => {
        fetchWalletSearch();
    };

    const fetchWalletSearch = useCallback(async () => {
        if (Number(new Date()) - Number(lastTime.current) < 2 * 1000) return;
        else lastTime.current = new Date();

        if (!isLoading && isInit && searchAddress.length > 0 && isValidAddress(searchAddress)) {
            setIsLoading(true);

            const searchResult = await getWalletSearch(contractAddress, searchAddress);

            setBalanceAmount(searchResult.balanceAmount);
            setAllAllowances(searchResult.allAllowances);
            setAllReceives(searchResult.allSpenders);

            setIsLoading(false);
        }
    }, [getWalletSearch, isInit, searchAddress]);

    return (
        <WalletSearchWrapper>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <WalletTitleTypo>Wallet Address Search</WalletTitleTypo>
                <SearchInputWithButton2
                    value={searchAddress}
                    placeHolder={'Input Wallet Address'}
                    onChange={setSearchAddress}
                    onClickEvent={onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={searchAddress}
                                disableSearch={!isValidAddress(searchAddress) || searchAddress === ''}
                                onClickSearch={onClickSearch}
                                onClickClear={() => setSearchAddress('')}
                            />
                        )
                    }}
                />
            </div>
            <Divider $direction="horizontal" $color="#383838" $variant="dash" />

            <BalanceWrapper>
                <BalanceLabelTypo>Balances</BalanceLabelTypo>
                {!isLoading ? (
                    balanceAmount !== null && (
                        <BalanceAmountWrapper>
                            <BalanceAmountTypo
                            // data-tooltip-content={
                            //     Number(decimals) > 2 ? commaNumber(parseAmountWithDecimal2(balanceAmount, decimals)) : ''
                            // }
                            // data-tooltip-id={TOOLTIP_ID.COMMON}
                            // data-tooltip-wrapper="span"
                            // data-tooltip-place="bottom"
                            >
                                {commaNumber(getTokenAmountFromUToken(balanceAmount, decimals))}
                            </BalanceAmountTypo>
                            <BalanceSymbolTypo>{tokenSymbol}</BalanceSymbolTypo>
                        </BalanceAmountWrapper>
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
