import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { useEffect, useMemo, useState } from 'react';
import useExecuteStore from '../../hooks/useExecuteStore';
import LabelInput2 from '@/components/atoms/input/labelInput2';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';

const MINTER_INPUT_FORM_ID = 'EXECUTE_UPDATE_MINTER';
const MINTER_ERROR_TYPE = 'INVALID_ADDRESS';

const UpdateMinter = ({ minterAddress }: { minterAddress: string }) => {
    const _minterAddress = useExecuteStore((state) => state.minterAddress);
    const setMinterAddress = useExecuteStore((state) => state.setMinterAddress);
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const onChangeMinter = (v) => {
        if (FirmaUtil.isValidAddress(v) || v === '') {
            clearFormError({ id: MINTER_INPUT_FORM_ID, type: MINTER_ERROR_TYPE });
        } else {
            setFormError({ id: MINTER_INPUT_FORM_ID, type: MINTER_ERROR_TYPE, message: 'Input valid firma address' });
        }

        setMinterAddress(v);
    };

    useEffect(() => {
        useExecuteStore.getState().setMinterAddress(minterAddress);
        return () => {
            useExecuteStore.getState().clearForm();
            clearFormError({ id: MINTER_INPUT_FORM_ID });
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Update Minter</HeaderTitleTypo>
                    <HeaderDescTypo>Change the address that has permission to mint new tokens</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <LabelInput2
                labelProps={{ label: 'Minter Address' }}
                inputProps={{
                    formId: MINTER_INPUT_FORM_ID,
                    value: _minterAddress,
                    onChange: onChangeMinter,
                    placeHolder: 'Input Wallet Address',
                    emptyErrorMessage: 'Please input address'
                }}
            />
        </Container>
    );
};

export default UpdateMinter;
