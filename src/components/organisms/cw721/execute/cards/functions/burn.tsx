import { useCallback, useEffect, useMemo, useRef } from 'react';
import { styled } from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useFormStore from '@/store/formStore';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';

import { NUMBERS_WITH_COMMA } from '@/constants/regex';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

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
    const address = useWalletStore((v) => v.address);
    // const address = useSelector((v: rootState) => v.wallet.address);

    const context = useCW721Execute();
    const contractAddress = context.contractAddress;
    const burnList = context.burnList;
    const nftDatas = context.nftDatas;

    const setBurnList = context.setBurnList;
    const clearBurnForm = context.clearBurnForm;
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const { setFctBalance, setMyNftList, setNftDatas, setTotalNfts } = useCW721ExecuteAction();

    const onChangeBurnId = (text: string) => {
        const cleanedText = text.replace(/,+/g, ',').replace(/^,/, '');

        if (cleanedText === '') {
            //! if input valid is empty
            setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'INPUT_IS_EMPTY', message: 'Please input the token ID.' });
        }

        setNftDatas(contractAddress, address, cleanedText);
        setBurnList(cleanedText);
    };

    useEffect(() => {
        if (burnList !== '') {
            //! if ends with comma
            if (burnList.endsWith(','))
                setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'ENDS_WITH_COMMA', message: 'Token ID list must end with number.' });
            else clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'ENDS_WITH_COMMA' });

            //? get input nft ids array
            const idMap = new Map();
            const splited = burnList.split(',').filter((v) => v !== ''); //? filter empty value after comma
            splited.forEach((v) => {
                const parsed = BigInt(v).toString();
                idMap.set(parsed, parsed);
            });
            //! if user does not own some ids in burn list
            if (splited.length === nftDatas.length) {
                clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DOES_NOT_OWNED' });
            } else {
                setFormError({
                    id: 'CW721_NFT_BURN_ID_INPUT',
                    type: 'DOES_NOT_OWNED',
                    message: `This token ID is not owned or approved.`
                });
            }

            if (splited.includes('0')) {
                setFormError({
                    id: 'CW721_NFT_BURN_ID_INPUT',
                    type: 'ENTER_THAN_0',
                    message: 'Please enter a value other than 0.'
                });
            } else {
                clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'ENTER_THAN_0' });
            }

            //! if duplicted id included
            if (splited.length > 1 && idMap.size !== splited.length)
                setFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DUPLICATED_IDS', message: 'Some token IDs are duplicated.' });
            else clearFormError({ id: 'CW721_NFT_BURN_ID_INPUT', type: 'DUPLICATED_IDS' });
        }
    }, [burnList, nftDatas]);

    useEffect(() => {
        if (contractAddress === null) return;

        setFctBalance(address);
        setMyNftList(contractAddress, address);
        setTotalNfts(contractAddress);

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
                        <TotalMintSupplyBalance style={{ fontWeight: '400' }}>NFT</TotalMintSupplyBalance>
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
                        emptyErrorMessage: 'Please input the token ID.',
                        regex: NUMBERS_WITH_COMMA
                    }}
                />
            </ContentWrap>
        </Container>
    );
};

export default Burn;
