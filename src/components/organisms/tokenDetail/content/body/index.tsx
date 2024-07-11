import { Cw20SpenderAllowance } from '@firmachain/firma-js';
import { HalfDottedDivider } from '../../../../atoms/divider/dottedDivider';
import AdditionalInformation from './additionalInformation';
import { ContentBodyContainer } from './style';
import TokenInformation from './tokenInfomation';
import MyAllowances from './myAllowances';
import AllAccounts from './allAccounts';
import { ITransaction } from '../../../../../interfaces/cw20';
import Transactions from './transactions';
import { IAccounts, IAllowances, ISpenders } from '../../../../../hooks/useTokenDetail';

interface IProps {
    isBasic: boolean;
    contractAddress: string;
    tokenName: string;
    tokenSymbol: string;
    decimals: string;
    label: string;
    addressBalance: string;
    totalSupply: string;
    minterAddress: string;
    minterCap: string;
    marketingLogo: string;
    marketingDescription: string;
    marketingAddress: string;
    marketingProject: string;
    metadata: string;
    allAllowances: IAllowances[];
    allSpenders: ISpenders[];
    allAccounts: IAccounts[];
    transactionList: ITransaction[];
}

const ContentBody = ({
    isBasic,
    contractAddress,
    tokenName,
    tokenSymbol,
    decimals,
    label,
    addressBalance,
    totalSupply,
    minterAddress,
    minterCap,
    marketingLogo,
    marketingDescription,
    marketingAddress,
    marketingProject,
    metadata,
    allAllowances,
    allSpenders,
    allAccounts,
    transactionList
}: IProps) => {
    return (
        <ContentBodyContainer>
            <TokenInformation
                isBasic={isBasic}
                contractAddress={contractAddress}
                tokenName={tokenName}
                tokenSymbol={tokenSymbol}
                decimals={decimals}
                label={label}
                addressBalance={addressBalance}
                totalSupply={totalSupply}
                minterAddress={minterAddress}
                minterCap={minterCap}
            />
            <HalfDottedDivider />
            <AdditionalInformation
                contractAddress={contractAddress}
                marketingLogo={marketingLogo}
                marketingDescription={marketingDescription}
                marketingAddress={marketingAddress}
                marketingProject={marketingProject}
                metadata={metadata}
            />
            <HalfDottedDivider />
            <MyAllowances decimals={decimals} allAllowances={allAllowances} allSpenders={allSpenders} />
            <HalfDottedDivider />
            <AllAccounts decimals={decimals} allAccounts={allAccounts} />
            <HalfDottedDivider />
            <Transactions transactionList={transactionList} />
        </ContentBodyContainer>
    );
};

export default ContentBody;
