import React from 'react';
import Icons from '../icons';
import VariableInput from './variableInput';
import IconButton from '../buttons/iconButton';

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
    amountTitle
}: IProps) => {
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeAddress(event.currentTarget.value);
    };

    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;

        const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
        if (regex.test(value)) {
            onChangeAmount(value);
        }
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                {/* Wallet Address */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '420px', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
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
                        {/* Recipient Address */}
                    </div>
                    <VariableInput
                        value={address}
                        onChange={handleAddress}
                        placeHolder={addressPlaceholder}
                        // Input wallet Address
                        errorMessage={!isValid ? ['Input valid wallet address'] : []}
                    />
                </div>
                {/* Wallet Amount */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '164px', gap: '8px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            minHeight: '24px'
                        }}
                    >
                        <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{amountTitle}</div>
                        {/* Amount */}
                    </div>
                    <VariableInput value={amount} onChange={handleAmount} placeHolder={'0'} textAlign="right" />
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
