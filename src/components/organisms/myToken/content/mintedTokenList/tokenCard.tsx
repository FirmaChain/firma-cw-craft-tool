import { useEffect, useState } from 'react';

import {
    IconBackground,
    ItemLeft,
    ItemRight,
    ItemWrapper,
    SupplySymbolTypo,
    TotalSupplyTypo,
    SupplyWrapper,
    TokenInfoNameTypo,
    TokenInfoSymbolTypo,
    TokenInfoWrapper,
    TokenLogoImage,
    TokenSymbolWrapper,
    Divider
} from './style';
import Icons from '@/components/atoms/icons';
import { getUTokenStrFromTokenStr } from '@/utils/common';
import React from 'react';
import { IC_VALID_SHIELD } from '@/components/atoms/icons/pngIcons';
import commaNumber from 'comma-number';

interface IProps {
    tokenLogoUrl: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply: string;
    decimals: number;
    contractAddress: string;
    isVerify?: boolean;
    onClickItem: (contractAddress: string) => void;
}

const MintedTokenCard = ({
    tokenLogoUrl,
    tokenSymbol,
    tokenName,
    totalSupply,
    decimals,
    contractAddress,
    isVerify = false,
    onClickItem
}: IProps) => {
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

    const totalSupplyTypo = commaNumber(getUTokenStrFromTokenStr(totalSupply, decimals.toString()));

    return (
        <ItemWrapper
            onClick={() => {
                onClickItem(contractAddress);
            }}
        >
            <ItemLeft>
                <TokenLogoImage>
                    {validTokenLogoUrl === '' ? (
                        <IconBackground>
                            <Icons.Picture width={'22px'} height={'22px'} />
                        </IconBackground>
                    ) : (
                        <img src={validTokenLogoUrl} alt="token-img" style={{ width: '48px', height: '48px' }} />
                    )}
                </TokenLogoImage>
                <TokenInfoWrapper>
                    <TokenSymbolWrapper>
                        <TokenInfoSymbolTypo>{tokenSymbol}</TokenInfoSymbolTypo>
                        {/* VERIFY CHECK */}
                        {isVerify && <img src={IC_VALID_SHIELD} alt="verified" style={{ width: '24px' }} />}
                    </TokenSymbolWrapper>
                    <Divider />
                    <TokenInfoNameTypo>{tokenName}</TokenInfoNameTypo>
                </TokenInfoWrapper>
            </ItemLeft>
            <ItemRight>
                <SupplyWrapper>
                    <TotalSupplyTypo>{totalSupplyTypo}</TotalSupplyTypo>
                    <SupplySymbolTypo>{tokenSymbol}</SupplySymbolTypo>
                </SupplyWrapper>
                <Icons.RightArrow width={'20px'} height={'20px'} $isCheck />
            </ItemRight>
        </ItemWrapper>
    );
};

export default React.memo(MintedTokenCard);
