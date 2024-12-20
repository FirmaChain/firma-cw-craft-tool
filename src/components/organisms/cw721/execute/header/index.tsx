import ConnectWallet from './connectWallet';
import SearchContract from './searchContract';
import styled from 'styled-components';
import useWalletStore from '@/store/walletStore';

const HeaderBox = styled.div<{ $hideBorder: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 68px 88px 36px 96px;
    border-bottom: ${({ $hideBorder }) => ($hideBorder ? 'unset' : '1px solid #222')};
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
    const { address, isInit } = useWalletStore();
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);
    // const address = useSelector((state: rootState) => state.wallet.address);

    return (
        <HeaderBox $hideBorder={!Boolean(address)}>
            <HeaderWrap>
                <HeaderTitle>Execute</HeaderTitle>
                {isInit ? <SearchContract contractAddress={contractAddress} /> : <ConnectWallet />}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
