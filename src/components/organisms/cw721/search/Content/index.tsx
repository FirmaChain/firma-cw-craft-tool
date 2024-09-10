import styled from 'styled-components';

import { Container, ContractWarp, NoticeText } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import { useMemo } from 'react';
import Search from './search';

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
    const { contractDetail, nftsInfo } = useNFTContractDetailStore();

    const contractExist = useMemo(() => {
        if (contractDetail === null || nftsInfo === null) return null;
        return !Boolean(contractDetail.contractAddress === '');
    }, [contractDetail, nftsInfo]);

    return (
        <Container>
            {contractExist === null && (
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
