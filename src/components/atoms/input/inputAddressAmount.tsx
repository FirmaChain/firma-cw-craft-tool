import React, { CSSProperties } from 'react';
import { FormControl, IconButton, Stack, TextField } from '@mui/material';

import Icons from '../icons';

interface IProps {
    index: number;
    address: string;
    amount: string;
    sx?: CSSProperties;
    onChangeAddress: (value: string) => void;
    onChangeAmount: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    decimals: string;
}

const InputAddressAmount = ({
    index,
    address,
    amount,
    sx = {},
    onChangeAddress,
    onChangeAmount,
    onRemoveClick,
    isValid,
    decimals
}: IProps) => {
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeAddress(event.currentTarget.value);
    };

    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;

        const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
        if (regex.test(value)) {
            onChangeAmount(value);
        }
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    return (
        <Stack sx={{ ...sx, width: '100%' }}>
            <FormControl variant="outlined">
                <Stack height={'76px'} gap={'12px'} display={'flex'} flexDirection={'row'}>
                    {/* Wallet Address */}
                    <Stack width={'420px'} height={'76px'} gap={'8px'}>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    background: '#313131',
                                    fontSize: '12px',
                                    color: '#999',
                                    textAlign: 'center'
                                }}
                            >
                                {index}
                            </Stack>
                            <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>
                                Recipient Address
                            </Stack>
                        </Stack>
                        <TextField
                            id="custom-text-input-with-label"
                            hiddenLabel
                            autoComplete="off"
                            type={'text'}
                            value={address || ''}
                            variant="outlined"
                            onChange={handleAddress}
                            placeholder={address ? '' : 'Input wallet Address'}
                            error={isValid === undefined ? false : !isValid}
                            InputProps={{
                                sx: {
                                    height: '48px',
                                    padding: '14px',
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
                                    '& fieldset': {
                                        borderColor: isValid === undefined ? 'inherit' : isValid ? 'inherit' : '#E55250'
                                    }
                                }
                            }}
                        />
                    </Stack>
                    {/* Wallet Amount */}
                    <Stack width={'164px'} height={'76px'} gap={'8px'}>
                        <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>Amount</Stack>
                        <TextField
                            id="custom-text-input-with-label"
                            hiddenLabel
                            autoComplete="off"
                            type={'number'}
                            value={amount || ''}
                            variant="outlined"
                            onChange={handleAmount}
                            placeholder={amount ? '' : '0'}
                            InputProps={{
                                sx: {
                                    height: '48px',
                                    padding: '14px',
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
                                        color: '#FFF',
                                        textAlign: 'right'
                                    },
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield',
                                        '&::-webkit-outer-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0
                                        },
                                        '&::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0
                                        }
                                    }
                                }
                            }}
                        />
                    </Stack>
                    {/* Button */}
                    <Stack width={'32px'} height={'70px'} paddingBottom={'6px'} display={'flex'} justifyContent={'flex-end'}>
                        <IconButton sx={{ width: '32px', height: '32px', padding: '0' }} onClick={handleRemoveWallet}>
                            <Icons.minusCircle />
                        </IconButton>
                    </Stack>
                </Stack>
            </FormControl>
        </Stack>
    );
};

export default React.memo(InputAddressAmount);
