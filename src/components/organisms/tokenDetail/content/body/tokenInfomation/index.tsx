import { parseAmountWithDecimal2 } from '@/utils/common';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import commaNumber from 'comma-number';

import {
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueCover,
    SpecificValueSymbol,
    SpecificValueTypo,
    SpecificValueWrapper,
    TokenCard,
    TokenCardHeaderTypo,
    TokenCardSpecific
} from './style';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import { useMemo } from 'react';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import { getTokenAmountFromUToken } from '@/utils/balance';

const TokenInformation = () => {
    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const codeId = useTokenDetailStore((state) => state.tokenDetail?.codeId);

    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName) || '';
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol) || '';
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
    const label = useTokenDetailStore((state) => state.tokenDetail?.label);
    const addressBalance = useTokenDetailStore((state) => state.tokenDetail?.addressBalance) || '';
    const totalSupply = useTokenDetailStore((state) => state.tokenDetail?.totalSupply) || '';
    const minterAddress = useTokenDetailStore((state) => state.tokenDetail?.minterAddress) || '';
    const minterCap = useTokenDetailStore((state) => state.tokenDetail?.minterCap);

    const isBasic = useMemo(() => {
        return codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    }, [codeId]);

    return (
        <TokenCard>
            <TokenCardHeaderTypo>Token Information</TokenCardHeaderTypo>
            <TokenCardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Address</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {contractAddress ? (
                            <>
                                <SpecificValueTypo>{contractAddress}</SpecificValueTypo>
                                <CopyIconButton text={contractAddress} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Token Name</SpecificLabelTypo>
                    {tokenName ? <SpecificValueTypo>{tokenName}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Token Symbol</SpecificLabelTypo>
                    {tokenSymbol ? <SpecificValueTypo>{tokenSymbol}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Decimals</SpecificLabelTypo>
                    {decimals ? <SpecificValueTypo>{decimals}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>

                {!isBasic && (
                    <SpecificItem style={{ height: '28px' }}>
                        <SpecificLabelTypo>Label</SpecificLabelTypo>
                        {typeof label === 'string' ? (
                            <SpecificValueCover>{label}</SpecificValueCover>
                        ) : (
                            <Skeleton width="100px" height="22px" />
                        )}
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    {totalSupply ? (
                        <SpecificValueWrapper>
                            <SpecificValueTypo
                            // data-tooltip-content={
                            //     Number(decimals) > 2 ? commaNumber(parseAmountWithDecimal2(totalSupply, decimals)) : ''
                            // }
                            // data-tooltip-id={TOOLTIP_ID.COMMON}
                            // data-tooltip-wrapper="span"
                            // data-tooltip-place="bottom"
                            >
                                {totalSupply && commaNumber(getTokenAmountFromUToken(totalSupply, decimals))}
                            </SpecificValueTypo>
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>

                {!isBasic && minterAddress && (
                    <SpecificItem>
                        <SpecificLabelTypo>Minter Address</SpecificLabelTypo>
                        <SpecificValueWrapper>
                            <SpecificValueTypo>{minterAddress}</SpecificValueTypo>
                            {minterAddress && <CopyIconButton text={minterAddress} width={'22px'} height={'22px'} />}
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}
                {minterCap && (
                    <SpecificItem>
                        <SpecificLabelTypo>Minter Cap</SpecificLabelTypo>

                        <SpecificValueWrapper>
                            <SpecificValueTypo
                            // data-tooltip-content={Number(decimals) > 2 ? commaNumber(parseAmountWithDecimal2(minterCap, decimals)) : ''}
                            // data-tooltip-id={TOOLTIP_ID.COMMON}
                            // data-tooltip-wrapper="span"
                            // data-tooltip-place="bottom"
                            >
                                {minterCap === '' ? '0' : commaNumber(getTokenAmountFromUToken(minterCap, decimals))}
                            </SpecificValueTypo>
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>My Balance</SpecificLabelTypo>
                    {addressBalance ? (
                        <SpecificValueWrapper>
                            <SpecificValueTypo
                            // data-tooltip-content={
                            //     Number(decimals) > 2 ? commaNumber(parseAmountWithDecimal2(addressBalance, decimals)) : ''
                            // }
                            // data-tooltip-id={TOOLTIP_ID.COMMON}
                            // data-tooltip-wrapper="span"
                            // data-tooltip-place="bottom"
                            >
                                {addressBalance && commaNumber(getTokenAmountFromUToken(addressBalance, decimals))}
                            </SpecificValueTypo>
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default TokenInformation;
