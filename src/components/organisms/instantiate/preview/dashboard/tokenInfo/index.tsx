import React, { useEffect, useState } from 'react';
import {
    DetailTitle,
    IconBackground,
    TokenDescriptionText,
    TokenInfoDetail,
    TokenInfoLogoImage,
    TokenInfoWrapper,
    TokenNameText,
    TokenSymbolText
} from './style';
import Icons from '../../../../../atoms/icons';

interface IProps {
    tokenLogoUrl: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
}

const TokenInfo = ({ tokenLogoUrl, tokenName, tokenSymbol, tokenDescription }: IProps) => {
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

    return (
        <TokenInfoWrapper>
            <TokenInfoLogoImage>
                {validTokenLogoUrl === '' ? (
                    <IconBackground>
                        <Icons.picture width={'34px'} height={'34px'} />
                    </IconBackground>
                ) : (
                    <img src={validTokenLogoUrl} style={{ width: '90px', height: '90px', maxHeight: '100%', maxWidth: '100%' }} />
                )}
            </TokenInfoLogoImage>
            <TokenInfoDetail>
                <DetailTitle>
                    <TokenNameText>{tokenName === '' ? 'Name' : tokenName}</TokenNameText>
                    <TokenSymbolText>{tokenSymbol === '' ? 'Symbol' : tokenSymbol}</TokenSymbolText>
                </DetailTitle>
                <TokenDescriptionText>{tokenDescription === '' ? 'Description' : tokenDescription}</TokenDescriptionText>
            </TokenInfoDetail>
        </TokenInfoWrapper>
    );
};

export default React.memo(TokenInfo);
