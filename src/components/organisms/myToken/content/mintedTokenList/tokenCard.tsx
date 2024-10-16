import { useCallback, useEffect, useState } from 'react';

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
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import Skeleton from '@/components/atoms/skeleton';

interface IProps {
    tokenLogoUrl?: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply?: string;
    decimals?: number;
    contractAddress: string;
    isVerify?: boolean;
    onClickItem: (contractAddress: string) => void;
}

const MintedTokenCard = ({
    tokenLogoUrl,
    tokenSymbol,
    tokenName,
    // totalSupply,
    // decimals,
    contractAddress,
    isVerify = false,
    onClickItem
}: IProps) => {
    const { firmaSDK } = useFirmaSDKContext();

    const { updateTokenAdditionalInfo } = useCW20MyTokenContext();
    const additionalInfo = useCW20MyTokenContext().tokenAdditionalInfo[contractAddress?.toLowerCase()] || {};

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    const handleTokenAdditionalInfo = useCallback(async () => {
        try {
            const contractInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
            // const { logo } = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());

            updateTokenAdditionalInfo(contractAddress, {
                imageUrl: tokenLogoUrl || '',
                totalSupply: contractInfo.total_supply,
                decimals: contractInfo.decimals
            });
        } catch (error) {
            console.log(error);
        }
    }, [contractAddress]);

    useEffect(() => {
        if (additionalInfo?.imageUrl) {
            const img = new Image();
            img.src = additionalInfo.imageUrl;
            img.onload = () => {
                setValidTokenLogoUrl(additionalInfo.imageUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [additionalInfo?.imageUrl]);

    useEffect(() => {
        handleTokenAdditionalInfo();
    }, [contractAddress]);

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
                    {typeof additionalInfo?.totalSupply === 'string' && typeof additionalInfo?.decimals === 'number' ? (
                        <>
                            <TotalSupplyTypo>
                                {commaNumber(getTokenAmountFromUToken(additionalInfo.totalSupply, String(additionalInfo.decimals)))}
                            </TotalSupplyTypo>
                            <SupplySymbolTypo>{tokenSymbol}</SupplySymbolTypo>
                        </>
                    ) : (
                        <Skeleton width="60px" height="22px" />
                    )}
                </SupplyWrapper>
                <Icons.RightArrow width={'20px'} height={'20px'} stroke={'#FFFFFF'} />
            </ItemRight>
        </ItemWrapper>
    );
};

export default React.memo(MintedTokenCard);
