import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FirmaUtil } from '@firmachain/firma-js';

import SimpleSwitch from '@/components/atoms/switch/simpleSwitch';
import { GlobalActions } from '@/redux/actions';
import { rootState } from '@/redux/reducers';

import { MinterbleInputBox, MinterbleOption, MinterbleText, MinterbleWrapper } from './style';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
import useInstantiateStore from '../../../instaniateStore';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { getMaxMinterCap, isZeroStringValue } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';

interface IProps {
    decimals: string;
}

const Minterble = ({ decimals }: IProps) => {
    const contractMode = useSelector((state: rootState) => state.global.contractMode);
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const minterble = useInstantiateStore((v) => v.minterble);
    const minterCap = useInstantiateStore((v) => v.minterCap);
    const minterAddress = useInstantiateStore((v) => v.minterAddress);

    const CAP_TOOLTIP_TEXT = `Minter Cap = Total Supply +\nAdditional Mintable Token Amount`;
    const ADDRESS_TOOLTIP_TEXT = `This is the wallet address with the authority\nto mint additional tokens.`;

    const handleMinterble = (value: boolean) => {
        useInstantiateStore.getState().setMinterble(value);

        GlobalActions.handleCw20Minterble(value);

        if (!value) {
            clearFormError({ id: 'minterAddress' });
            clearFormError({ id: 'minterCap' });
        }
    };

    const handleMinterAddress = (value: string) => {
        useInstantiateStore.getState().setMinterAddress(value);

        if (isValidAddress(value) || value === '') clearFormError({ id: 'minterAddress', type: 'ADDRESS_VALIDATION' });
        else {
            setFormError({
                id: 'minterAddress',
                type: 'ADDRESS_VALIDATION',
                message: 'This is an invalid wallet address.'
            });
        }
    };

    const handleMinterCap = (value: string) => {
        if (!isZeroStringValue(value)) clearFormError({ id: 'minterCap', type: 'MINTER_CAP' });
        else setFormError({ id: 'minterCap', type: 'MINTER_CAP', message: 'Please enter a value other than 0.' });

        useInstantiateStore.getState().setMinterCap(value);
    };

    useEffect(() => {
        if (contractMode === 'BASIC') {
            handleMinterAddress('');
            clearFormError({ id: 'minterAddress' });
        }

        if (!minterble) {
            handleMinterCap('');
            clearFormError({ id: 'minterCap' });
        }
    }, [contractMode, minterble]);

    return (
        <MinterbleWrapper>
            <MinterbleOption>
                <MinterbleText>Additional Instantiation</MinterbleText>
                <SimpleSwitch checked={minterble} onChange={handleMinterble} />
            </MinterbleOption>
            <MinterbleInputBox $isOpen={minterble}>
                <div style={{ height: '24px' }} />
                {contractMode === 'ADVANCED' && (
                    <LabelInput
                        labelProps={{ label: 'Minter Address', tooltip: ADDRESS_TOOLTIP_TEXT }}
                        inputProps={{
                            value: minterAddress,
                            formId: 'minterAddress',
                            placeHolder: 'Input minter address',
                            onChange: handleMinterAddress,
                            emptyErrorMessage: 'Please input firmachain wallet address.',
                            regex: WALLET_ADDRESS_REGEX
                        }}
                    />
                )}

                <LabelInput
                    labelProps={{ label: 'Minter Cap', tooltip: CAP_TOOLTIP_TEXT }}
                    inputProps={{
                        value: minterCap,
                        formId: 'minterCap',
                        placeHolder: '0',
                        onChange: handleMinterCap,
                        emptyErrorMessage: 'Please input the minter cap.',
                        type: 'number',
                        decimal: decimals === '' ? 6 : Number(decimals),
                        maxValue: getMaxMinterCap(decimals)
                    }}
                />
            </MinterbleInputBox>
        </MinterbleWrapper>
    );
};

export default Minterble;
