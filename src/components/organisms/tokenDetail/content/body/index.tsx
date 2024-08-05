import AdditionalInformation from './additionalInformation';
import { ContentBodyContainer } from './style';
import TokenInformation from './tokenInfomation';
import MyAllowances from './myAllowances';
import AllAccounts from './allAccounts';
import Transactions from './transactions';
import Divider from '@/components/atoms/divider';

const ContentBody = () => {
    return (
        <ContentBodyContainer>
            <TokenInformation />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            <AdditionalInformation />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            {/* <MyAllowances />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" /> */}
            <AllAccounts />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            <Transactions />
        </ContentBodyContainer>
    );
};

export default ContentBody;
