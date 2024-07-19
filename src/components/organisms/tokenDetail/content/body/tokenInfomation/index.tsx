import { getTokenStrFromUTokenStr } from '@/utils/common';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';

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

const TokenInformation = () => {
    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName) || '';
    const tokenSymbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol) || '';
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
    const label = useTokenDetailStore((state) => state.tokenDetail?.label) || '';
    const addressBalance = useTokenDetailStore((state) => state.tokenDetail?.addressBalance) || '';
    const totalSupply = useTokenDetailStore((state) => state.tokenDetail?.totalSupply) || '';
    const minterAddress = useTokenDetailStore((state) => state.tokenDetail?.minterAddress) || '';
    const minterCap = useTokenDetailStore((state) => state.tokenDetail?.minterCap);

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

                <SpecificItem style={{ height: '28px' }}>
                    <SpecificLabelTypo>Label</SpecificLabelTypo>
                    {label && <SpecificValueCover>{label}</SpecificValueCover>}
                </SpecificItem>

                <SpecificItem>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo>{totalSupply && getTokenStrFromUTokenStr(totalSupply, decimals)}</SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>

                {minterAddress && (
                    <SpecificItem>
                        <SpecificLabelTypo>Minter Address</SpecificLabelTypo>
                        <SpecificValueWrapper>
                            <SpecificValueTypo>{minterAddress}</SpecificValueTypo>
                            {minterAddress && <CopyIconButton text={minterAddress} width={'22px'} height={'22px'} />}
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>Minter Cap</SpecificLabelTypo>
                    {minterCap !== undefined && minterCap !== '' && (
                        <SpecificValueWrapper>
                            <SpecificValueTypo>{getTokenStrFromUTokenStr(minterCap, decimals)}</SpecificValueTypo>
                            <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                        </SpecificValueWrapper>
                    )}
                </SpecificItem>

                <SpecificItem>
                    <SpecificLabelTypo>My Balance</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo>{addressBalance && getTokenStrFromUTokenStr(addressBalance, decimals)}</SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default TokenInformation;
