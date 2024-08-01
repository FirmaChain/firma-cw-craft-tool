import { ContentBodyContainer } from './style';
import ContractInformation from './contractInformation';
import Transactions from './transactions';
import Divider from '@/components/atoms/divider';
import OwnerInformation from './ownerInformation';

const ContentBody = () => {
    return (
        <ContentBodyContainer>
            <ContractInformation />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            <OwnerInformation />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            {/* <AdditionalInformation />
            <MyAllowances />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" />
            <AllAccounts />
            <Divider $direction="horizontal" $color={'#383838'} $variant="dash" /> */}
            <Transactions />
        </ContentBodyContainer>
    );
};

export default ContentBody;
