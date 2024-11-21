import styled from 'styled-components';

import { Container, ContractWarp, NoticeText } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';
// import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import { useMemo } from 'react';
import Search from './search';

import { useCW721Detail } from '@/context/cw721DetailStore';
import useWalletStore from '@/store/walletStore';

const LogoBackground = styled.div`
    position: fixed;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        width: 480px;
    }
`;

const Content = () => {
    const { address } = useWalletStore();
    // const address = useSelector((v: rootState) => v.wallet.address);
    const { contractDetail, nftsInfo } = useCW721Detail();

    const contractExist = useMemo(() => {
        if (contractDetail === null || nftsInfo === null) return null;
        return !Boolean(contractDetail.contractAddress === '');
    }, [contractDetail, nftsInfo]);

    return (
        <Container>
            {contractExist === null && address && (
                <LogoBackground>
                    <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                </LogoBackground>
            )}
            {contractExist === false && <NoticeText>{'No contracts have been deployed.'}</NoticeText>}
            {contractExist === true && (
                <ContractWarp>
                    <TokenNameCard />
                    <TokenDetailCard />
                    <Search />
                </ContractWarp>
            )}
        </Container>
    );
};

export default Content;
