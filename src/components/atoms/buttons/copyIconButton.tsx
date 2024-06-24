import { Button } from "@mui/material";
import { styled } from '@mui/system';
import { useSnackbar } from "notistack";

import Icons from "../icons";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'buttonWidth' && prop !== 'buttonHeight' && prop !== 'buttonBorder',
})<{
  buttonWidth: string;
  buttonHeight: string;
  buttonBorder?: string;
}>(({ buttonWidth, buttonHeight, buttonBorder }) => ({
  width: buttonWidth,
  height: buttonHeight,
  minWidth: 0,
  color: '#fff',
  border: buttonBorder,
  padding: 0,
  '&:hover': {
    opacity: 0.8,
  },
  textAlign: 'center',
}));

interface IProps {
  text: string;
  width: string;
  height: string;
}

const CopyIconButton = ({ text, width, height }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(text)
    .then(() => {
      enqueueSnackbar(`Copy to clipboard: ${text}`, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    })
    .catch((error) => {
      enqueueSnackbar(`Failed copy text: ${text}`, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    });
  };

  return (
    <StyledButton
      buttonWidth={width}
      buttonHeight={height}
      onClick={onCopyToClipboard}
    >
      <Icons.Copy width={width} height={width} />
    </StyledButton>
  )
}

export default CopyIconButton;