import { useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';

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
                        regex: /[^0-9,]/g
                    }}
                />
            </ContentWrap>
        </Container>
    );
};

export default Burn;
