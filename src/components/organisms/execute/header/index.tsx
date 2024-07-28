import { useSelector } from 'react-redux';
import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import { rootState } from '@/redux/reducers';
import ConnectWallet from './connectWallet';
import SearchContract from './searchContract';

interface IProps {
    contractAddress: string;
}

const Header = ({ contractAddress }: IProps) => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

    return (
        <HeaderBox>
            <HeaderWrap>
                <HeaderTitle>Execute</HeaderTitle>
                {isInit ? <SearchContract contractAddress={contractAddress} /> : <ConnectWallet />}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
