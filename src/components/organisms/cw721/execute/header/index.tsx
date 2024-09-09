import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import ConnectWallet from './connectWallet';
import SearchContract from './searchContract';
import styled from 'styled-components';

const HeaderBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 68px 88px 36px 96px;
    border-bottom: 1px solid #222;
`;

const HeaderWrap = styled.div`
    width: 100%;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    gap: 44px;
`;

const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

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
