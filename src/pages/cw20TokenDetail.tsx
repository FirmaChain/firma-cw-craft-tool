import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cw20SpenderAllowance } from "@firmachain/firma-js";

import { rootState } from "../redux/reducers";

import { Container } from "../styles/tokenDetail";
import { Header, TokenDetailContent } from "../components/organisms/tokenDetail";
import useTokenDetail from "../hooks/useTokenDetail";


const Cw20TokenDetail = () => {
  const targetContractAddress = window.location.pathname.replace('/mytoken/detail/', '');

  const { getTokenDetail } = useTokenDetail();

  const { isInit, address } = useSelector((state: rootState) => state.wallet);
  
  const [isBasic, setIsBasic] = useState<boolean>(false);
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenLogoUrl, setTokenLogoUrl] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [decimals, setDecimals] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [addressBalance, setAddressBalance] = useState<string>("");
  const [minterAddress, setMinterAddress] = useState<string>("");
  const [minterCap, setMinterCap] = useState<string>("");
  const [marketingLogo, setMarketingLogo] = useState<string>("");
  const [marketingDescription, setMarketingDescription] = useState<string>("");
  const [marketingAddress, setMarketingAddress] = useState<string>("");
  const [marketingProject, setMarketingProject] = useState<string>("");
  const [metadata, setMetadata] = useState<string>("");
  const [allAllowances, setAllAllowances] = useState<Cw20SpenderAllowance[]>([]);
  const [allSpenders, setAllSpenders] = useState<Cw20SpenderAllowance[]>([]);
  const [allAccounts, setAllAccounts] = useState<any[]>([]);

  const fetchTokenList = useCallback(async () => {
    if (isInit) {
      const tokenDetail = await getTokenDetail(targetContractAddress, address);
      if (tokenDetail) {
        setTokenName(tokenDetail.tokenName);
        setTokenSymbol(tokenDetail.tokenSymbol);
        setTokenLogoUrl(tokenDetail.marketingLogoUrl);
        setTotalSupply(tokenDetail.totalSupply);
        setDecimals(tokenDetail.decimals);
        setLabel(tokenDetail.label);
        setAddressBalance(tokenDetail.addressBalance);
        setMinterAddress(tokenDetail.minterAddress);
        setMinterCap(tokenDetail.minterCap);
        setMarketingLogo(tokenDetail.marketingLogoUrl);
        setMarketingDescription(tokenDetail.marketingDescription);
        setMarketingAddress(tokenDetail.marketing);
        setMarketingProject(tokenDetail.marketingProject);
        setMetadata(tokenDetail.metadata);
        setAllAllowances(tokenDetail.allAllowances);
        setAllSpenders(tokenDetail.allSpenders);
        setAllAccounts(tokenDetail.allAccounts);
      }
    }
  }, [getTokenDetail, isInit]);

  useEffect(() => {
    fetchTokenList();
  }, [fetchTokenList]);

  return (
    <Container>
      <Header tokenName={tokenName} />
      <TokenDetailContent
        isBasic={true}
        tokenName={tokenName}
        tokenSymbol={tokenSymbol}
        tokenLogoUrl={tokenLogoUrl}
        totalSupply={totalSupply}
        contractAddress={targetContractAddress}
        decimals={decimals}
        label={label}
        addressBalance={addressBalance}
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
    </Container>
  )
};

export default React.memo(Cw20TokenDetail);
