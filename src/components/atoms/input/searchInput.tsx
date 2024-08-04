import { DEFAULT_INPUT_REGEX } from '@/constants/regex';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
    $readOnly?: boolean;
    $maxWidth?: string;
    $height?: string;
}>`
    width: 100%;
    max-width: ${({ $maxWidth }) => $maxWidth || '100%'};
    min-height: ${({ $height }) => $height || '44px'};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0 16px;
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
    border-radius: 6px;
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

        // padding: 0 16px;

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

interface InputProps {
    value: string; //
    placeHolder: string; //
    // maxLength?: number; //
    onChange: (value: string) => void; //
    // onBlur?: () => void; //
    // errorMessage?: string[]; //
    // regex?: RegExp; //
    // type?: 'string' | 'number' | 'date'; //
    // decimal?: number; //
    // maxValue?: number; //
    textAlign?: 'left' | 'center' | 'right'; //
    readOnly?: boolean; //

    adornment?: {
        start?: React.ReactElement;
        end?: React.ReactElement;
    };

    maxWidth?: string;
    height?: string;
}

const SearchInput2 = ({
    value,
    onChange,
    placeHolder,
    textAlign = 'left',
    readOnly = false,
    adornment,
    maxWidth = '588px',
    height = '44px'
}: InputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.currentTarget.value.replace(DEFAULT_INPUT_REGEX, '');

        onChange(inputValue);
    };

    return (
        <StyledInput
            onClick={() => inputRef.current?.focus()}
            onBlur={() => {
                setIsFocus(false);
            }}
            $isFocus={isFocus}
            $currentLength={String(value).length}
            $textAlign={textAlign}
            $readOnly={readOnly}
            $maxWidth={maxWidth}
            $height={height}
            onFocus={() => !readOnly && setIsFocus(true)}
        >
            {adornment.start && <>{adornment.start}</>}
            <input ref={inputRef} value={value} type="text" onChange={handleChange} placeholder={placeHolder} readOnly={readOnly} />
            {adornment.end && <>{adornment.end}</>}
        </StyledInput>
    );
};

export default SearchInput2;
