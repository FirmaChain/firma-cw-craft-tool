import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import { compareStringNumbers, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import LabelInput2 from '@/components/atoms/input/labelInput2';
import useExecuteStore from '../../hooks/useExecuteStore';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const WalletBalanceWrap = styled.div`
    display: flex;
    gap: 4px;
`;

const WalletBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const Burn = () => {
    const { tokenInfo, cw20Balance, setBurnAmount } = useExecuteStore.getState();

    const [inputBurnAmount, setInputBurnAmount] = useState<string>('');

    const handleBurnAmount = (value: string) => {
        const truncateDecimals = (value: string) => {
            const decimalPlaces = tokenInfo.decimals;
            const fractionalPart = value.split('.')[1];

            if (!fractionalPart || fractionalPart.length <= decimalPlaces) {
                return value;
            }
            return cw20Balance;
        };

        const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
        if (!isValidFormat) {
            return;
        }

        const truncatedValue = truncateDecimals(value);
        const convertBurnAmount = getUTokenAmountFromToken(truncatedValue, tokenInfo.decimals.toString());
        const burnAmount =
            compareStringNumbers(cw20Balance, convertBurnAmount) === 1
                ? truncatedValue
                : getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString());

        setInputBurnAmount(burnAmount);
        setBurnAmount(burnAmount);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens, reducing the total supply</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <ContentWrap>
                <LabelInput2
                    labelProps={{ label: 'Burn Amount' }}
                    inputProps={{ value: inputBurnAmount, formId: 'BURN_AMOUNT', onChange: handleBurnAmount, placeHolder: '0' }}
                />

                <WalletBalanceWrap>
                    <WalletBalanceTypo>Balance :</WalletBalanceTypo>
                    <WalletBalanceTypo>{formatWithCommas(getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString()))}</WalletBalanceTypo>
                </WalletBalanceWrap>
            </ContentWrap>
        </Container>
    );
};

export default Burn;
