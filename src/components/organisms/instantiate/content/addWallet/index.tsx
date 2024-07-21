import { IWallet } from '@/interfaces/wallet';
import Icons from '@/components/atoms/icons';
import Minterble from './minterble';
import { AddWalletWrapper, IconBackground, TextGroupWrapper, TitleDescription, TitleText, TitleWrapper } from './style';
import Summery from './summery';
import WalletList from '@/components/atoms/walletList';
import Divider from '@/components/atoms/divider';

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
                    <Icons.Wallet width={'32px'} height={'32px'} />
                </IconBackground>
                <TextGroupWrapper>
                    <TitleText>ADD INITIAL WALLET</TitleText>
                    <TitleDescription>Enter wallet information to add funds.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>

            <div style={{ paddingBottom: '20px' }} />

            <Summery totalSupply={totalSupply} tokenSymbol={tokenSymbol} decimals={decimals} />

            <div style={{ paddingBottom: '40px' }} />

            <WalletList
                decimals={decimals}
                onChangeWalletList={onChangeWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
            <div style={{ width: '100%', padding: '32px 0' }}>
                <Divider $direction="horizontal" $color="#383838" $variant="dash" />
            </div>

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
