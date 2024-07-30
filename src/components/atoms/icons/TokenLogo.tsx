import { checkImageUrl } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icons from '.';
import { TOOLTIP_ID } from '@/constants/tooltip';

interface ITokenLogo {
    src: string; //? Img logo url
    size?: number | string; //? img size, @default 72px, pretend img is square
    tooltip?: string; //? Hover tooltip, only show up when img is valid. @default "src" value
    emptyPicSize?: string;
}

const Container = styled.div<{ $size: string | number }>`
    display: flex;

    min-width: ${({ $size }) => $size};
    max-width: ${({ $size }) => $size};

    min-height: ${({ $size }) => $size};
    max-height: ${({ $size }) => $size};

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
`;

const TokenLogo = ({ src, size = '72px', emptyPicSize = '34px', tooltip }: ITokenLogo) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (Boolean(src)) {
            checkImageUrl(
                src,
                () => setIsValid(true),
                () => setIsValid(false)
            );
        }
    }, [src]);

    return (
        <Container $size={size}>
            {isValid ? (
                <img
                    src={src}
                    alt="token-logo"
                    data-tooltip-content={tooltip || src}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                    style={{ width: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    onError={() => setIsValid(false)}
                />
            ) : (
                <div className="img-placeholder">
                    <Icons.Picture width={emptyPicSize} height={emptyPicSize} />
                </div>
            )}
        </Container>
    );
};

export default TokenLogo;
