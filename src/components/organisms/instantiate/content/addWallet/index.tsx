import { IWallet } from '../../../../../interfaces/wallet';
import Icons from '../../../../atoms/icons';
import Minterble from './minterble';
import { AddWalletWrapper, IconBackground, TextGroupWrapper, TitleDescription, TitleText, TitleWrapper } from './style';
import Summery from './summery';
import WalletList from './walletList';

interface IProps {
    walletCount: number;
    totalSupply: string;
    tokenSymbol: string;
    decimals: string;
    onChangeWalletList: (walletList: IWallet[]) => void;
    onChangeMinterble: (value: boolean) => void;
    onChangeMinterCap: (value: string) => void;
    onChangeMinterAddress: (value: string) => void;
}

const AddWallet = ({
    walletCount,
    totalSupply,
    tokenSymbol,
    decimals,
    onChangeWalletList,
    onChangeMinterble,
    onChangeMinterCap,
    onChangeMinterAddress
}: IProps) => {
    return (
        <AddWalletWrapper>
            <TitleWrapper>
                <IconBackground>
                    <Icons.wallet width={'32px'} height={'32px'} />
                </IconBackground>
                <TextGroupWrapper>
                    <TitleText>ADD INITIAL WALLET</TitleText>
                    <TitleDescription>Enter wallet information to add funds.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>
            <Summery totalSupply={totalSupply} tokenSymbol={tokenSymbol} decimals={decimals} />
            <WalletList decimals={decimals} onChangeWalletList={onChangeWalletList} />
            <Minterble
                decimals={decimals}
                onChangeMinterble={onChangeMinterble}
                onChangeMinterCap={onChangeMinterCap}
                onChangeMinterAddress={onChangeMinterAddress}
            />
        </AddWalletWrapper>
    );
};

export default AddWallet;
