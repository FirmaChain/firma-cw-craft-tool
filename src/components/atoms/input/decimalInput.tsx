import React, { useState } from 'react';
import VariableInput from './variableInput';

interface IProps {
    placeHolderLeft: string;
    enableLength?: boolean;
    label: string;
    value: string | number | null;
    maxDecimal?: number;
    maxLength?: number;
    onChange: (value: string) => void;
}

const INVALID_MESSAGE = 'Please input decimal';

const DecimalInput = ({
    placeHolderLeft,
    enableLength = false,
    label,
    value,
    maxDecimal = 18,
    maxLength = Number.MAX_SAFE_INTEGER,

    onChange
}: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        if (value !== '') {
            const regex = new RegExp(`^\\d*\\.?\\d{0,${value}}$`);
            if (regex.test(value)) {
                const _value = Math.min(maxDecimal, Number(value)).toString();

                onChange(_value);
            }
        } else {
            onChange('');
        }

        if (value === '') {
            if (!errorMessage.includes(INVALID_MESSAGE)) setErrorMessage([...errorMessage, INVALID_MESSAGE]);
        } else setErrorMessage((v) => v.filter((one) => one !== INVALID_MESSAGE));
    };

    const onBlur = () => {
        if (value === '') {
            if (!errorMessage.includes(INVALID_MESSAGE)) setErrorMessage([...errorMessage, INVALID_MESSAGE]);
        } else setErrorMessage((v) => v.filter((one) => one !== INVALID_MESSAGE));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', gap: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</div>

            <VariableInput
                value={value}
                onChange={handleAmount}
                maxLength={maxLength}
                enableLength={enableLength}
                placeHolder={placeHolderLeft}
                onBlur={onBlur}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default DecimalInput;
