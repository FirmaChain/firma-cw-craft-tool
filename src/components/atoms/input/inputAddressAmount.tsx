import React, { useEffect } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';

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

const InputAddressAmount = ({
    index,
    address,
    amount,
    onChangeAddress,
    onChangeAmount,
    onRemoveClick,
    isValid,
    decimals,
    addressTitle,
    addressPlaceholder,
    amountTitle,
    inputId
}: IProps) => {
    const id = inputId;
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFromError = useFormStore((state) => state.clearFormError);

    const handleAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') clearFromError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });

        onChangeAddress(value.replace(/[^a-zA-Z0-9]/g, ''));
    };

    const handleAmount = (value: string) => {
        onChangeAmount(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    useEffect(() => {
        return () => {
            clearFromError({ id: `${id}_ADDRESS` });
            clearFromError({ id: `${id}_AMOUNT` });
        };
    }, []);

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
                            emptyErrorMessage: 'Please input wallet address.'
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
                            emptyErrorMessage: 'Please input mint amount',
                            textAlign: 'right'
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
                    <div style={{ width: '100%', minHeight: '20px', maxHeight: '20px' }} />
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                            style={{
                                width: '32px',
                                height: '32px',
                                padding: '0',
                                background: 'transparent',
                                border: 'unset',
                                cursor: 'pointer'
                            }}
                            onClick={handleRemoveWallet}
                        >
                            <Icons.MinusCircle />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(InputAddressAmount);
