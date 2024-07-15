import { InputType } from '@/interfaces/input';
import { useId, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $isHover?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
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
        ${({ $isFocus, $error }) =>
            $error
                ? 'var(--Status-Alert, #E55250) !important'
                : $isFocus
                  ? 'var(--Gray-550, #FFFFFF) !important'
                  : 'var(--Gray-500, #383838)'};
    border-radius: 6px;
    cursor: text;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${({ $isFocus }) => ($isFocus ? '#FFFFFF' : 'var(--Gray-550, #444)')};
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
        &:focus: {
            outline: 0;
        }
        &:focus-visible: {
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

const VariableInput2 = ({
    value,
    type = 'text',
    onChange,
    onBlur,
    maxLength,
    placeHolder,
    textAlign = 'left',
    errorMessage = []
}: {
    value: string | number | null;
    type?: InputType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    maxLength?: number;
    placeHolder?: string;
    textAlign?: 'left' | 'center' | 'right';
    errorMessage?: string[];
}) => {
    const key = useId();
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>();

    const valueLength = typeof value === 'object' ? 0 : String(value).length;
    const isError = errorMessage.length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', height: 'fit-content' }}>
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
                onFocus={() => setIsFocus(true)}
            >
                <input
                    ref={inputRef}
                    value={value}
                    type={type === 'number' ? 'text' : type}
                    onChange={onChange}
                    placeholder={placeHolder}
                />
                {typeof maxLength === 'number' && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '16px' }}>
                        <div className="current-length">{valueLength}</div>
                        <div className="available-length">/{maxLength}</div>
                    </div>
                )}
            </StyledInput>
            <div style={{ paddingTop: '4px', paddingLeft: '8px' }}>
                {errorMessage.map((one, idx) => (
                    <ErrorMessage key={key + '_' + idx}>{one}</ErrorMessage>
                ))}
            </div>
        </div>
    );
};

export default VariableInput2;
