import { Cw20SpenderAllowance } from "@firmachain/firma-js";
import ContentBody from "./body";
import { ContentWrapper } from "./style";
import Title from "./title/title";

interface IProps {
  isBasic: boolean;
  tokenName: string;
  tokenSymbol: string;
  tokenLogoUrl: string;
  totalSupply: string;
  contractAddress: string;
  decimals: string;
  label: string;
  addressBalance: string;
  minterAddress: string;
  minterCap: string;
  marketingLogo: string;
  marketingDescription: string;
  marketingAddress: string;
  marketingProject: string;
  metadata: string;
  allAllowances: Cw20SpenderAllowance[];
  allSpenders: Cw20SpenderAllowance[];
  allAccounts: any[];
}

const TokenDetailContent = ({
  isBasic,
  tokenName,
  tokenLogoUrl,
  tokenSymbol,
  totalSupply,
  contractAddress,
  decimals,
  label,
  addressBalance,
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
}: IProps) => {
  return (
    <ContentWrapper>
      <Title tokenLogoUrl={tokenLogoUrl} tokenSymbol={tokenSymbol} tokenName={tokenName} totalSupply={totalSupply} />
      <ContentBody
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
        marketingLogo={marketingLogo}
        marketingDescription={marketingDescription}
        marketingAddress={marketingAddress}
        marketingProject={marketingProject}
        metadata={metadata}
        allAllowances={allAllowances}
        allSpenders={allSpenders}
        allAccounts={allAccounts}
      />
    </ContentWrapper>
  )
}

export default TokenDetailContent;