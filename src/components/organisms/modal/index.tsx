import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import {
    ItemAmountSymbol,
    ItemAmountValue,
    ItemHashValue,
    ItemLabel,
    ItemValue,
    ItemValueWrap,
    ItemIcon,
    ItemWrap,
    ResultItemAmountTypo,
    ExpirationTypo,
    ItemUrlTypo,
    ModalResultAddressTypo,
    ItemVerticalWrap,
    ItemDefaultTypo,
    ItemContractAddressValue,
    ItemExecuteAmountValue
} from './style';
import { IC_ID_CIRCLE, IC_NAVIGATION, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { shortenAddress } from '@/utils/address';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useMemo } from 'react';
import { format } from 'date-fns';
import commaNumber from 'comma-number';
import { CRAFT_CONFIGS } from '@/config';
import { openLink } from '@/utils/common';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';

interface IAmountProps {
    label: string;
    decimals: string;
    amount: string;
    symbol: string;
    color: string;
}

export const AmountItem = ({ label, decimals, amount, symbol, color }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap style={{ alignItems: 'baseline' }}>
                <ItemAmountValue
                    className="clamp-single-line"
                    $color={color}
                    // data-tooltip-content={parseAmountWithDecimal2(amount, decimals)}
                    // data-tooltip-id={TOOLTIP_ID.COMMON}
                    // data-tooltip-wrapper="span"
                    // data-tooltip-place="bottom"
                >
                    {/* {Number(parseAmountWithDecimal2(amount, decimals)) < 0.01 ? '< 0.01' : parseAmountWithDecimal2(amount, decimals, true)} */}
                    {formatWithCommas(getTokenAmountFromUToken(amount, decimals))}
                </ItemAmountValue>
                <ItemAmountSymbol>{symbol}</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ExecuteAmountItem = ({ label, decimals, amount, symbol, color }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap style={{ alignItems: 'baseline' }}>
                <ItemExecuteAmountValue
                    className="clamp-single-line"
                    $color={color}
                    // data-tooltip-content={parseAmountWithDecimal2(amount, decimals)}
                    // data-tooltip-id={TOOLTIP_ID.COMMON}
                    // data-tooltip-wrapper="span"
                    // data-tooltip-place="bottom"
                >
                    {/* {Number(parseAmountWithDecimal2(amount, decimals)) < 0.01 ? '< 0.01' : parseAmountWithDecimal2(amount, decimals, true)} */}
                    {formatWithCommas(getTokenAmountFromUToken(amount, decimals))}
                </ItemExecuteAmountValue>
                <ItemAmountSymbol>{symbol}</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ResultAmountItem = ({ label, decimals, amount, symbol }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap style={{ alignItems: 'baseline' }}>
                <ResultItemAmountTypo
                    className="clamp-single-line"
                    // data-tooltip-content={parseAmountWithDecimal2(amount, decimals)}
                    // data-tooltip-id={TOOLTIP_ID.COMMON}
                    // data-tooltip-wrapper="span"
                    // data-tooltip-place="bottom"
                >
                    {/* {Number(parseAmountWithDecimal2(amount, decimals)) < 0.01 ? '< 0.01' : parseAmountWithDecimal2(amount, decimals, true)} */}
                    {formatWithCommas(getTokenAmountFromUToken(amount, decimals))}
                </ResultItemAmountTypo>
                <ItemAmountSymbol>{symbol}</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

interface IWalletProps {
    label: string;
    count: string;
    color: string;
}

export const WalletCount = ({ label, count, color }: IWalletProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemValue className="clamp-single-line">{count}</ItemValue>
                <ItemIcon src={IC_WALLET} alt={'Modal Wallet Icon'} />
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const WalletAdress = ({ label, address }: { label: string; address: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ModalResultAddressTypo
                    data-tooltip-content={address}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {shortenAddress(address, 12, 12)}
                </ModalResultAddressTypo>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ResultWalletAdress = ({ label, address, color }: { label: string; address: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ModalResultAddressTypo
                    data-tooltip-content={address}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {shortenAddress(address, 12, 12)}
                </ModalResultAddressTypo>
            </ItemValueWrap>
        </ItemWrap>
    );
};

interface IUrlProps {
    label: string;
    logo: string;
    color: string
}

export const UrlItem = ({ label, logo, color }: IUrlProps) => {
    // const _value = logo.length > 32 ? shortenAddress(logo, 20, 12) : logo;

    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemUrlTypo $disabled={!Boolean(logo)}>{logo ? shortenAddress(logo, 20, 12) : '-'}</ItemUrlTypo>
            </ItemValueWrap>
        </ItemWrap>
    );
};

interface IProps {
    label: string;
    hash: string;
    onClickHash: (hash: string) => void;
}

export const TransactionItem = ({ label, hash, onClickHash }: IProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap className="pointer select-none" onClick={() => onClickHash(hash)}>
                <ItemHashValue>{shortenAddress(hash, 12, 12)}</ItemHashValue>
                <ItemIcon src={IC_NAVIGATION} alt={'Modal Transaction Hash Icon'} />
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ExpirationItem = ({ value, type, color }: { value: string; type: string; color: string }) => {
    const mainText = useMemo(() => {
        if (type === 'never') return 'Forever';
        if (type === 'at_height') return commaNumber(value);
        if (type === 'at_time') {
            const timeInMs = Math.floor(Number(value) / 1000000);
            return format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a');
        }

        return '';
    }, [type, value]);

    const subText = 'Block';

    return (
        <ItemWrap>
            <ItemLabel>Expiration</ItemLabel>
            <ItemValueWrap>
                {type === 'at_time' && (
                    <ExpirationTypo>
                        <span className="main-text clamp-single-line">{mainText}</span>
                    </ExpirationTypo>
                )}

                {type === 'at_height' && (
                    <ExpirationTypo style={{ alignItems: 'baseline' }}>
                        <span className="main-text clamp-single-line">{mainText}</span>
                        <span className="sub-text">{subText}</span>
                    </ExpirationTypo>
                )}

                {type === 'never' && (
                    <ExpirationTypo>
                        <span className="main-text clamp-single-line">{mainText}</span>
                    </ExpirationTypo>
                )}
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const NftItem = ({ label, value, color }: { label: string; value: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue $color={color}>{value}</ItemAmountValue>
                <ItemAmountSymbol>NFT</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const NftResultItem = ({ label, value }: { label: string; value: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue style={{ color: '#E6E6E6' }}>{value}</ItemAmountValue>
                <ItemAmountSymbol>NFT</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const NftIdItem = ({ label, value, color }: { label: string; value: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue>{value}</ItemAmountValue>
                <ItemAmountSymbol>NFT</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ResultNftIdItem = ({ label, value, color }: { label: string; value: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue $color={color}>{value}</ItemAmountValue>
                <ItemIcon src={IC_ID_CIRCLE} alt="token-id" />
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const WarningItem = ({ label, value }: { label: string; value: string }) => {
    return (
        <ItemVerticalWrap>
            <ItemLabel style={{ color: '#E55250', fontSize: '14px', fontWeight: '500', lineHeight: '20px' }}>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemDefaultTypo style={{ fontSize: '14px', fontWeight: '500', lineHeight: '20px', textAlign: 'center' }}>
                    {value}
                </ItemDefaultTypo>
            </ItemValueWrap>
        </ItemVerticalWrap>
    );
};

export const DefaultItem = ({ label, value, color }: { label: string; value: string; color: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemDefaultTypo>{value}</ItemDefaultTypo>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const ContractAddressItem = ({ label, contractAddress }: { label: string; contractAddress: string; }) => {
    const explorerUrl = CRAFT_CONFIGS.BLOCK_EXPLORER;
    const openContractAddress = () => openLink(`${explorerUrl}/accounts/${contractAddress}`);
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap className="pointer select-none" onClick={openContractAddress}>
                <ItemContractAddressValue>{shortenAddress(contractAddress, 12, 12)}</ItemContractAddressValue>
                <CopyIconButton text={contractAddress} width={'16px'} height={'16px'} />
            </ItemValueWrap>
        </ItemWrap>
    );
};
