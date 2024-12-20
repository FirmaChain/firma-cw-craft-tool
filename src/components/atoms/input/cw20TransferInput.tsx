import React from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';

import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { getMaxCW20InitWalletAmount, isZeroStringValue } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';
import WalletRemoveButton from '../buttons/walletRemoveButton';
import useWalletStore from '@/store/walletStore';

interface IProps {
    index: number;
    address: string;
    amount: string;
    onChangeAddress: (value: string) => void;
    onChangeAmount: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    decimals: string;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
    inputId: string;
}

const CW20TransferInput = ({
    index,
    address,
    amount,
    onChangeAddress,
    onChangeAmount,
    onRemoveClick,
    isValid,
    isLast,
    decimals,
    addressTitle,
    addressPlaceholder,
    amountTitle,
    inputId
}: IProps) => {
    const id = inputId;
    const userAddress = useWalletStore((v) => v.address);
    // useSelector((v: rootState) => v.wallet.address);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const checkValidAddress = (value: string) => {
        if (value !== '') {
            if (!isValidAddress(value)) {
                setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
                return;
            } else clearFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });

            if (value.toLowerCase() === userAddress.toLowerCase()) {
                setFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
                return;
            } else clearFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });
        } else {
            clearFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
            clearFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });
        }
    };

    const handleAddress = (value: string) => {
        checkValidAddress(value);

        onChangeAddress(value);
    };

    const handleAmount = (value: string) => {
        if (!isZeroStringValue(value)) clearFormError({ id: `${id}_AMOUNT`, type: 'TRANSFER_AMOUNT' });
        else setFormError({ id: `${id}_AMOUNT`, type: 'TRANSFER_AMOUNT', message: 'Please enter a value other than 0.' });

        onChangeAmount(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '12px' }}>
                {/* Wallet Address */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',

                        width: '100%',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ index, label: addressTitle }}
                        inputProps={{
                            formId: `${id}_ADDRESS`,
                            value: address,
                            onChange: handleAddress,
                            placeHolder: addressPlaceholder,
                            emptyErrorMessage: 'Please input firmachain wallet address.',
                            regex: WALLET_ADDRESS_REGEX
                        }}
                    />
                </div>
                {/* Wallet Amount */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%',
                        maxWidth: '164px',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ label: amountTitle }}
                        inputProps={{
                            formId: `${id}_AMOUNT`,
                            value: amount,
                            onChange: handleAmount,
                            placeHolder: '0',
                            type: 'number',
                            decimal: decimals ? Number(decimals) : 6,
                            emptyErrorMessage: 'Please input the amount.',
                            textAlign: 'right',
                            maxValue: getMaxCW20InitWalletAmount(decimals)
                        }}
                    />
                </div>
                {/* Button */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '32px',
                        height: '100%',
                        justifyContent: 'flex-start',
                        gap: '8px'
                    }}
                >
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                        <WalletRemoveButton size="32px" onClick={handleRemoveWallet} disabled={index === 1 && isLast} />
                        {/* <IconButton
                            style={{
                                width: '32px',
                                height: '32px',
                                padding: '0',
                                background: 'transparent',
                                border: 'unset',
                                filter: 'unset !important'
                            }}
                            disabled={index === 1 && isLast}
                            onClick={handleRemoveWallet}
                        >
                            {index === 1 && isLast ? (
                                <img style={{ width: '32px', height: '32px' }} src={IC_MINUS_CIRCLE_DISABLE} />
                            ) : (
                                <Icons.MinusCircle />
                            )}
                        </IconButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CW20TransferInput);
