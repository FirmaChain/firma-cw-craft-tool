import React, { CSSProperties, useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Stack, TextField } from '@mui/material';

import { InputType } from '../../../interfaces/input';
import { styled } from 'styled-components';
import theme from '../../../themes';
import Icons from '../icons';

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

const InputUrlWithImage = ({ label, placeHolder, value, type = 'url', sx = {}, onChange }: IProps) => {
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        if (value) {
            const img = new Image();
            img.src = value;
            img.onload = () => {
                setValidTokenLogoUrl(value);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [value]);

    const handleInputUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    // https://i.seadn.io/gcs/files/11570389cac190891fea96fe285cbf01.png?auto=format&dpr=1&w=48
    return (
        <Stack sx={{ ...sx, width: '100%' }}>
            <FormControl variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FormLabel>
                    <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</Stack>
                </FormLabel>
                <Stack
                    sx={{
                        width: '90px',
                        height: '90px',
                        backgroundColor: '#262626',
                        borderRadius: '153.409px',
                        border: '1px solid #383838',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {validTokenLogoUrl === '' ? (
                        <IconBackground>
                            <Icons.picture width={'34px'} height={'34px'} />
                        </IconBackground>
                    ) : (
                        <img src={validTokenLogoUrl} style={{ width: '90px', height: '90px', maxHeight: '100%', maxWidth: '100%' }} />
                    )}
                </Stack>
                <TextField
                    id="custom-text-input-with-label"
                    hiddenLabel
                    autoComplete="off"
                    type={type}
                    value={value}
                    variant="outlined"
                    onChange={handleInputUrl}
                    placeholder={value ? '' : placeHolder}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2C2C2C',
                            '& .MuiOutlinedInput-input::placeholder': {
                                color: '#707070',
                                fontSize: '14px',
                                fontWeight: '500',
                                lineHeight: '20px'
                            },
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: '16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                lineHeight: '20px',
                                color: '#FFF'
                            }
                        }
                    }}
                />
            </FormControl>
        </Stack>
    );
};

export default React.memo(InputUrlWithImage);
