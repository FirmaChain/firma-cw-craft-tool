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

interface IProps {
    isBasic: boolean;
    contractAddress: string;
    tokenName: string;
    tokenSymbol: string;
    decimals: string;
    label: string;
    addressBalance: string;
    totalSupply: string;
    minterAddress: string;
    minterCap: string;
}

const TokenInformation = ({
    isBasic,
    contractAddress,
    tokenName,
    tokenSymbol,
    decimals,
    label,
    addressBalance,
    totalSupply,
    minterAddress,
    minterCap
}: IProps) => {
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
                        <SpecificValueTypo>{getTokenStrFromUTokenStr(totalSupply, decimals)}</SpecificValueTypo>

                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>

                {minterAddress && (
                    <SpecificItem>
                        <SpecificLabelTypo>Minter Address</SpecificLabelTypo>
                        <SpecificValueWrapper>
                            <SpecificValueTypo>{minterAddress}</SpecificValueTypo>
                            <CopyIconButton text={minterAddress} width={'22px'} height={'22px'} />
                        </SpecificValueWrapper>
                    </SpecificItem>
                )}

                <SpecificItem>
                    <SpecificLabelTypo>Minter Cap</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo>{getTokenStrFromUTokenStr(minterCap, decimals)}</SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>My Balance</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        <SpecificValueTypo>{getTokenStrFromUTokenStr(addressBalance, decimals)}</SpecificValueTypo>
                        <SpecificValueSymbol>{tokenSymbol}</SpecificValueSymbol>
                    </SpecificValueWrapper>
                </SpecificItem>
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default TokenInformation;
