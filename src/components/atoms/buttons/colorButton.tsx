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
}

const StyledButton = styled(IconButton)<{
    $buttonColor: string;
    $buttonWidth: string;
    $buttonHeight: string;
    $buttonBorder?: string;
}>(({ $buttonColor, $buttonWidth, $buttonHeight, $buttonBorder = 'none' }) => ({
    backgroundColor: `${$buttonColor} !important`,
    width: `${$buttonWidth} !important`,
    height: `${$buttonHeight} !important`,
    color: '#fff',
    border: `${$buttonBorder} !important`,
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: `${$buttonColor} !important`,
        opacity: 0.8
    },
    textAlign: 'center'
}));

const ColorButton = ({ width, height, color, text, border, sx = {}, onClick, ...props }: IProps) => {
    return (
        <StyledButton
            $buttonColor={color}
            $buttonWidth={width}
            $buttonHeight={height}
            $buttonBorder={border}
            onClick={onClick}
            style={sx}
            {...props}
        >
            {text}
        </StyledButton>
    );
};

export default ColorButton;
