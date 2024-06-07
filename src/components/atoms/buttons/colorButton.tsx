import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { CSSProperties } from 'react';

interface IProps {
  width: string;
  height: string;
  color: string;
  text: string;
  border?: string;
  sx?: CSSProperties;
  onClick: () => void;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'buttonColor' && prop !== 'buttonWidth' && prop !== 'buttonHeight' && prop !== 'buttonBorder',
})<{
  buttonColor: string;
  buttonWidth: string;
  buttonHeight: string;
  buttonBorder?: string;
}>(({ buttonColor, buttonWidth, buttonHeight, buttonBorder }) => ({
  backgroundColor: buttonColor,
  width: buttonWidth,
  height: buttonHeight,
  color: '#fff',
  border: buttonBorder,
  '&:hover': {
    backgroundColor: buttonColor,
    opacity: 0.8,
  },
  textAlign: 'center',
}));

const ColorButton = ({ width, height, color, text, border, sx = {}, onClick }: IProps) => {
  return (
    <StyledButton
      buttonColor={color}
      buttonWidth={width}
      buttonHeight={height}
      buttonBorder={border}
      onClick={onClick}
      sx={sx}
    >
      {text}
    </StyledButton>
  );
};

export default ColorButton;