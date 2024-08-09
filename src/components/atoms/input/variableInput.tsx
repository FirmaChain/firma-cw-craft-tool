import { useRef, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { IC_CALENDAR } from '../icons/pngIcons';
import { DEFAULT_INPUT_REGEX, FLOAT_NUMBER, INT_NUMBERS } from '@/constants/regex';
import { compareStringNumbers } from '@/utils/balance';
import useFormStore from '@/store/formStore';
import { NumericFormat } from 'react-number-format';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
    $readOnly?: boolean;
    $disabled?: boolean;
}>`
    width: 100%;
    min-height: 48px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background: ${({ $readOnly }) => ($readOnly ? 'var(--Gray-550, #444)' : 'var(--Gray-400, #2c2c2c)')};

    //? Set border color by state
    border: 1px solid
        ${({ $isFocus, $error, $readOnly }) =>
            $error
                ? 'var(--Status-Alert, #E55250) !important'
                : $isFocus && !$readOnly
                  ? 'var(--Gray-550, #FFFFFF) !important'
                  : 'var(--Gray-500, #383838)'};
    border-radius: 6px;
    cursor: text;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${({ $isFocus, $readOnly }) => ($isFocus && !$readOnly ? '#FFFFFF' : 'var(--Gray-550, #444)')};
    }

    input {
        background: transparent;
        width: 100%;
        height: 100%;
        z-index: 1;
        color: ${({ $disabled, $readOnly }) => ($disabled || $readOnly ? '#707070' : '#ffffff')};
        border: none;

        padding: 0 16px;

        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */

        text-align: ${({ $textAlign }) => $textAlign};

        &::placeholder {
            color: var(--Gray-600, #707070);
            /* Body/Body2 - Md */
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
        }

        outline: none;
        &:focus {
            outline: 0;
        }
        &:focus-visible {
            outline: 0;
        }
    }

    .current-length {
        color: ${({ $currentLength }) => ($currentLength > 0 ? 'var(--Gray-800, #E6E6E6)' : 'var(--Gray-600, #707070)')};
        /* Body/Body2 - Bd */
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
    }

    .available-length {
        color: var(--Gray-600, #707070);
        /* Body/Body2 - Rg */
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
    }
`;

const ErrorMessage = styled.div`
    color: var(--Status-Alert, #e55250);
    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

interface InputProps {
    value: string; //
    placeHolder: string; //
    maxLength?: number; //
    onChange: (value: string) => void; //
    onBlur?: () => void; //
    errorMessage?: string[]; //
    regex?: RegExp; //
    type?: 'string' | 'number' | 'date'; //
    decimal?: number; //
    maxValue?: string; //
    textAlign?: 'left' | 'center' | 'right'; //
    readOnly?: boolean; //
    disabled?: boolean;
    onClickDate?: () => void;
    hideErrorMessage?: boolean;
    inputId?: string;
}

const VariableInput = ({
    value,
    type = 'string',
    onChange,
    onBlur = () => {},
    maxLength,
    placeHolder,
    textAlign = 'left',
    errorMessage = [],
    readOnly = false,
    disabled = false,
    decimal = 6,
    maxValue,
    regex,
    onClickDate,
    hideErrorMessage = false,
    inputId
}: InputProps) => {
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>();

    const valueLength = typeof value === 'object' ? 0 : String(value).length;
    const isError = errorMessage.length > 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.currentTarget.value.replace(DEFAULT_INPUT_REGEX, '');

        // try {
        if (inputValue.length > 0) {
            if (type === 'number') {
                inputValue = inputValue.replace(decimal === 0 ? INT_NUMBERS : FLOAT_NUMBER, '');

                if (inputValue.startsWith('.')) inputValue = `${0}${inputValue}`;
            } else {
                //? Filter input string if valid regex provided
                if (regex) inputValue = inputValue.replace(regex, '');

                //? Slice remaining string if maxLength provided
                if (typeof maxLength === 'number') inputValue = inputValue.slice(0, maxLength);
            }
        }

        onChange(inputValue);
    };

    const _onBlur = () => {
        clearFormError({ id: inputId, type: 'OUT_OF_RANGE' });
        onBlur();
    };

    return (
        <div
            onClick={() => type === 'date' && onClickDate && onClickDate()}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                height: 'fit-content',
                position: 'relative'
            }}
        >
            <StyledInput
                onClick={() => inputRef.current?.focus()}
                onBlur={() => {
                    setIsFocus(false);
                    _onBlur();
                }}
                $isFocus={isFocus}
                $error={isError}
                $currentLength={String(value).length}
                $textAlign={textAlign}
                $readOnly={readOnly}
                $disabled={disabled}
                onFocus={() => !readOnly && setIsFocus(true)}
            >
                {type === 'number' ? (
                    <NumericFormat
                        getInputRef={inputRef}
                        value={value}
                        onChange={handleChange}
                        thousandSeparator
                        max={maxValue}
                        decimalScale={decimal}
                        isAllowed={({ value }) => {
                            if (value.includes('-')) return false;

                            if (compareStringNumbers(value, maxValue) > 0) {
                                setFormError({ id: inputId, type: 'OUT_OF_RANGE', message: 'Input exceeds valid range.' });
                                return false;
                            } else return true;
                        }}
                        placeholder={placeHolder}
                        readOnly={readOnly}
                        disabled={disabled}
                        min={'0'}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        value={value && type === 'date' ? format(Number(value), 'MMMM-dd-yyyy HH:mm:ss a') : value}
                        type="text"
                        onChange={handleChange}
                        placeholder={placeHolder}
                        readOnly={readOnly || type === 'date'}
                        disabled={disabled}
                    />
                )}

                {typeof maxLength === 'number' && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '16px' }}>
                        <div className="current-length">{valueLength}</div>
                        <div className="available-length">/{maxLength}</div>
                    </div>
                )}
                {type === 'date' && (
                    <div style={{ marginRight: '10px' }}>
                        <button
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <img src={IC_CALENDAR} alt="date-picker" style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
                        </button>
                    </div>
                )}
            </StyledInput>
            {!hideErrorMessage && (
                <div style={{ paddingTop: errorMessage.length > 0 ? '4px' : 0 }}>
                    <ErrorMessage>{errorMessage[0]}</ErrorMessage>
                </div>
            )}
        </div>
    );
};

export default VariableInput;
