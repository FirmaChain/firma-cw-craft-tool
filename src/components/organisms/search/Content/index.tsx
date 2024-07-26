import { Container, ContractWarp } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import TokenWalletSearch from './tokenWalletSearch';
import useSearchStore from '../searchStore';

const Content = () => {
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);

    return (
        contractAddress && (
            <Container>
                <ContractWarp>
                    <TokenNameCard />
                    <TokenDetailCard />
                    <TokenWalletSearch />
                </ContractWarp>
            </Container>
        )
    );
};

export default Content;
