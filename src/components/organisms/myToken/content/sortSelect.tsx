import React, { useState } from 'react';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IProps {
    onChange: (value: number) => void;
}

interface IMenuItem {
    type: number;
    value: string;
}

const menuItems: IMenuItem[] = [
    { type: 0, value: 'Newest' },
    { type: 1, value: 'Oldest' },
    { type: 2, value: 'Most Popular' },
    { type: 4, value: 'Alphabetical' }
];

const SortSelect = ({ onChange }: IProps) => {
    const [menuType, setMenuType] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setMenuType(Number(event.target.value));
        onChange(Number(event.target.value));
    };

    return (
        <FormControl sx={{ width: '182px', height: '36px', backgroundColor: '#1E1E1E' }}>
            <Select
                value={menuType.toString()}
                onChange={handleChange}
                IconComponent={ArrowDropDownIcon}
                MenuProps={{
                    disableScrollLock: true
                }}
                sx={{
                    height: '36px',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '20px',
                    color: '#FFFFFF',
                    background: '#1E1E1E',
                    borderRadius: '6px',
                    border: '1px solid var(--Gray-500, #383838)',
                    // padding: '8px 16px',
                    '& .MuiSelect-icon': {
                        color: '#FFFFFF'
                    }
                }}
            >
                {menuItems.map((elem, index) => (
                    <MenuItem key={index} value={elem.type}>
                        {elem.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortSelect;
