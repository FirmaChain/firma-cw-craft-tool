import AdditionalInformation from './additionalInformation';
import { ContentBodyContainer } from './style';
import TokenInformation from './tokenInfomation';
import MyAllowances from './myAllowances';
import AllAccounts from './allAccounts';
import Transactions from './transactions';
import LineDivider from '@/components/atoms/divider/lineDivider';

const ContentBody = () => {
    return (
        <ContentBodyContainer>
            <TokenInformation />
            <LineDivider />
            <AdditionalInformation />
            <LineDivider />
            <MyAllowances />
            <LineDivider />
            <AllAccounts />
            <LineDivider />
            <Transactions />
        </ContentBodyContainer>
    );
};

export default ContentBody;
