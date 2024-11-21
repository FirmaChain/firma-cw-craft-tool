import { HeaderBox, HeaderTitle, HeaderWrap } from './style';

import ConnectWallet from './connectWallet';
import SearchContract from './searchContract';
import useWalletStore from '@/store/walletStore';

interface IProps {
    contractAddress: string;
}

const Header = ({ contractAddress }: IProps) => {
    const { address, isInit } = useWalletStore();
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);
    // const address = useSelector((state: rootState) => state.wallet.address);

    return (
        <HeaderBox $hideBoder={!Boolean(address)}>
            <HeaderWrap>
                <HeaderTitle>Execute</HeaderTitle>
                {isInit ? <SearchContract contractAddress={contractAddress} /> : <ConnectWallet />}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
