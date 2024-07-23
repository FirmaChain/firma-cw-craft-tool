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
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';

const TokenInformation = () => {
    const network = useSelector((state: rootState) => state.global.network);
    
    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const codeId = useTokenDetailStore((state) => state.tokenDetail?.codeId);

    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName) || '';
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol) || '';
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
    const label = useTokenDetailStore((state) => state.tokenDetail?.label) || '';
    const addressBalance = useTokenDetailStore((state) => state.tokenDetail?.addressBalance) || '';
    const totalSupply = useTokenDetailStore((state) => state.tokenDetail?.totalSupply) || '';
    const minterAddress = useTokenDetailStore((state) => state.tokenDetail?.minterAddress) || '';
    const minterCap = useTokenDetailStore((state) => state.tokenDetail?.minterCap);

    const isBasic = useMemo(() => {
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return codeId === craftConfig.CW20.BASIC_CODE_ID;
    }, [network, codeId]);

    return (
        <TokenCard>
            <TokenCardHeaderTypo>Token Information</TokenCardHeaderTypo>
            <TokenCardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Address</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo>{contractAddress}</SpecificValueTypo>
                        <CopyIconButton text={contractAddress} width={'22px'} height={'22px'} />
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Token Name</SpecificLabelTypo>
                    <SpecificValueTypo>{tokenName}</SpecificValueTypo>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Token Symbol</SpecificLabelTypo>
                    <SpecificValueTypo>{tokenSymbol}</SpecificValueTypo>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Decimals</SpecificLabelTypo>
                    <SpecificValueTypo>{decimals}</SpecificValueTypo>
                </SpecificItem>

                {!isBasic && <SpecificItem style={{ height: '28px' }}>
                    <SpecificLabelTypo>Label</SpecificLabelTypo>
                    {label && <SpecificValueCover>{label}</SpecificValueCover>}
                </SpecificItem>}

                <SpecificItem>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo
                            data-tooltip-content={commaNumber(parseAmountWithDecimal2(totalSupply, decimals))}
                            data-tooltip-id={TOOLTIP_ID.COMMON}
                            data-tooltip-wrapper="span"
                            data-tooltip-place="bottom"
                        >
                            {totalSupply && commaNumber(parseAmountWithDecimal2(totalSupply, decimals, true))}
                        </SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
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
                                data-tooltip-content={commaNumber(parseAmountWithDecimal2(minterCap, decimals))}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                {minterCap === '' ? '0' : commaNumber(parseAmountWithDecimal2(minterCap, decimals, true))}
                            </SpecificValueTypo>
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>My Balance</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo
                            data-tooltip-content={commaNumber(parseAmountWithDecimal2(addressBalance, decimals))}
                            data-tooltip-id={TOOLTIP_ID.COMMON}
                            data-tooltip-wrapper="span"
                            data-tooltip-place="bottom"
                        >
                            {addressBalance && commaNumber(parseAmountWithDecimal2(addressBalance, decimals, true))}
                        </SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default TokenInformation;
