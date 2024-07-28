import { Container, ContractWarp, NoticeText } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import TokenWalletSearch from './tokenWalletSearch';
import useSearchStore from '../searchStore';
import { Fragment } from 'react/jsx-runtime';
import { useEffect } from 'react';

const Content = () => {
    const contractExist = useSearchStore((v) => v.contractExist);
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);

    useEffect(() => {
        console.log(contractExist, contractAddress);
    }, [contractExist, contractAddress])

    return (
        <Container>
            {contractExist === null && <Fragment />}
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
