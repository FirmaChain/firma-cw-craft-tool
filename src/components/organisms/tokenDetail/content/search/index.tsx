import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FullDottedDivider } from '../../../../atoms/divider/dottedDivider';
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
import useTokenDetail from '../../../../../hooks/useTokenDetail';
import { rootState } from '../../../../../redux/reducers';
import SearchInputWithButton from '../../../../atoms/input/searchInputWithButton';
import { getTokenStrFromUTokenStr } from '../../../../../utils/common';

interface IProps {
    tokenSymbol: string;
    decimals: string;
    contractAddress: string;
}

const WalletSearch = ({ contractAddress, tokenSymbol, decimals }: IProps) => {
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [balanceAmount, setBalanceAmount] = useState<string>('');
    const [allAllowances, setAllAllowances] = useState<any[]>([]);
    const [allReceives, setAllReceives] = useState<any[]>([]);

    const { getWalletSearch } = useTokenDetail();

    const { isInit } = useSelector((state: rootState) => state.wallet);

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
            <WalletTitleTypo>Wallet Address Search</WalletTitleTypo>
            <SearchInputWithButton
                sx={{
                    color: '#FFF',
                    fontFamily: 'General Sans Variable',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '22px'
                }}
                placeholder={'Input Wallet Address'}
                value={searchAddress}
                onChange={(value) => setSearchAddress(value)}
                onClickRemove={() => setSearchAddress('')}
                onClickSearch={onClickSearch}
            />
            <FullDottedDivider />
            <BalanceWrapper>
                <BalanceLabelTypo>Balances</BalanceLabelTypo>
                <BalanceAmountWrapper>
                    <BalanceAmountTypo>{balanceAmount === '' ? '0' : getTokenStrFromUTokenStr(balanceAmount, decimals)}</BalanceAmountTypo>
                    <BalanceSymbolTypo>{tokenSymbol}</BalanceSymbolTypo>
                </BalanceAmountWrapper>
            </BalanceWrapper>
            <Allowances decimals={decimals} searchAllowances={allAllowances} searchReceivers={allReceives} />
        </WalletSearchWrapper>
    );
};

export default WalletSearch;
