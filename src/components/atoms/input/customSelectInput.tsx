import { FormControl, MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 300px;

    > div {
        width: 100% !important;
    }
`;

const CustomSelect = styled(Select)<SelectProps>(({ theme }) => ({
    "& .MuiSelect-select": {
        padding: "12px 12px 12px 16px",
        borderRadius: "6px",
        border: "1px solid var(--Gray-650, #807E7E)",
        background: "var(--Gray-400, #2C2C2C)",
        color: "var(--Gray-900, var(--Primary-Base-White, #FFF))",
        fontFamily: "General Sans Variable",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "22px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#b0b0b0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#909090",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#606060",
    },
}));

interface IMenuState {
    value: any;
    label: string;
}

interface IProps {
    maxWidth?: string;
    menus: IMenuState[];
    onChangeMenu: (value: string) => void;
}

const CustomSelectInput = ({ maxWidth = "300px", menus, onChangeMenu }: IProps) => {
    const [value, setValue] = useState("");

    const handleChange = (event: SelectChangeEvent<any>) => {
        setValue(event.target.value as string);
        onChangeMenu(event.target.value as string);
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <Container style={{ maxWidth }}>
                <CustomSelect value={value} onChange={handleChange}>
                    {menus.map((value, index) => {
                        return (
                            <MenuItem key={index} value={value.value}>
                                {value.label}
                            </MenuItem>
                        );
                    })}
                </CustomSelect>
            </Container>
        </FormControl>
    );
};

export default CustomSelectInput;
