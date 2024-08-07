import { useEffect, useState } from 'react';

import {
    ItemLeft,
    ItemRight,
    ItemWrapper,
    SupplySymbolTypo,
    TotalSupplyTypo,
    SupplyWrapper,
    TokenInfoNameTypo,
    TokenInfoSymbolTypo,
    TokenInfoWrapper,
    TokenSymbolWrapper,
    Divider
} from './style';
import Icons from '@/components/atoms/icons';
import React from 'react';
import { IC_VALID_SHIELD } from '@/components/atoms/icons/pngIcons';
import commaNumber from 'comma-number';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { getTokenAmountFromUToken } from '@/utils/balance';

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

    return (
        <ItemWrapper
            onClick={() => {
                onClickItem(contractAddress);
            }}
        >
            <ItemLeft>
                <TokenLogo src={validTokenLogoUrl} size="48px" emptyPicSize="22px" />

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
                    <TotalSupplyTypo>{commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}</TotalSupplyTypo>
                    <SupplySymbolTypo>{tokenSymbol}</SupplySymbolTypo>
                </SupplyWrapper>
                <Icons.RightArrow width={'20px'} height={'20px'} stroke={'#FFFFFF'} />
            </ItemRight>
        </ItemWrapper>
    );
};

export default React.memo(MintedTokenCard);
