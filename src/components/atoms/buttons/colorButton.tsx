import { CSSProperties } from 'react';
import styled from 'styled-components';
import IconButton from './iconButton';

interface IProps {
    width: string;
    height: string;
    color: string;
    text: string;
    border?: string;
    sx?: CSSProperties;
    onClick: () => void;
    disabled?: boolean;
}

const StyledButton = styled(IconButton)<{
    $buttonColor: string;
    $buttonWidth: string;
    $buttonHeight: string;
    $buttonBorder?: string;
    $disabled: boolean;
}>(({ $buttonColor, $buttonWidth, $buttonHeight, $buttonBorder = 'none', $disabled }) => ({
    backgroundColor: `${$buttonColor} !important`,
    width: `${$buttonWidth} !important`,
    height: `${$buttonHeight} !important`,
    color: '#fff',
    border: `${$buttonBorder} !important`,
    borderRadius: '8px',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    pointerEvents: $disabled ? 'none' : 'auto',
    '&:hover': {
        backgroundColor: `${$buttonColor} !important`
    },
    textAlign: 'center'
}));

const ColorButton = ({ width, height, color, text, border, sx = {}, onClick, disabled = false, ...props }: IProps) => {
    return (
        <StyledButton
            $buttonColor={color}
            $buttonWidth={width}
            $buttonHeight={height}
            $buttonBorder={border}
            $disabled={disabled}
            onClick={onClick}
            style={sx}
            {...props}
        >
            {text}
        </StyledButton>
    );
};

export default ColorButton;
