import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';

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
    const burnList = useCW721ExecuteStore((state) => state.burnList);
    const setBurnList = useCW721ExecuteStore((state) => state.setBurnList);
    const clearBurnForm = useCW721ExecuteStore((state) => state.clearBurnForm);

    const onChangeBurnId = (text: string) => {
        const cleanedText = text.replace(/,+/g, ',').replace(/^,/, '');

        setBurnList(cleanedText);
    };

    useEffect(() => {
        clearBurnForm();
    }, []);
    
    const totalBurnCount = useMemo(() => {
        if (burnList.length === 0) return 0;
        return burnList.split(',').filter((one) => one !== '').length;
    }, [burnList]);

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
                        value: burnList,
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