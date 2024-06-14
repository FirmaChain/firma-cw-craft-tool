import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Container, MainContent } from "../styles/instantiate";
import { Content, Header, Preview } from "../components/organisms/instantiate";
import { rootState } from "../redux/reducers";
import { IWallet } from "../interfaces/wallet";

const Cw20Instantiate = () => {
  const { cw20Mode } = useSelector((state: rootState) => state.global);

  const [isBasic, setIsBasic] = useState<boolean>(true);
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenLogoUrl, setTokenLogoUrl] = useState<string>("");
  const [tokenDescription, setTokenDescription] = useState<string>("");
  const [minterCap, setMinterCap] = useState<string>("");
  const [walletList, setWalletList] = useState<IWallet[]>([]);
  const [decimals, setDecimals] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [marketingAddress, setMarketingAddress] = useState<string>("");
  const [marketingProject, setMarketingProject] = useState<string>("");
  const [minterAddress, setMinterAddress] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [walletCount, setWalletCount] = useState<number>(0);
  const [minterble, setMinterble] = useState<boolean>(false);
  
  useEffect(() => {
    if (cw20Mode === "BASIC") setIsBasic(true);
    else setIsBasic(false);
  }, [cw20Mode]);

  useEffect(() => {
    let sumAmount: number = 0;
    for (const wallet of walletList) {
      sumAmount += Number(wallet.amount);
    }
    setTotalSupply(sumAmount.toString());
    setWalletCount(walletList.length);
  }, [walletList]);

  return (
    <Container>
      <Header />
      <MainContent>
        <Content
          isBasic={isBasic}
          walletCount={walletCount}
          totalSupply={totalSupply}
          tokenSymbol={tokenSymbol}
          decimals={decimals}
          onChangeTokenName={(value) => setTokenName(value)}
          onChangeTokenSymbol={(value) => setTokenSymbol(value)}
          onChangeTokenLogoUrl={(value) => setTokenLogoUrl(value)}
          onChangeTokenDescription={(value) => setTokenDescription(value)}
          onChangeDecimals={(value) => setDecimals(value)}
          onChangeLabel={(value) => setLabel(value)}
          onChangeMarketingAddress={(value) => setMarketingAddress(value)}
          onChangeMarketingProject={(value) => setMarketingProject(value)}
          onChangeWalletList={(value) => setWalletList(value)}
          onChangeMinterble={(value) => setMinterble(value)}
          onChangeMinterCap={(value) => setMinterCap(value)}
          onChangeMinterAddress={(value) => setMinterAddress(value)}
        />
        <Preview
          isBasic={isBasic}
          tokenLogoUrl={tokenLogoUrl}
          tokenName={tokenName}
          tokenSymbol={tokenSymbol}
          tokenDescription={tokenDescription}
          minterble={minterble}
          minterCap={minterCap}
          minterAddress={minterAddress}
          totalSupply={totalSupply}
          walletList={walletList}
          decimals={decimals}
          label={label}
          marketingAddress={marketingAddress}
          marketingProject={marketingProject}
        />
      </MainContent>
    </Container>
  )
};

export default React.memo(Cw20Instantiate);