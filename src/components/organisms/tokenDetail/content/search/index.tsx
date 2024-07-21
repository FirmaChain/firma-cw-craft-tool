import { useCallback, useState } from 'react';
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
import styled from 'styled-components';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Divider from '@/components/atoms/divider';
import commaNumber from 'comma-number';
import { TOOLTIP_ID } from '@/constants/tooltip';

const SearchButton = styled(IconButton)`
    //? outside
    width: 168px;
    height: 40px;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    //? inside
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    flex-shrink: 0;
    background: ${({ disabled }) => (disabled ? 'var(--Gray-600, #707070)' : 'var(--Green-500, #02e191)')};

    //? button text
    .button-text {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-100, #121212)')};
        text-align: center;
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
    }
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
            <SearchButton disabled={keyword === '' || disableSearch} onClick={onClickSearch}>
                <span className="button-text">Search</span>
            </SearchButton>
        </div>
    );
};

const WalletSearch = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress);
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals);

    const { getWalletSearch } = useTokenDetail();

    const [searchAddress, setSearchAddress] = useState<string>('');
    const [balanceAmount, setBalanceAmount] = useState<string>('');
    const [allAllowances, setAllAllowances] = useState<any[]>([]);
    const [allReceives, setAllReceives] = useState<any[]>([]);

    const onClickSearch = () => {
        fetchWalletSearch();
    };

    const fetchWalletSearch = useCallback(async () => {
        if (isInit) {
            const searchResult = await getWalletSearch(contractAddress, searchAddress);

            if (searchResult) {
                setBalanceAmount(searchResult.balanceAmount);
                setAllAllowances(searchResult.allAllowances);
                setAllReceives(searchResult.allSpenders);
            }
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
            </BalanceWrapper>
            <Allowances searchAllowances={allAllowances} searchReceivers={allReceives} />
        </WalletSearchWrapper>
    );
};

export default WalletSearch;
