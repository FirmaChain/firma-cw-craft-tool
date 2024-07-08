import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

import Icons from "../icons";
import styled from "styled-components";

const StyledButton = styled(Button)<{
  $buttonWidth: string;
  $buttonHeight: string;
  $buttonBorder?: string;
}>(({ $buttonWidth, $buttonHeight, $buttonBorder = 'none' }) => ({
  width: `${$buttonWidth} !important`,
  height: `${$buttonHeight} !important`,
  minWidth: 0,
  color: '#fff',
  border: `${$buttonBorder} !important`,
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
      $buttonWidth={width}
      $buttonHeight={height}
      onClick={onCopyToClipboard}
    >
      <Icons.Copy width={width} height={width} />
    </StyledButton>
  )
}

export default CopyIconButton;