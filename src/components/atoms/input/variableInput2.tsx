import { useId, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { IC_CALENDAR } from '../icons/pngIcons';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $isHover?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
    $readOnly?: boolean;
}>`
    width: 100%;
    min-height: 48px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background: var(--Gray-400, #2c2c2c);

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
        color: #ffffff;
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
    maxValue?: number; //
    textAlign?: 'left' | 'center' | 'right'; //
    readOnly?: boolean; //
}

const VariableInput2 = ({
    value,
    type = 'string',
    onChange,
    onBlur = () => {},
    maxLength,
    placeHolder,
    textAlign = 'left',
    errorMessage = [],
    readOnly = false,
    decimal = 6,
    maxValue,
    regex
}: InputProps) => {
    const key = useId();
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>();

    const valueLength = typeof value === 'object' ? 0 : String(value).length;
    const isError = errorMessage.length > 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.currentTarget.value;

        if (inputValue.length > 0) {
            if (type === 'number') {
                inputValue = inputValue.replace(decimal === 0 ? /[^0-9]/g : /[^0-9.]/g, '');

                if (inputValue.length > 0 && inputValue.split('').every((one) => one === '0')) inputValue = '0';

                const firstDotIndex = inputValue.indexOf('.');
                if (firstDotIndex !== -1) {
                    inputValue = inputValue.substring(0, firstDotIndex + 1) + inputValue.substring(firstDotIndex + 1).replace(/\./g, '');
                }

                if (typeof decimal === 'number') inputValue = inputValue.replace(new RegExp(`(\\.\\d{${decimal}})\\d+`), '$1');

                //? check if value is bigger than max-value (if maxValue is provided)
                if (typeof maxValue === 'number') inputValue = Number(inputValue) > maxValue ? String(maxValue) : inputValue;
            } else {
                //? Filter input string if valid regex provided
                if (regex) inputValue = inputValue.replace(regex, '');

                //? Slice remaining string if maxLength provided
                if (typeof maxLength === 'number') inputValue = inputValue.slice(0, maxLength);
            }
        }

        onChange(inputValue);
    };

    const handleDateChange = (date: Date) => {
        onChange(String(Number(date)));
    };

    return (
        <div
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
                    onBlur();
                }}
                $isFocus={isFocus}
                $error={isError}
                $currentLength={String(value).length}
                $textAlign={textAlign}
                $readOnly={readOnly}
                onFocus={() => !readOnly && setIsFocus(true)}
            >
                <input
                    ref={inputRef}
                    value={value && type === 'date' ? format(Number(value), 'yyyy-MM-dd hh:mm:ss') : value}
                    type="text"
                    onChange={handleChange}
                    placeholder={placeHolder}
                    readOnly={readOnly}
                />
                {typeof maxLength === 'number' && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '16px' }}>
                        <div className="current-length">{valueLength}</div>
                        <div className="available-length">/{maxLength}</div>
                    </div>
                )}
                {type === 'date' && (
                    <div style={{ marginRight: '16px' }}>
                        <DatePicker
                            selected={value ? new Date(Number(value)) : new Date()}
                            shouldCloseOnSelect
                            onChange={handleDateChange}
                            showTimeSelect
                            customInput={<img src={IC_CALENDAR} alt="date-picker" style={{ width: '24px', cursor: 'pointer' }} />}
                        />
                    </div>
                )}
            </StyledInput>
            <div style={{ paddingTop: errorMessage.length > 0 ? '4px' : 0, paddingLeft: '8px' }}>
                {errorMessage.map((one, idx) => (
                    <ErrorMessage key={key + '_' + idx}>{one}</ErrorMessage>
                ))}
            </div>
        </div>
    );
};

export default VariableInput2;
