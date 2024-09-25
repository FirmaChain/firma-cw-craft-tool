import { DEFAULT_INPUT_REGEX } from '@/constants/regex';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
    $readOnly?: boolean;
}>`
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0px 10px 0px 24px;
    gap: 8px;

    background: var(--Gray-200, #1a1a1a);

    //? Set border color by state
    border: 1px solid
        ${({ $isFocus, $error, $readOnly }) =>
            $error
                ? 'var(--Status-Alert, #E55250) !important'
                : $isFocus && !$readOnly
                  ? 'var(--Gray-550, #FFFFFF) !important'
                  : 'var(--Gray-550, #444)'};
    border-radius: 12px;
    cursor: text;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${({ $isFocus, $readOnly }) => ($isFocus && !$readOnly ? '#FFFFFF' : 'var(--Gray-550, #565656)')};
    }

    input {
        background: transparent;
        width: 100%;
        height: 100%;
        z-index: 1;
        color: #ffffff;
        border: none;

        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 142.857% */

        text-align: ${({ $textAlign }) => $textAlign};

        &::placeholder {
            color: var(--Gray-600, #707070);
            /* Body/Body2 - Md */
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 142.857% */
        }

        outline: none;
        &:focus {
            outline: 0;
        }
        &:focus-visible {
            outline: 0;
        }
    }
`;

interface InputProps {
    value: string; //
    placeHolder: string; //
    onChange: (value: string) => void; //
    onClickEvent?: () => void;
    textAlign?: 'left' | 'center' | 'right'; //
    readOnly?: boolean; //
    adornment?: {
        start?: React.ReactElement;
        end?: React.ReactElement;
    };
    autoComplete?: boolean;
}

const SearchInputWithButton2 = ({
    value,
    onChange,
    onClickEvent,
    placeHolder,
    textAlign = 'left',
    readOnly = false,
    adornment,
    autoComplete
}: InputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onClickEvent && onClickEvent();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value.replace(DEFAULT_INPUT_REGEX, ''));
    };

    return (
        <StyledInput
            onClick={() => inputRef.current?.focus()}
            onKeyDown={handleKeyPress}
            onBlur={() => {
                setIsFocus(false);
            }}
            $isFocus={isFocus}
            $currentLength={String(value).length}
            $textAlign={textAlign}
            $readOnly={readOnly}
            onFocus={() => !readOnly && setIsFocus(true)}
        >
            {adornment.start && <>{adornment.start}</>}
            <input ref={inputRef} value={value} type="text" onChange={handleChange} placeholder={placeHolder} readOnly={readOnly} />
            {adornment.end && <>{adornment.end}</>}
        </StyledInput>
    );
};

export default SearchInputWithButton2;
