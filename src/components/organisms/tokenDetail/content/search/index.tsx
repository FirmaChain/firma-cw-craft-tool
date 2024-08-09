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
import { parseAmountWithDecimal2 } from '@/utils/common';
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
import { FirmaUtil } from '@firmachain/firma-js';
import { isValidAddress } from '@/utils/address';

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
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            <WalletSearcBtn disabled={disableSearch} onClick={onClickSearch}>
                <SearchTypo $disabled={disableSearch}>Search</SearchTypo>
            </WalletSearcBtn>
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
                    placeHolder={'Input Wallet Address'}
                    onChange={setSearchAddress}
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
