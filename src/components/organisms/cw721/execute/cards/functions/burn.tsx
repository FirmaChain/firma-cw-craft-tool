import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { compareStringNumbers, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import LabelInput from '@/components/atoms/input/labelInput';
import useExecuteStore from '../../hooks/useCW721ExecuteStore';
import { parseAmountWithDecimal2 } from '@/utils/common';
import useFormStore from '@/store/formStore';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TotalMintWrap = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const TotalMintLabelTypo = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSupplyBalance = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const Burn = () => {
    // const tokenInfo = useExecuteStore((v) => v.tokenInfo);
    // const cw20Balance = useExecuteStore((v) => v.cw20Balance);
    // const burnAmount = useExecuteStore((v) => v.burnAmount);
    // const setBurnAmount = useExecuteStore((v) => v.setBurnAmount);

    // const handleBurnAmount = (value: string) => {
    //     const truncateDecimals = (value: string) => {
    //         const decimalPlaces = tokenInfo.decimals;
    //         const fractionalPart = value.split('.')[1];

    //         if (!fractionalPart || fractionalPart.length <= decimalPlaces) {
    //             return value;
    //         }
    //         return cw20Balance;
    //     };

    //     const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
    //     if (!isValidFormat) {
    //         return;
    //     }

    //     const truncatedValue = truncateDecimals(value);
    //     const convertBurnAmount = getUTokenAmountFromToken(truncatedValue, tokenInfo.decimals.toString());
    //     const burnAmount =
    //         compareStringNumbers(cw20Balance, convertBurnAmount) === 1
    //             ? truncatedValue
    //             : getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString());

    //     setBurnAmount(burnAmount);
    // };

    const [burnIdString, setBurnIdString] = useState('');

    const onChangeBurnId = (text: string) => {
        //? remove duplicated commas
        //? block text starts with comma
        const cleanedText = text.replace(/,+/g, ',').replace(/^,/, '');

        setBurnIdString(cleanedText);
    };

    const totalBurnCount = useMemo(() => {
        if (burnIdString.length === 0) return 0;
        return burnIdString.split(',').filter((one) => one !== '').length;
    }, [burnIdString]);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy an NFT, reducing the total supply</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <TotalMintWrap>
                        <TotalMintLabelTypo>Total Burn Amount :</TotalMintLabelTypo>
                        <TotalMintSupplyBalance>{totalBurnCount}</TotalMintSupplyBalance>
                        <TotalMintSupplyBalance>NFT</TotalMintSupplyBalance>
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>

            <ContentWrap>
                <LabelInput
                    labelProps={{ label: 'Token ID' }}
                    inputProps={{
                        value: burnIdString,
                        formId: 'CW721_NFT_BURN_ID_INPUT',
                        onChange: (v) => onChangeBurnId(v),
                        placeHolder: 'Input the numbers : You can input multiple numbers separated by commas (,)',
                        regex: /[^0-9,]/g //? remove non-number and comma
                    }}
                />
            </ContentWrap>
        </Container>
    );
};

export default Burn;
