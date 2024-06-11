import React, { CSSProperties, useEffect, useState } from "react";
import { FormControl, FormLabel, Stack, TextField, InputAdornment } from "@mui/material";

import { InputType } from "../../../interfaces/input";

interface IProps {
  placeHolderLeft: string;
  enableLength?: boolean;
  label: string;
  value: string | number | null;
  type?: InputType;
  maxLength?: number;
  sx?: CSSProperties;
  onChange: (value: string) => void;
}

const InputTextWithLabel = ({
  placeHolderLeft,
  enableLength = false,
  label,
  value,
  type = 'text',
  maxLength = 16,
  sx = {},
  onChange,
}: IProps) => {
  const [inputLength, setInputLength] = useState<number>(0);
  const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value;

    if (type === "number") {
      const numericValue = parseFloat(inputValue);
      if (numericValue > maxLength) {
        inputValue = maxLength.toString();
      }
    }

    onChange(inputValue);
  };

  useEffect(() => {
    setInputLength(value?.toString().length || 0);
  }, [value]);

  return (
    <Stack sx={{ ...sx, width: '100%' }}>
      <FormControl variant='outlined' sx={{ gap: '8px' }}>
        <FormLabel>
          <Stack sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</Stack>
        </FormLabel>
        <TextField
          id='custom-text-input-with-label'
          hiddenLabel
          autoComplete='off'
          type={type}
          value={value || ''}
          variant='outlined'
          onChange={handleInputText}
          placeholder={value ? '' : placeHolderLeft}
          inputProps={type === "number" ? { maxLength } : {}}
          InputProps={{
            endAdornment: enableLength ? (
              <InputAdornment position='end'>
                <span style={{ color: '#707070', fontWeight: 600 }}>{inputLength}/{maxLength}</span>
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
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '&::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            },
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default InputTextWithLabel;
