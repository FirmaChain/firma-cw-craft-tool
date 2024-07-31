import ContentBody from './body';
import { ContentBox, ContentWrapper } from './style';
import Title from './title/title';
import WalletSearch from './search';

const NFTContractDetailContent = () => {
    return (
        <ContentBox>
            <ContentWrapper>
                <Title />
                <ContentBody />
                <WalletSearch />
            </ContentWrapper>
        </ContentBox>
    );
};

export default NFTContractDetailContent;
