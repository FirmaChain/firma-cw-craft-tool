import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { FormControl, FormLabel, Stack, TextField, InputAdornment, Tooltip, IconButton } from '@mui/material';
import { InputType } from '../../../interfaces/input';
import Icons from '../icons';

interface IProps {
    placeHolderLeft: string;
    placeHolderRight?: string;
    label: string;
    tooltipText?: string;
    value: string | number | null;
    type?: InputType;
    sx?: CSSProperties;
    isValid?: boolean;
    decimals?: string;
    onChange: (value: string) => void;
}

const InputTextWithLabelTip = ({
    placeHolderLeft,
    placeHolderRight,
    label,
    tooltipText = '',
    value,
    type = 'text',
    sx = {},
    isValid = false,
    decimals,
    onChange
}: IProps) => {
    const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            let value = event.currentTarget.value;

            const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
            if (regex.test(value)) {
                onChange(value);
            }
        } else {
            onChange(event.currentTarget.value);
        }
    };

    return (
        <Stack sx={{ ...sx, width: '100%' }}>
            <FormControl variant="outlined" sx={{ gap: '8px' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <FormLabel>
                        <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</Stack>
                    </FormLabel>
                    {tooltipText !== '' ? (
                        <Tooltip
                            // arrow
                            title={tooltipText}
                            PopperProps={{
                                sx: {
                                    '& .MuiTooltip-tooltip': {
                                        width: 'calc(100% - 24px)',
                                        height: 'auto',
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        backgroundColor: '#383838',
                                        color: '#FFFFFF',
                                        padding: '12px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }
                                }
                            }}
                        >
                            <IconButton size="small" sx={{ color: '#DCDCDC' }}>
                                <Icons.info width={'12px'} height={'12px'} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <></>
                    )}
                </Stack>
                <TextField
                    id="custom-text-input-with-label"
                    hiddenLabel
                    autoComplete="off"
                    type={type}
                    value={value || ''}
                    variant="outlined"
                    error={isValid}
                    onChange={handleInputText}
                    placeholder={value ? '' : placeHolderLeft}
                    InputProps={{
                        endAdornment: placeHolderRight ? (
                            <InputAdornment position="end">
                                <span style={{ color: '#707070', fontWeight: 600 }}>{placeHolderRight}</span>
                            </InputAdornment>
                        ) : null,
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
                            },
                            '& input[type=number]': {
                                '-moz-appearance': 'textfield',
                                '&::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '&::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }
                            }
                        }
                    }}
                />
            </FormControl>
        </Stack>
    );
};

export default InputTextWithLabelTip;
