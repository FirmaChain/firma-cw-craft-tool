import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
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
    const burnList = useCW721ExecuteStore((state) => state.burnList);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const setBurnList = useCW721ExecuteStore((state) => state.setBurnList);
    const clearBurnForm = useCW721ExecuteStore((state) => state.clearBurnForm);
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const onChangeBurnId = (text: string) => {
        const cleanedText = text.replace(/,+/g, ',').replace(/^,/, '');

        if (cleanedText === '') {
            //! if input valid is empty
            setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'INPUT_IS_EMPTY', message: 'Please input burn NFT id.' });
        } else {
            //! if ends with comma
            if (cleanedText.endsWith(','))
                setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'ENDS_WITH_COMMA', message: 'Token ID list must end with number.' });
            else clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'ENDS_WITH_COMMA' });

            //? get input nft ids array
            const idMap = new Map();
            const splited = cleanedText.split(',').filter((v) => v !== ''); //? filter empty value after comma
            splited.forEach((v) => {
                const parsed = parseInt(v).toString();
                idMap.set(parsed, parsed);
            });

            const burnIds = Array.from(idMap.keys());

            //! if user does not own some ids in burn list
            if (!myNftList.some((ownedId) => !burnIds.includes(ownedId))) {
                setFormError({
                    id: 'CW721_NFT_BURN_ID_INPUT',
                    type: 'DOES_NOT_OWNED',
                    message: `Contains an NFT ID that you don't own.`
                });
            } else clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DOES_NOT_OWNED' });

            //! if duplicted id included
            if (splited.length > 1 && idMap.size !== splited.length)
                setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DUPLICATED_IDS', message: 'Duplicated NFT id encluded.' });
            else clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DUPLICATED_IDS' });
        }

        setBurnList(cleanedText);
    };

    useEffect(() => {
        //? clear error and input before unmount
        return () => {
            clearBurnForm();
            useFormStore.getState().clearForm();
        };
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
                        emptyErrorMessage: 'Please input burn NFT id.',
                        regex: /[^0-9,]/g
                    }}
                />
            </ContentWrap>
        </Container>
    );
};

export default Burn;
