import ContentBody from './body';
import { ContentWrapper } from './style';
import Title from './title/title';
import WalletSearch from './search';

const TokenDetailContent = () => {
    return (
        <ContentWrapper>
            <Title />
            <ContentBody />
            <WalletSearch />
        </ContentWrapper>
    );
};

export default TokenDetailContent;
