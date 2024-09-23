import { useEffect, useMemo } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import { compareStringNumbers, getTokenAmountFromUToken, getUTokenAmountFromToken, isZeroStringValue } from '@/utils/balance';
import LabelInput from '@/components/atoms/input/labelInput';
import useExecuteStore from '../../hooks/useExecuteStore';
import { parseAmountWithDecimal2 } from '@/utils/common';
import useFormStore from '@/store/formStore';
import useExecuteActions from '../../action';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { TOOLTIP_ID } from '@/constants/tooltip';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const WalletBalanceWrap = styled.div`
    display: flex;
    gap: 4px;
    width: fit-content;
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
    const tokenInfo = useExecuteStore((v) => v.tokenInfo);
    const cw20Balance = useExecuteStore((v) => v.cw20Balance);
    const burnAmount = useExecuteStore((v) => v.burnAmount);
    const setBurnAmount = useExecuteStore((v) => v.setBurnAmount);
    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const address = useSelector((state: rootState) => state.wallet.address);
    const { setCw20Balance } = useExecuteActions();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const handleBurnAmount = (value: string) => {
        if (!isZeroStringValue(value)) clearFormError({ id: 'burnAmount', type: 'BURN_AMOUNT' });
        else
            setFormError({
                id: 'burnAmount',
                type: 'BURN_AMOUNT',
                message: 'Please enter a value other than 0.'
            });

        setBurnAmount(value);
    };

    useEffect(() => {
        setCw20Balance(contractAddress, address);
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearBurn();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens, reducing the total supply</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <ContentWrap>
                <LabelInput
                    labelProps={{ label: 'Burn Amount' }}
                    inputProps={{
                        value: burnAmount === null ? '' : burnAmount,
                        formId: 'burnAmount',
                        type: 'number',
                        onChange: handleBurnAmount,
                        placeHolder: '0',
                        decimal: tokenInfo.decimals,
                        hideErrorMessage: true,
                        maxValue: getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString()),
                        emptyErrorMessage: 'Please input the amount.'
                    }}
                />

                <WalletBalanceWrap
                    data-tooltip-content={parseAmountWithDecimal2(cw20Balance, tokenInfo.decimals.toString())}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    <WalletBalanceTypo style={{ whiteSpace: 'pre' }}>Balance :</WalletBalanceTypo>
                    <WalletBalanceTypo className="clamp-single-line">
                        {parseAmountWithDecimal2(cw20Balance, tokenInfo.decimals.toString(), true)}
                    </WalletBalanceTypo>
                </WalletBalanceWrap>
            </ContentWrap>
        </Container>
    );
};

export default Burn;
