import { useEffect, useState } from 'react';

import {
    IconBackground,
    ItemLeft,
    ItemRight,
    ItemWrapper,
    SupplySymbolTyop,
    TotalSupplyTypo,
    SupplyWrapper,
    TokenInfoNameTypo,
    TokenInfoSymbolTypo,
    TokenInfoWrapper,
    TokenLogoImage,
    TokenSymbolWrapper,
    EmptyVerify
} from './style';
import Icons from '../../../../atoms/icons';
import { getUTokenStrFromTokenStr } from '../../../../../utils/common';
import React from 'react';

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

const PaginatedItem = ({
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
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                        <img src={validTokenLogoUrl} style={{ width: '48px', height: '48px', maxHeight: '100%', maxWidth: '100%' }} />
                    )}
                </TokenLogoImage>
                <TokenInfoWrapper>
                    <TokenSymbolWrapper>
                        <TokenInfoSymbolTypo>{tokenSymbol}</TokenInfoSymbolTypo>
                        {/* VERIFY CHECK */}
                        {isVerify ? <EmptyVerify /> : <EmptyVerify />}
                    </TokenSymbolWrapper>
                    <TokenInfoNameTypo>{tokenName}</TokenInfoNameTypo>
                </TokenInfoWrapper>
            </ItemLeft>
            <ItemRight>
                <SupplyWrapper>
                    <TotalSupplyTypo>{getUTokenStrFromTokenStr(totalSupply, decimals.toString())}</TotalSupplyTypo>
                    <SupplySymbolTyop>{tokenSymbol}</SupplySymbolTyop>
                </SupplyWrapper>
                <Icons.RightArrow width={'20px'} height={'20px'} />
            </ItemRight>
        </ItemWrapper>
    );
};

export default React.memo(PaginatedItem);
