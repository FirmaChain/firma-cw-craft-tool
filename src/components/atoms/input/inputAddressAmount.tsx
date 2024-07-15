import React, { useEffect } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput2 from './labelInput2';
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
        else setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });

        onChangeAddress(value);
    };

    const handleAmount = (value: string) => {
        onChangeAmount(value);

        // const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
        // if (regex.test(value)) {
        //     onChangeAmount(value);
        // }
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
            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                {/* Wallet Address */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '420px', gap: '8px' }}>
                    <LabelInput2
                        labelProps={{ index, label: addressTitle }}
                        inputProps={{
                            formId: `${id}_ADDRESS`,
                            value: address,
                            onChange: handleAddress,
                            placeHolder: addressPlaceholder,
                            emptyErrorMessage: 'Please input firmachain wallet address'
                        }}
                    />
                    {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '24px',
                                height: '24px',
                                borderRadius: '6px',
                                background: '#313131',
                                fontSize: '12px',
                                color: '#999',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {index}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{addressTitle}</div>
                    
                    </div>
                    <VariableInput
                        value={address}
                        onChange={handleAddress}
                        placeHolder={addressPlaceholder}
                        // Input wallet Address
                        errorMessage={!isValid ? ['Input valid wallet address'] : []}
                    /> */}
                </div>
                {/* Wallet Amount */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '164px', gap: '8px' }}>
                    {/* <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            minHeight: '24px'
                        }}
                    >
                        <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{amountTitle}</div>
                    </div>
                    <VariableInput value={amount} onChange={handleAmount} placeHolder={'0'} textAlign="right" /> */}
                    <LabelInput2
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
                        height: '70px',
                        paddingBottom: '6px',
                        justifyContent: 'flex-end'
                    }}
                >
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
    );
};

export default React.memo(InputAddressAmount);
