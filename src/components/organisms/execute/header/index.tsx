import { useSelector } from 'react-redux';
import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import { rootState } from '@/redux/reducers';
import ConnectWallet from './connectWallet';
import SearchContract from './searchContract';

const Header = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    return (
        <HeaderBox>
            <HeaderWrap>
                <HeaderTitle>Execute</HeaderTitle>
                {isInit ? <SearchContract /> : <ConnectWallet />}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
