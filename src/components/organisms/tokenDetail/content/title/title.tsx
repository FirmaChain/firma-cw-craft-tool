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
// import { IC_APPROVED } from '@/components/atoms/icons/pngIcons';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal2 } from '@/utils/common';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Divider from '@/components/atoms/divider';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Skeleton from '@/components/atoms/skeleton';

const Title = () => {
    const tokenUrl = useTokenDetailStore((state) => state.tokenDetail?.marketingLogoUrl);
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);
    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName);
    const totalSupply = useTokenDetailStore((state) => state.tokenDetail?.totalSupply);
    const tokenDecimal = useTokenDetailStore((state) => state.tokenDetail?.decimals);
    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress);

    const navigatge = useNavigate();
    const [imgLoading, setImgLoading] = useState(true);
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        setImgLoading(true);

        if (tokenUrl) {
            const img = new Image();
            img.src = tokenUrl;
            img.onload = () => {
                setValidTokenLogoUrl(tokenUrl);
                setImgLoading(false);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
                setImgLoading(false);
            };
        } else {
            setValidTokenLogoUrl('');
            setImgLoading(false);
        }
    }, [tokenUrl]);

    const onClickExecute = () => {
        navigatge('/execute');
    };

    return (
        <TitleContainer>
            <TitleWrapper>
                <TitleLogoImage>
                    {imgLoading ? (
                        <Skeleton width="72px" height="72px" borderRadius="50%" />
                    ) : validTokenLogoUrl === '' ? (
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
                            {tokenSymbol ? <TokenSymbolTypo>{tokenSymbol}</TokenSymbolTypo> : <Skeleton />}

                            {/* <img src={IC_APPROVED} alt="approved" style={{ width: '24px' }} /> */}
                        </div>

                        <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                        {tokenName ? <TokenNameTypo>{tokenName}</TokenNameTypo> : <Skeleton width="50px" />}
                    </TokenInfo>

                    <div style={{ padding: '12px 0 8px' }}>
                        <Divider $direction="horizontal" $color="#2c2c2c" />
                    </div>

                    <TotalSupplyWrapper style={{ height: '22px' }}>
                        <TotalSupplyTypo>Total Supply : </TotalSupplyTypo>

                        {tokenSymbol ? (
                            <TotalSupplySymbolTypo
                                data-tooltip-content={commaNumber(parseAmountWithDecimal2(totalSupply, tokenDecimal))}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                <span className="bold">{commaNumber(parseAmountWithDecimal2(totalSupply, tokenDecimal, true))}</span>

                                {tokenSymbol}
                            </TotalSupplySymbolTypo>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </TotalSupplyWrapper>
                </TokenInfoWrapper>
            </TitleWrapper>
            <GoToExecuteButton disabled={!contractAddress} onClick={onClickExecute}>
                <GoToButtonTypo>Go to execute</GoToButtonTypo>
                <GoToButtonTypo>→</GoToButtonTypo>
            </GoToExecuteButton>
        </TitleContainer>
    );
};

export default Title;
