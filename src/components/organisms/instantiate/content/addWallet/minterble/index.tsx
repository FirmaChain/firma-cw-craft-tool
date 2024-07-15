import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { FirmaUtil } from '@firmachain/firma-js';

import SimpleSwitch from '@/components/atoms/switch/simpleSwitch';
import { GlobalActions } from '@/redux/actions';
import { rootState } from '@/redux/reducers';

import { MinterbleOption, MinterbleText, MinterbleWrapper } from './style';
import LabelInput2 from '@/components/atoms/input/labelInput2';
import useFormStore from '@/store/formStore';

interface IProps {
    decimals: string;
    onChangeMinterble: (value: boolean) => void;
    onChangeMinterCap: (value: string) => void;
    onChangeMinterAddress: (value: string) => void;
}

const Minterble = ({ decimals, onChangeMinterble, onChangeMinterCap, onChangeMinterAddress }: IProps) => {
    const cw20Mode = useSelector((state: rootState) => state.global.cw20Mode);
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const [isMinterble, setIsMinterble] = useState<boolean>(false);
    const [minterCap, setMinterCap] = useState<string>('');
    const [minterAddress, setMinterAddress] = useState<string>('');
    // const [isValid, setIsValid] = useState<boolean>(true);

    const CAP_TOOLTIP_TEXT = 'Minter Cap is a value that limits the maximum\nnumber of tokens that can be minted.';
    const ADDRESS_TOOLTIP_TEXT =
        'If you enter a wallet address, the Minter Cap will be applied\nto that wallet. But if you do not enter a wallet address,\nthe Minter Cap will be applied to your own wallet';

    const handleMinterble = (value: boolean) => {
        setIsMinterble(value);
        onChangeMinterble(value);
        GlobalActions.handleCw20Minterble(value);
    };

    const handleMinterAddress = (value: string) => {
        setMinterAddress(value);
        onChangeMinterAddress(value);

        if (validateAddress(value) || value === '') clearFormError({ id: 'minterAddress', type: 'ADDRESS_VALIDATION' });
        else {
            setFormError({
                id: 'minterAddress',
                type: 'ADDRESS_VALIDATION',
                message: 'Please input valid firmachain wallet address.'
            });
        }
    };

    const handleMinterCap = (value: string) => {
        setMinterCap(value);
        onChangeMinterCap(value);
    };

    const validateAddress = (value: string): boolean => {
        return FirmaUtil.isValidAddress(value);
    };

    return (
        <MinterbleWrapper>
            <MinterbleOption>
                <MinterbleText>Additional Instantiation</MinterbleText>
                <SimpleSwitch checked={isMinterble} onChange={handleMinterble} />
            </MinterbleOption>
            {
                isMinterble && (
                    // (cw20Mode === 'BASIC' ? (
                    //     <InputTextWithLabelTip
                    //         placeHolderLeft="0"
                    //         label="Minter Cap"
                    //         tooltipText={CAP_TOOLTIP_TEXT}
                    //         value={minterCap}
                    //         type="number"
                    //         decimals={decimals === '' ? '6' : decimals}
                    //         onChange={(value) => {
                    //             setMinterCap(value);
                    //             onChangeMinterCap(value);
                    //         }}
                    //     />
                    // ) : (
                    <Fragment>
                        {cw20Mode === 'ADVANCED' && (
                            // InputTextWithLabelTip
                            <LabelInput2
                                labelProps={{ label: 'Minter Address', tooltip: ADDRESS_TOOLTIP_TEXT }}
                                inputProps={{
                                    value: minterAddress,
                                    formId: 'minterAddress',
                                    placeHolder: 'Input minter address',
                                    onChange: handleMinterAddress,
                                    emptyErrorMessage: 'Please input minter address.'
                                }}
                                // placeHolderLeft="Input minter address"
                                // label="Minter Address"
                                // tooltipText={ADDRESS_TOOLTIP_TEXT}
                                // value={minterAddress}
                                // type="text"
                                // isValid={!isValid}
                                // onChange={handleMinterAddress}
                            />
                        )}
                        {/* InputTextWithLabelTip */}
                        <LabelInput2
                            labelProps={{ label: 'Minter Cap', tooltip: cw20Mode === 'BASIC' ? CAP_TOOLTIP_TEXT : '' }}
                            inputProps={{
                                value: minterCap,
                                formId: 'minterCap',
                                placeHolder: '0',
                                onChange: handleMinterCap,
                                emptyErrorMessage: 'Please input minter cap.',
                                type: 'number',
                                decimal: decimals === '' ? 6 : Number(decimals)
                            }}
                            // placeHolderLeft="0"
                            // label="Minter Cap"
                            // tooltipText={cw20Mode === 'BASIC' ? CAP_TOOLTIP_TEXT : ''}
                            // value={minterCap}
                            // type="number"
                            // decimals={decimals === '' ? '6' : decimals}
                            // onChange={(value) => {
                            //     setMinterCap(value);
                            //     onChangeMinterCap(value);
                            // }}
                        />
                    </Fragment>
                )
                // ))
            }
        </MinterbleWrapper>
    );
};

export default Minterble;
