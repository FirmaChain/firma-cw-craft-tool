import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import QRCodeModal from './cw20/qrcodeModal';
import { ItemAmountSymbol, ItemAmountValue, ItemHashValue, ItemLabel, ItemValue, ItemValueWrap, ItemIcon, ItemWrap } from './style';
import { IC_NAVIGATION, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { shortenAddress } from '@/utils/address';

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
            <ItemValueWrap>
                <ItemAmountValue>{formatWithCommas(getTokenAmountFromUToken(amount, decimals))}</ItemAmountValue>
                <ItemAmountSymbol>{symbol}</ItemAmountSymbol>
            </ItemValueWrap>
        </ItemWrap>
    )
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
                <ItemIcon src={IC_WALLET} alt={"Modal Wallet Icon"}/>
            </ItemValueWrap>
        </ItemWrap>
    )
};

interface IUrlProps {
    label: string;
    logo: string;
}

export const UrlItem = ({ label, logo }: IUrlProps) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap>
                <ItemValue>{logo}</ItemValue>
            </ItemValueWrap>
        </ItemWrap>
    )
};

export const FeeItem = () => {
    return (
        <ItemWrap>

        </ItemWrap>
    )
};

export const BalanceItem = () => {

};

interface IProps {
    label: string;
    hash: string;
    onClickHash: (hash: string) => void;
}

export const TransactionItem = ({ label, hash, onClickHash }: IProps                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ) => {
    return (
        <ItemWrap>
            <ItemLabel>{label}</ItemLabel>
            <ItemValueWrap onClick={() => onClickHash(hash)}>
                <ItemHashValue>{shortenAddress(hash, 12, 12)}</ItemHashValue>
                <ItemIcon src={IC_NAVIGATION} alt={"Modal Transaction Hash Icon"}/>
            </ItemValueWrap>
        </ItemWrap>
    )
}
export {
    QRCodeModal
}