import { Container, ContractWarp, LogoBackground } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import TokenWalletSearch from './tokenWalletSearch';
import useSearchStore from '../searchStore';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';

const Content = () => {
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);

    return contractAddress ? (
        <Container>
            <ContractWarp>
                <TokenNameCard />
                <TokenDetailCard />
                <TokenWalletSearch />
            </ContractWarp>
        </Container>
    ) : (
        <LogoBackground>
            <img
                src={FIRMA_DIM_LOGO}
                alt="logo"
                style={{ width: '480px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
            />
        </LogoBackground>
    );
};

export default Content;
