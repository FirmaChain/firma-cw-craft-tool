import { useSnackbar } from 'notistack';

import Icons from '../icons';
import styled from 'styled-components';
import IconButton from './iconButton';
import { copyToClipboard } from '@/utils/common';

const StyledButton = styled(IconButton)<{
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
    textAlign: 'center'
}));

interface IProps {
    text: string;
    width: string;
    height: string;
}

const CopyIconButton = ({ text, width, height }: IProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const onCopyToClipboard = async () => {
        const errorMessage = await copyToClipboard(text);

        if (errorMessage) enqueueSnackbar({ variant: 'error', message: errorMessage });
        else enqueueSnackbar({ variant: 'success', message: 'Copied!', key: 'COPIED' });
    };

    return (
        <StyledButton $buttonWidth={width} $buttonHeight={height} onClick={onCopyToClipboard}>
            <Icons.Copy width={width} height={width} />
        </StyledButton>
    );
};

export default CopyIconButton;
