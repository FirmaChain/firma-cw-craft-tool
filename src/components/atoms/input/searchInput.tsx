import React, { CSSProperties } from 'react';
import { TextField, InputAdornment, Stack } from '@mui/material';

interface IProps {
    placeholder: string;
    value: string;
    sx?: CSSProperties;
    icon?: React.ReactNode;
    onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, sx, icon = <></>, onChange }: IProps) => {
    const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    return (
        <Stack sx={{ ...sx }}>
            <TextField
                variant="outlined"
                value={value}
                onChange={handleSearchValue}
                placeholder={placeholder}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
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
                            color: '#FFF'
                        }
                    }
                }}
                fullWidth
            />
        </Stack>
    );
};

export default SearchInput;
