import React, { CSSProperties, useState } from 'react';
import { TextField, InputAdornment, Stack, IconButton } from '@mui/material';
import Icons from '../icons';

interface IProps {
    placeholder: string;
    value: string;
    sx?: CSSProperties;
    icon?: React.ReactNode;
    alwaysShowButton?: boolean;
    onChange: (value: string) => void;
    onClickRemove: () => void;
    onClickSearch: () => void;
}

const SearchInputWithButton = ({
    placeholder,
    value,
    sx,
    icon = <></>,
    alwaysShowButton = true,
    onChange,
    onClickRemove,
    onClickSearch
}: IProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
    };

    return (
        <Stack sx={{ ...sx }}>
            <TextField
                variant="outlined"
                value={value}
                onChange={handleSearchValue}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                    endAdornment: (
                        <InputAdornment sx={{ height: '100%' }} position="end">
                            {value && (
                                <IconButton onClick={onClickRemove} edge="end">
                                    <Icons.XCircle width={'32px'} height={'32px'} />
                                </IconButton>
                            )}
                            <IconButton
                                sx={{
                                    display: alwaysShowButton ? 'block' : isFocused || value !== '' ? 'block' : 'none',
                                    marginLeft: '16px',
                                    marginRight: '5px',
                                    width: '168px',
                                    borderRadius: '8px',
                                    background: value === '' ? '#707070' : '#02E191',
                                    cursor: value === '' ? 'cursor' : 'pointer',
                                    '&:hover': {
                                        background: value === '' ? '#707070' : '#02E191'
                                    }
                                }}
                                onClick={onClickSearch}
                                edge="end"
                            >
                                Search
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {
                        backgroundColor: '#1A1A1A',
                        color: '#DCDCDC',
                        textAlign: 'center',
                        border: '1px solid var(--Gray-550, #444)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        },
                        '& .MuiOutlinedInput-input::placeholder': {
                            color: '#707070',
                            fontSize: '14px',
                            fontWeight: '500',
                            fontStyle: 'normal',
                            lineHeight: '20px'
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#FFF',
                            fontFamily: 'General Sans Variable',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '22px'
                        }
                    }
                }}
                fullWidth
            />
        </Stack>
    );
};

export default SearchInputWithButton;
