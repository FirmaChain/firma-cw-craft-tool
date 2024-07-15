import React, { useState } from 'react';
import VariableInput from './variableInput';

interface IProps {
    placeHolderLeft: string;
    enableLength?: boolean;
    label: string;
    value: string | number | null;
    maxLength?: number;
    onChange: (value: string) => void;
}

const INVALID_MESSAGE = 'Please input label';

const LabelInput = ({ placeHolderLeft, enableLength = false, label, value, maxLength = Number.MAX_SAFE_INTEGER, onChange }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.currentTarget.value;

        //? Max input length applied
        inputValue = inputValue.slice(0, maxLength);

        onChange(inputValue);

        if (value === '') {
            if (!errorMessage.includes(INVALID_MESSAGE)) setErrorMessage([...errorMessage, INVALID_MESSAGE]);
        } else {
            setErrorMessage((v) => v.filter((one) => one !== INVALID_MESSAGE));
        }
    };

    const onBlur = () => {
        if (value === '') {
            if (!errorMessage.includes(INVALID_MESSAGE)) setErrorMessage([...errorMessage, INVALID_MESSAGE]);
        } else {
            setErrorMessage((v) => v.filter((one) => one !== INVALID_MESSAGE));
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '8px', width: '100%' }}>
            <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</div>

            <VariableInput
                value={value}
                onChange={handleInputText}
                maxLength={maxLength}
                enableLength={enableLength}
                placeHolder={placeHolderLeft}
                onBlur={onBlur}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default LabelInput;
