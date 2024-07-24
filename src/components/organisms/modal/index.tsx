import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import QRCodeModal from './cw20/qrcodeModal';
import { ItemAmountLabel, ItemAmountSymbol, ItemAmountValue, ItemLabel, ItemValue, ItemValueWrap, ItemWalletIcon, ItemWrap } from './style';
import { IC_WALLET } from '@/components/atoms/icons/pngIcons';

interface IAmountProps {
    label: string;
    decimals: string;
    amount: string;
    symbol: string;
}

export const AmountItem = ({ label, decimals, amount, symbol }: IAmountProps) => {
    return (
        <ItemWrap>
            <ItemAmountLabel>{label}</ItemAmountLabel>
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
                <ItemWalletIcon src={IC_WALLET}/>
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

export {
    QRCodeModal
}