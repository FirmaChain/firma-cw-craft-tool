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
// import useTokenDetailStore from '@/store/useTokenDetailStore';
import { useMemo } from 'react';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import { getTokenAmountFromUToken } from '@/utils/balance';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW20Detail } from '@/context/cw20DetailStore';

const TokenInformation = () => {
    const { tokenDetail } = useCW20Detail();

    const contractAddress = tokenDetail ? tokenDetail?.contractAddress : '';
    const codeId = tokenDetail ? tokenDetail?.codeId : '';

    const tokenName = tokenDetail ? tokenDetail?.tokenName : '';
    const tokenSymbol = tokenDetail ? tokenDetail?.tokenSymbol : '';
    const decimals = tokenDetail ? tokenDetail?.decimals : '';
    const label = tokenDetail ? tokenDetail?.label : '';
    const addressBalance = tokenDetail ? tokenDetail?.addressBalance : '';
    const totalSupply = tokenDetail ? tokenDetail?.totalSupply : '';
    const minterAddress = tokenDetail ? tokenDetail?.minterAddress : '';
    const minterCap = tokenDetail ? tokenDetail?.minterCap : '';

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
                                <TextEllipsis CustomDiv={SpecificValueTypo} text={contractAddress} breakMode={'letters'} />
                                {/* <SpecificValueTypo>{contractAddress}</SpecificValueTypo> */}
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

                <SpecificItem style={{ height: '28px' }}>
                    <SpecificLabelTypo>Label</SpecificLabelTypo>
                    {typeof label === 'string' ? (
                        <SpecificValueCover>{label}</SpecificValueCover>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>

                <SpecificItem>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    {totalSupply ? (
                        <SpecificValueWrapper>
                            <TextEllipsis
                                CustomDiv={SpecificValueTypo}
                                text={totalSupply && commaNumber(getTokenAmountFromUToken(totalSupply, decimals))}
                                breakMode={'letters'}
                            />
                            {/* <SpecificValueTypo>
                                {totalSupply && commaNumber(getTokenAmountFromUToken(totalSupply, decimals))}
                            </SpecificValueTypo> */}
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
                            <TextEllipsis CustomDiv={SpecificValueTypo} text={minterAddress} breakMode={'letters'} />
                            {/* <SpecificValueTypo>{minterAddress}</SpecificValueTypo> */}
                            {minterAddress && <CopyIconButton text={minterAddress} width={'22px'} height={'22px'} />}
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}
                {minterCap && (
                    <SpecificItem>
                        <SpecificLabelTypo>Minter Cap</SpecificLabelTypo>

                        <SpecificValueWrapper>
                            <TextEllipsis
                                CustomDiv={SpecificValueTypo}
                                text={minterCap === '' ? '0' : commaNumber(getTokenAmountFromUToken(minterCap, decimals))}
                                breakMode={'letters'}
                            />
                            {/* <SpecificValueTypo>
                                {minterCap === '' ? '0' : commaNumber(getTokenAmountFromUToken(minterCap, decimals))}
                            </SpecificValueTypo> */}
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>My Balance</SpecificLabelTypo>
                    {addressBalance ? (
                        <SpecificValueWrapper>
                            <TextEllipsis
                                CustomDiv={SpecificValueTypo}
                                text={addressBalance && commaNumber(getTokenAmountFromUToken(addressBalance, decimals))}
                                breakMode={'letters'}
                            />
                            {/* <SpecificValueTypo>
                                {addressBalance && commaNumber(getTokenAmountFromUToken(addressBalance, decimals))}
                            </SpecificValueTypo> */}
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
