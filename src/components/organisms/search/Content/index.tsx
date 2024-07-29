import styled from 'styled-components';

import { Container, ContractWarp, NoticeText } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import TokenWalletSearch from './tokenWalletSearch';
import useSearchStore from '../searchStore';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';

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
    const contractExist = useSearchStore((v) => v.contractExist);
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);

    console.log(contractAddress, contractExist);

    return (
        <Container>
            {contractExist === null && (
                <LogoBackground>
                    <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                </LogoBackground>
            )}
            {contractExist === false && <NoticeText>{'No contracts have been deployed.'}</NoticeText>}
            {contractExist === true && contractAddress && (
                <ContractWarp>
                    <TokenNameCard />
                    <TokenDetailCard />
                    <TokenWalletSearch />
                </ContractWarp>
            )}
        </Container>
    );
};

export default Content;
