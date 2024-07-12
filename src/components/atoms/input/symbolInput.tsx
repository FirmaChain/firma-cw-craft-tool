import React, { useState } from 'react';
import { InputType } from '@/interfaces/input';
import VariableInput from './variableInput';

interface IProps {
    placeHolderLeft: string;
    enableLength?: boolean;
    label: string;
    value: string | number | null;
    type?: InputType;
    maxLength?: number;
    onChange: (value: string) => void;
}

const SymbolInput = ({ placeHolderLeft, enableLength = false, label, value, maxLength = Number.MAX_SAFE_INTEGER, onChange }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value.replace(/[^a-zA-Z]/g, '').slice(0, maxLength);
        onChange(inputValue);

        if (!inputValue) setErrorMessage(['Please input token symbol']);
        else setErrorMessage([]);
    };

    const onBlur = () => {
        if (!value) setErrorMessage(['Please input token symbol']);
        else setErrorMessage([]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
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

export default SymbolInput;
