import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import QRCodeModal from './qrcodeModal';
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
    ItemUrlTypo
} from './style';
import { IC_ID_CIRCLE, IC_NAVIGATION, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { shortenAddress } from '@/utils/address';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { parseAmountWithDecimal2 } from '@/utils/common';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface IAmountProps {
    label: string;
    decimals: string;
    amount: string;
    symbol: string;
}

export const AmountItem = ({ label, decimals, amount, symbol }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap style={{ alignItems: 'baseline' }}>
                <ItemAmountValue
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

export const ResultAmountItem = ({ label, decimals, amount, symbol }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap style={{ alignItems: 'baseline' }}>
                <ResultItemAmountTypo
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
}

export const WalletItem = ({ label, count }: IWalletProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemValue>{count}</ItemValue>
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
                <ItemValue
                    data-tooltip-content={address}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {shortenAddress(address, 12, 12)}
                </ItemValue>
                <ItemIcon src={IC_WALLET} alt={'wallet'} />
            </ItemValueWrap>
        </ItemWrap>
    );
};

interface IUrlProps {
    label: string;
    logo: string;
}

export const UrlItem = ({ label, logo }: IUrlProps) => {
    const _value = logo.length >= 40 ? shortenAddress(logo, 12, 12) : logo;

    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemUrlTypo>{_value}</ItemUrlTypo>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const FeeItem = () => {
    return <ItemWrap></ItemWrap>;
};

export const BalanceItem = () => {};

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

export const ExpirationItem = ({ value, type }: { value: string; type: string }) => {
    const mainText = useMemo(() => {
        if (type === 'never') return 'Forever';
        if (type === 'at_height') return value;
        if (type === 'at_time') {
            const timeInMs = Math.floor(Number(value) / 1000000);
            return format(timeInMs, 'yyyy-MM-dd HH:mm:ss');
        }

        return '';
    }, [type, value]);

    const subText = 'block';

    return (
        <ItemWrap>
            <ItemLabel>Expiration</ItemLabel>
            <ItemValueWrap>
                {type === 'at_time' && (
                    <ExpirationTypo>
                        <span className="main-text">{mainText}</span>
                    </ExpirationTypo>
                )}

                {type === 'at_height' && (
                    <ExpirationTypo style={{ alignItems: 'baseline' }}>
                        <span className="main-text">{mainText}</span>
                        <span className="sub-text">{subText}</span>
                    </ExpirationTypo>
                )}

                {type === 'never' && (
                    <ExpirationTypo>
                        <span className="main-text">{mainText}</span>
                    </ExpirationTypo>
                )}
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const NftItem = ({ label, value, symbol }: { label: string; value: string; symbol: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue>{value}</ItemAmountValue>
                <ItemAmountSymbol>{symbol}</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    );
};

export const NftIdItem = ({ label, value }: { label: string; value: string }) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemAmountValue>{value}</ItemAmountValue>
                <ItemIcon src={IC_ID_CIRCLE} alt="token-id" />
            </ItemValueWrap>
        </ItemWrap>
    );
};

export { QRCodeModal };
