import AddWallet from './addWallet';
import Information from './information';
import { ContentWrapper } from './style';

interface IProps {
    isBasic: boolean;
}

const Content = ({ isBasic }: IProps) => {
    return (
        <ContentWrapper>
            <Information isBasic={isBasic} />
            <AddWallet />
        </ContentWrapper>
    );
};

export default Content;
