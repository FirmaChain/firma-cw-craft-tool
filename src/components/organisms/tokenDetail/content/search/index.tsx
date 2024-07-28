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

            <IconButton style={{ padding: 0, display: 'flex' }} disabled={_disableSearch} onClick={onClickSearch}>
                <Icons.Search
                    width="32px"
                    height="32px"
                    fill={_disableSearch ? '#807E7E' : '#FFFFFF'}
                    stroke={_disableSearch ? '#807E7E' : '#FFFFFF'}
                />
            </IconButton>
        </div>
    );
};

const WalletSearch = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress);
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals);

    const { getWalletSearch } = useTokenDetail();

    const [isLoading, setIsLoading] = useState(false);
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [balanceAmount, setBalanceAmount] = useState<string | null>(null);
    const [allAllowances, setAllAllowances] = useState<any[]>([]);
    const [allReceives, setAllReceives] = useState<any[]>([]);

    const onClickSearch = () => {
        fetchWalletSearch();
    };

    const fetchWalletSearch = useCallback(async () => {
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
                                data-tooltip-content={commaNumber(parseAmountWithDecimal2(balanceAmount, decimals))}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                {commaNumber(parseAmountWithDecimal2(balanceAmount, decimals, true))}
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
