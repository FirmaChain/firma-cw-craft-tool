import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FirmaUtil } from '@firmachain/firma-js';

import SimpleSwitch from '../../../../../atoms/switch/simpleSwitch';
import InputTextWithLabelTip from '../../../../../atoms/input/inputTextWithLabelTip';
import { GlobalActions } from '../../../../../../redux/actions';
import { rootState } from '../../../../../../redux/reducers';

import { MinterbleOption, MinterbleText, MinterbleWrapper } from './style';

interface IProps {
    decimals: string;
    onChangeMinterble: (value: boolean) => void;
    onChangeMinterCap: (value: string) => void;
    onChangeMinterAddress: (value: string) => void;
}

const Minterble = ({ decimals, onChangeMinterble, onChangeMinterCap, onChangeMinterAddress }: IProps) => {
    const { cw20Mode } = useSelector((state: rootState) => state.global);
    const [isMinterble, setIsMinterble] = useState<boolean>(false);
    const [minterCap, setMinterCap] = useState<string>('');
    const [minterAddress, setMinterAddress] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

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
        setIsValid(validateAddress(value));
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
            {!isMinterble ? (
                <></>
            ) : cw20Mode === 'BASIC' ? (
                <InputTextWithLabelTip
                    placeHolderLeft="0"
                    label="Minter Cap"
                    tooltipText={CAP_TOOLTIP_TEXT}
                    value={minterCap}
                    type="number"
                    decimals={decimals === '' ? '6' : decimals}
                    onChange={(value) => {
                        setMinterCap(value);
                        onChangeMinterCap(value);
                    }}
                />
            ) : (
                <Fragment>
                    <InputTextWithLabelTip
                        placeHolderLeft="Input minter address"
                        label="Minter Address"
                        tooltipText={ADDRESS_TOOLTIP_TEXT}
                        value={minterAddress}
                        type="text"
                        isValid={!isValid}
                        onChange={handleMinterAddress}
                    />
                    <InputTextWithLabelTip
                        placeHolderLeft="0"
                        label="Minter Cap"
                        tooltipText={''}
                        value={minterCap}
                        type="number"
                        decimals={decimals === '' ? '6' : decimals}
                        onChange={(value) => {
                            setMinterCap(value);
                            onChangeMinterCap(value);
                        }}
                    />
                </Fragment>
            )}
        </MinterbleWrapper>
    );
};

export default Minterble;
