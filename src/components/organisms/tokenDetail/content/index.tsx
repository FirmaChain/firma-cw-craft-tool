import { Cw20SpenderAllowance } from "@firmachain/firma-js";
import ContentBody from "./body";
import { ContentWrapper } from "./style";
import Title from "./title/title";
import { ITransaction } from "../../../../interfaces/cw20";
import WalletSearch from "./search";

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
  transactionList: ITransaction[];
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
  transactionList
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
        transactionList={transactionList}
      />
      <WalletSearch tokenSymbol={tokenSymbol} decimals={decimals} contractAddress={contractAddress} />
    </ContentWrapper>
  )
}

export default TokenDetailContent;