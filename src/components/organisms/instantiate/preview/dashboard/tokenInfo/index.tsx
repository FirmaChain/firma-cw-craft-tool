import React, { useEffect, useRef, useState } from 'react';
import {
    DetailTitle,
    IconBackground,
    TokenDescriptionClampTypo,
    TokenDescriptionText,
    TokenInfoDetail,
    TokenInfoLogoImage,
    TokenInfoWrapper,
    TokenNameText,
    TokenSymbolText
} from './style';
import Icons from '@/components/atoms/icons';
import { IC_ROUND_ARROW_UP } from '@/components/atoms/icons/pngIcons';
import TokenLogo from '@/components/atoms/icons/TokenLogo';

interface IProps {
    tokenLogoUrl: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
}

const TokenInfo = ({ tokenLogoUrl, tokenName, tokenSymbol, tokenDescription }: IProps) => {
    const descRef = useRef<HTMLDivElement>();
    const [needClamp, setNeedClamp] = useState(false);
    const [isClamped, setIsClamped] = useState(true);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        if (tokenLogoUrl) {
            const img = new Image();
            img.src = tokenLogoUrl;
            img.onload = () => {
                setValidTokenLogoUrl(tokenLogoUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [tokenLogoUrl]);

    const openClamp = () => setIsClamped(false);
    const closeClamp = () => setIsClamped(true);

    useEffect(() => {
        const height = descRef.current?.clientHeight;

        if (height > 60) {
            if (!needClamp) setNeedClamp(true);
        } else {
            //? height < 60px
            if (needClamp) setNeedClamp(false);
            setIsClamped(true);
        }
    }, [tokenDescription]);

    return (
        <TokenInfoWrapper>
            <TokenLogo src={validTokenLogoUrl} size="90px" />

            <TokenInfoDetail>
                <DetailTitle>
                    <TokenNameText $disabled={tokenName === ''}>{tokenName || 'Name'}</TokenNameText>
                    <TokenSymbolText $disabled={tokenSymbol === ''}>{tokenSymbol || 'Symbol'}</TokenSymbolText>
                </DetailTitle>
                <div style={{ width: '100%', textAlign: 'left', position: 'relative' }}>
                    {/* //? hidden description typo for more/less button */}
                    <TokenDescriptionText
                        ref={descRef}
                        style={{ zIndex: -1, position: 'absolute', opacity: 0, maxHeight: '70px', overflow: 'hidden' }}
                    >
                        {tokenDescription === '' ? 'Description' : tokenDescription}
                    </TokenDescriptionText>
                    <div
                        style={{
                            maxHeight: isClamped ? '60px' : 'unset',
                            overflow: isClamped ? 'hidden' : 'visible'
                        }}
                    >
                        <TokenDescriptionText $disabled={tokenDescription === ''}>
                            <span>{tokenDescription || 'Description'} </span>

                            {needClamp && !isClamped && (
                                <span
                                    style={{
                                        background: 'var(--200, #1e1e1e)',
                                        padding: 0,
                                        cursor: 'pointer',
                                        whiteSpace: 'pre',
                                        paddingLeft: '10px'
                                    }}
                                    onClick={closeClamp}
                                >
                                    <TokenDescriptionClampTypo>less</TokenDescriptionClampTypo>
                                    <img
                                        src={IC_ROUND_ARROW_UP}
                                        alt="arrow"
                                        style={{ width: '16px', height: '16px', transform: 'translateY(2px)' }}
                                    />
                                </span>
                            )}
                        </TokenDescriptionText>

                        {needClamp && isClamped && (
                            <span
                                style={{
                                    width: 'fit-content',
                                    height: '20px',
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    background: 'var(--200, #1e1e1e)',
                                    padding: 0,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={openClamp}
                            >
                                <TokenDescriptionClampTypo>
                                    <span style={{ color: 'var(--Gray-600, #707070)' }}>... </span>more
                                </TokenDescriptionClampTypo>
                                <img
                                    src={IC_ROUND_ARROW_UP}
                                    alt="arrow"
                                    style={{ width: '16px', height: '16px', transform: 'rotate(180deg)' }}
                                />
                            </span>
                        )}
                    </div>
                </div>
            </TokenInfoDetail>
        </TokenInfoWrapper>
    );
};

export default React.memo(TokenInfo);
