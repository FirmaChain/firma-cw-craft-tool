import Icons from '@/components/atoms/icons';
import Minterble from './minterble';
import { AddWalletWrapper, IconBackground, TextGroupWrapper, TitleDescription, TitleText, TitleWrapper } from './style';
import Summery from './summery';
import Divider from '@/components/atoms/divider';
// import useInstantiateStore from '../../instaniateStore';
import FormWalletList from '@/components/atoms/walletList/formWalletList';
import { useCW20Instantiate } from '@/context/cw20InstantiateContext';

const AddWallet = () => {
    const context = useCW20Instantiate();
    const walletList = context.walletList;
    const totalSupply = context.totalSupply;
    const tokenSymbol = context.tokenSymbol;
    const decimals = context.decimals;
    const setWalletList = context.setWalletList;

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

            <Summery totalSupply={totalSupply} tokenSymbol={tokenSymbol} decimals={decimals} />

            <FormWalletList
                walletList={walletList}
                decimals={decimals}
                setWalletList={setWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
            <div style={{ width: '100%', padding: '32px 0' }}>
                <Divider $direction="horizontal" $color="#383838" $variant="dash" />
            </div>

            <Minterble decimals={decimals} />
        </AddWalletWrapper>
    );
};

export default AddWallet;
