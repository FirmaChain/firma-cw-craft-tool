import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import { SnackbarContentProps, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import styled from 'styled-components';

const Base = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: var(--Gray-500, #383838);
    height: 48px;
    gap: 24px;

    padding: 0 16px;
    border-radius: 8px;
    min-width: unset;
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const MessageTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

interface _SnackbarContentProps extends SnackbarContentProps {
    message: string;
}

export const SuccessSnackBar = forwardRef<HTMLDivElement, _SnackbarContentProps>((props, ref) => {
    const id = props.id;

    const { closeSnackbar } = useSnackbar();

    return (
        <Base ref={ref}>
            <TitleBox>
                <Icons.SnackbarSuccess />
                <MessageTypo>{props.message}</MessageTypo>
            </TitleBox>
            <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => closeSnackbar(id)}>
                <Icons.CloseIcon />
            </IconButton>
        </Base>
    );
});

export const WarningSnackBar = forwardRef<HTMLDivElement, _SnackbarContentProps>((props, ref) => {
    const id = props.id;

    const { closeSnackbar } = useSnackbar();

    return (
        <Base ref={ref}>
            <TitleBox>
                <Icons.SnackbarWarn />
                <MessageTypo>{props.message}</MessageTypo>
            </TitleBox>
            <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => closeSnackbar(id)}>
                <Icons.CloseIcon />
            </IconButton>
        </Base>
    );
});

export const ErrorSnackBar = forwardRef<HTMLDivElement, _SnackbarContentProps>((props, ref) => {
    const id = props.id;

    const { closeSnackbar } = useSnackbar();

    return (
        <Base ref={ref}>
            <TitleBox>
                <Icons.SnackbarError />
                <MessageTypo>{props.message}</MessageTypo>
            </TitleBox>
            <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => closeSnackbar(id)}>
                <Icons.CloseIcon />
            </IconButton>
        </Base>
    );
});
