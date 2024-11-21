import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { useEffect } from 'react';
// import useExecuteStore from '../../hooks/useExecuteStore';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';
import { useCW20Execute } from '@/context/cw20ExecuteContext';

const MINTER_INPUT_FORM_ID = 'EXECUTE_UPDATE_MINTER';
const MINTER_ERROR_TYPE = 'INVALID_ADDRESS';
const SAME_MINTER_ERROR = 'SAME_ADDRESS';

const UpdateMinter = () => {
    const context = useCW20Execute();
    const minterInfo = context.minterInfo;
    const minterAddress = context.minterAddress;
    const setMinterAddress = context.setMinterAddress;
    const clearMinter = context.clearMinter;

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const onChangeMinter = (v) => {
        if (isValidAddress(v) || v === '') {
            clearFormError({ id: MINTER_INPUT_FORM_ID, type: MINTER_ERROR_TYPE });
        } else {
            setFormError({ id: MINTER_INPUT_FORM_ID, type: MINTER_ERROR_TYPE, message: 'Please input firmachain wallet address.' });
        }

        if (isValidAddress(v) && minterInfo?.minter?.toLowerCase() === v.toLowerCase()) {
            setFormError({ id: MINTER_INPUT_FORM_ID, type: SAME_MINTER_ERROR, message: 'Same address with before.' });
        } else {
            clearFormError({ id: MINTER_INPUT_FORM_ID, type: SAME_MINTER_ERROR });
        }

        setMinterAddress(v);
    };

    useEffect(() => {
        if (minterInfo) {
            setMinterAddress(minterInfo?.minter || '');
        }
    }, [minterInfo]);

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            clearMinter();
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
            <LabelInput
                labelProps={{ label: 'Minter Address' }}
                inputProps={{
                    formId: MINTER_INPUT_FORM_ID,
                    value: minterAddress || '',
                    onChange: onChangeMinter,
                    placeHolder: 'Input Wallet Address',
                    emptyErrorMessage: 'Please input firmachain wallet address.',
                    regex: WALLET_ADDRESS_REGEX
                }}
            />
        </Container>
    );
};

export default UpdateMinter;
