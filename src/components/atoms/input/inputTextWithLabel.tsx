import React, { CSSProperties } from 'react';
import { FormControl, FormLabel, Stack } from '@mui/material';
import { InputType } from '@/interfaces/input';
import VariableInput from './variableInput';

interface IProps {
    placeHolderLeft: string;
    enableLength?: boolean;
    label: string;
    value: string | number | null;
    type?: InputType;
    maxLength?: number;
    sx?: CSSProperties;
    onChange: (value: string) => void;
}

const InputTextWithLabel = ({
    placeHolderLeft,
    enableLength = false,
    label,
    value,
    type = 'text',
    maxLength = Number.MAX_SAFE_INTEGER,
    sx = {},
    onChange
}: IProps) => {
    const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.currentTarget.value;

        if (type === 'number') {
            //? Max decimal is 16
            const numericValue = parseFloat(inputValue);
            if (numericValue > maxLength) {
                inputValue = maxLength.toString();
            }
        } else if (['text', 'password', 'email', 'tel', 'url'].includes(type)) {
            //? Max input length applied
            inputValue = inputValue.slice(0, maxLength);
        }

        onChange(inputValue);
    };

    return (
        <Stack sx={{ ...sx, width: '100%' }}>
            <FormControl variant="outlined" sx={{ gap: '8px' }}>
                <FormLabel>
                    <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</Stack>
                </FormLabel>
                <VariableInput
                    value={value}
                    onChange={handleInputText}
                    type={type}
                    maxLength={maxLength}
                    enableLength={enableLength}
                    placeHolder={placeHolderLeft}
                />
            </FormControl>
        </Stack>
    );
};

export default InputTextWithLabel;
