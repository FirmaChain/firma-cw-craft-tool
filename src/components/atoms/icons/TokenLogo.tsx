import { checkImageUrl, copyToClipboard } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icons from '.';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { IC_LINK_ROUND } from './pngIcons';
import IconButton from '../buttons/iconButton';
import { useSnackbar } from 'notistack';

interface ITokenLogo {
    src: string; //? Img logo url
    size?: number | string; //? img size, @default 72px, pretend img is square
    emptyPicSize?: string;
    showTooltip?: boolean; //? if true, show img src tooltip and link icon
}

const Container = styled.div<{ $size: string | number }>`
    display: flex;
    position: relative;

    min-width: ${({ $size }) => $size};
    max-width: ${({ $size }) => $size};

    min-height: ${({ $size }) => $size};
    max-height: ${({ $size }) => $size};

    .token-logo {
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .img-placeholder {
        min-width: ${({ $size }) => $size};
        min-height: ${({ $size }) => $size};
        border-radius: 50%;
        border: 1px solid var(--Gray-500, #383838);
        background: var(--Gray-350, #262626);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .url-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 0;
    }
`;

const TokenLogo = ({ src, size = '72px', emptyPicSize = '34px', showTooltip = false }: ITokenLogo) => {
    const { enqueueSnackbar } = useSnackbar();

    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (Boolean(src)) {
            checkImageUrl(
                src,
                () => setIsValid(true),
                () => setIsValid(false)
            );
        }
    }, [src]);

    const onClickCopy = async () => {
        const errorMsg = await copyToClipboard(src);

        if (errorMsg) {
            console.log(errorMsg);
            enqueueSnackbar({ variant: 'error', message: 'Failed to copy url.' });
        } else enqueueSnackbar({ variant: 'success', message: 'Copied!', key: 'COPIED' });
    };

    return (
        <Container $size={size}>
            {isValid ? (
                <>
                    <img
                        src={src}
                        className="token-logo"
                        alt="token-logo"
                        onError={() => setIsValid(false)}
                        data-tooltip-content={showTooltip ? src : ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                    />
                    {showTooltip && (
                        <IconButton onClick={onClickCopy} className="url-icon" style={{ display: 'flex', padding: 0 }}>
                            <img className="url-icon" src={IC_LINK_ROUND} alt="link" />
                        </IconButton>
                    )}
                </>
            ) : (
                <div className="img-placeholder">
                    <Icons.Picture width={emptyPicSize} height={emptyPicSize} />
                </div>
            )}
        </Container>
    );
};

export default TokenLogo;
