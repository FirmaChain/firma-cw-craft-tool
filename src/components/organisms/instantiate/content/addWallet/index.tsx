import Icons from '@/components/atoms/icons';
import Minterble from './minterble';
import { AddWalletWrapper, IconBackground, TextGroupWrapper, TitleDescription, TitleText, TitleWrapper } from './style';
import Summery from './summery';
import Divider from '@/components/atoms/divider';
import useInstantiateStore from '../../instaniateStore';
import FormWalletList from '@/components/atoms/walletList/formWalletList';

const AddWallet = () => {
    const walletList = useInstantiateStore((v) => v.walletList);
    const totalSupply = useInstantiateStore((v) => v.totalSupply);
    const tokenSymbol = useInstantiateStore((v) => v.tokenSymbol);
    const decimals = useInstantiateStore((v) => v.decimals);
    const setWalletList = useInstantiateStore((v) => v.setWalletList);

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
