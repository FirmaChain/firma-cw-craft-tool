import React, { CSSProperties, useState } from 'react';
import { InputType } from '@/interfaces/input';
import { styled } from 'styled-components';
import Icons from '../icons';
import VariableInput from './variableInput';

interface IProps {
    label: string;
    placeHolder: string;
    value: string;
    type?: InputType;
    sx?: CSSProperties;
    onChange: (value: string) => void;
}

const IconBackground = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

const checkImageUrl = (url: string, onValid: () => void, onInvalid: () => void) => {
    if (url) {
        const img = new Image();
        img.src = url;
        img.onload = () => onValid();
        img.onerror = () => onInvalid();
    } else {
        onValid();
    }
};

const INVLIAD_URL_MESSAGE = 'Input valid image url';

const InputUrlWithImage = ({ label, placeHolder, value, type = 'url', sx = {}, onChange }: IProps) => {
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const handleInputUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = event.currentTarget.value;

        checkImageUrl(
            currentInput,
            () => {
                setValidTokenLogoUrl(currentInput);
                setErrorMessage((v) => v.filter((one) => one !== INVLIAD_URL_MESSAGE));
            },
            () => {
                setValidTokenLogoUrl('');
                if (!errorMessage.includes(INVLIAD_URL_MESSAGE)) setErrorMessage([...errorMessage, INVLIAD_URL_MESSAGE]);
            }
        );
        onChange(currentInput);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'felx-start', width: '100%', gap: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</div>
            <div
                style={{
                    display: 'flex',
                    width: '90px',
                    height: '90px',
                    backgroundColor: '#262626',
                    borderRadius: '153.409px',
                    border: '1px solid #383838',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                {validTokenLogoUrl === '' ? (
                    <IconBackground>
                        <Icons.Picture width={'34px'} height={'34px'} />
                    </IconBackground>
                ) : (
                    <img
                        src={validTokenLogoUrl}
                        alt="token-logo"
                        style={{ width: '90px', height: '90px', maxHeight: '100%', maxWidth: '100%' }}
                    />
                )}
            </div>
            <VariableInput value={value} onChange={handleInputUrl} placeHolder={value ? '' : placeHolder} errorMessage={errorMessage} />
        </div>
    );
};

export default React.memo(InputUrlWithImage);
