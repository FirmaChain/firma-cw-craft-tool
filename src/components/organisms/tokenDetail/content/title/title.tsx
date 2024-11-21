import { useEffect, useState } from 'react';

import {
    GoToButtonTypo,
    GoToExecuteButton,
    LabelAdvancedTypo,
    LabelBasicTypo,
    LabelWrap,
    TitleContainer,
    TitleWrapper,
    TokenInfo,
    TokenInfoWrapper,
    TokenNameTypo,
    TokenSymbolTypo,
    TotalSupplySymbolTypo,
    TotalSupplyTypo,
    TotalSupplyWrapper
} from './style';
import { useNavigate } from 'react-router-dom';
import commaNumber from 'comma-number';
// import useTokenDetailStore from '@/store/useTokenDetailStore';
import Divider from '@/components/atoms/divider';
import Skeleton from '@/components/atoms/skeleton';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { getTokenAmountFromUToken } from '@/utils/balance';
// import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import { CRAFT_CONFIGS } from '@/config';
import { useCW20Detail } from '@/context/cw20DetailStore';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useContractAddressStore from '@/store/contractAddressStore';

const Title = () => {
    // const { setContractAddress } = useCW20Execute();
    const { tokenDetail } = useCW20Detail();

    const tokenUrl = tokenDetail?.marketingLogoUrl;
    const tokenSymbol = tokenDetail?.tokenSymbol;
    const tokenName = tokenDetail?.tokenName;
    const totalSupply = tokenDetail?.totalSupply;
    const codeId = tokenDetail?.codeId;
    const tokenDecimal = tokenDetail?.decimals || '';
    const contractAddress = tokenDetail?.contractAddress;

    const navigatge = useNavigate();
    const [imgLoading, setImgLoading] = useState(true);
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    const { setCW20 } = useContractAddressStore();

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
        // setContractAddress(contractAddress);
        setCW20(contractAddress);
        navigatge(`/execute`, { replace: true });
    };

    return (
        <TitleContainer>
            <TitleWrapper>
                <TokenLogo src={validTokenLogoUrl} size="72px" />

                <TokenInfoWrapper>
                    <TokenInfo style={{ height: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                            {tokenSymbol ? <TokenSymbolTypo>{tokenSymbol}</TokenSymbolTypo> : <Skeleton />}

                            {/* <img src={IC_APPROVED} alt="approved" style={{ width: '24px' }} /> */}
                        </div>

                        <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                        {tokenName ? <TokenNameTypo>{tokenName}</TokenNameTypo> : <Skeleton width="50px" />}

                        {codeId ? (
                            <LabelWrap>
                                {codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID ? (
                                    <LabelBasicTypo>{'BASIC'}</LabelBasicTypo>
                                ) : (
                                    //? Replace LabelAdvancedTypo with LabelBasicTypo by request (same text color)
                                    <LabelBasicTypo>{'ADVANCED'}</LabelBasicTypo>
                                )}
                            </LabelWrap>
                        ) : (
                            <Skeleton width="50px" />
                        )}
                    </TokenInfo>

                    <div style={{ padding: '12px 0 8px' }}>
                        <Divider $direction="horizontal" $color="#2c2c2c" />
                    </div>

                    <TotalSupplyWrapper style={{ height: '22px' }}>
                        <TotalSupplyTypo style={{ whiteSpace: 'pre' }}>Total Supply : </TotalSupplyTypo>

                        {tokenSymbol ? (
                            <TotalSupplySymbolTypo>
                                <span className="bold clamp-single-line">
                                    {commaNumber(getTokenAmountFromUToken(totalSupply, tokenDecimal))}
                                </span>

                                {tokenSymbol}
                            </TotalSupplySymbolTypo>
                        ) : (
                            <Skeleton width="120px" height="22px" />
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
