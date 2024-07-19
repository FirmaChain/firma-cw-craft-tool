import { useEffect, useState } from 'react';

import {
    GoToButtonTypo,
    GoToExecuteButton,
    IconBackground,
    TitleContainer,
    TitleLogoImage,
    TitleWrapper,
    TokenInfo,
    TokenInfoWrapper,
    TokenNameTypo,
    TokenSymbolTypo,
    TotalSupplySymbolTypo,
    TotalSupplyTypo,
    TotalSupplyWrapper
} from './style';
import Icons from '@/components/atoms/icons';
import { useNavigate } from 'react-router-dom';
import { IC_APPROVED } from '@/components/atoms/icons/pngIcons';
import commaNumber from 'comma-number';
import { getTokenStrFromUTokenStr } from '@/utils/common';
import useTokenDetailStore from '@/store/useTokenDetailStore';

const Title = () => {
    const tokenUrl = useTokenDetailStore((state) => state.tokenDetail?.marketingLogoUrl);
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);
    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName);
    const totalSupply = useTokenDetailStore((state) => state.tokenDetail?.totalSupply);
    const tokenDecimal = useTokenDetailStore((state) => state.tokenDetail?.decimals);

    const navigatge = useNavigate();
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        if (tokenUrl) {
            const img = new Image();
            img.src = tokenUrl;
            img.onload = () => {
                setValidTokenLogoUrl(tokenUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [tokenUrl]);

    const onClickExecute = () => {
        navigatge('/execute');
    };

    return (
        <TitleContainer>
            <TitleWrapper>
                <TitleLogoImage>
                    {validTokenLogoUrl === '' ? (
                        <IconBackground>
                            <Icons.Picture width={'34px'} height={'34px'} />
                        </IconBackground>
                    ) : (
                        <img
                            src={validTokenLogoUrl}
                            alt="token-img"
                            style={{ minWidth: '72px', minHeight: '72px', maxHeight: '100%', maxWidth: '100%' }}
                        />
                    )}
                </TitleLogoImage>
                <TokenInfoWrapper>
                    <TokenInfo style={{ height: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                            <TokenSymbolTypo>{tokenSymbol}</TokenSymbolTypo>

                            <img src={IC_APPROVED} alt="approved" style={{ width: '24px' }} />
                        </div>

                        <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                        <TokenNameTypo>{tokenName}</TokenNameTypo>
                    </TokenInfo>

                    <div
                        style={{
                            width: '100%',
                            height: '1px',
                            background: 'var(--Gray-400, #2C2C2C)',
                            marginTop: '12px',
                            marginBottom: '8px'
                        }}
                    />

                    <TotalSupplyWrapper style={{ height: '22px' }}>
                        <TotalSupplyTypo>Total Supply : </TotalSupplyTypo>

                        {tokenSymbol && (
                            <TotalSupplySymbolTypo>
                                <span className="bold">{commaNumber(getTokenStrFromUTokenStr(totalSupply, tokenDecimal))}</span>

                                {tokenSymbol}
                            </TotalSupplySymbolTypo>
                        )}
                    </TotalSupplyWrapper>
                </TokenInfoWrapper>
            </TitleWrapper>
            <GoToExecuteButton onClick={onClickExecute}>
                <GoToButtonTypo>Go to excute</GoToButtonTypo>
                <GoToButtonTypo>→</GoToButtonTypo>
            </GoToExecuteButton>
        </TitleContainer>
    );
};

export default Title;
