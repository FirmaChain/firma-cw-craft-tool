import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IWallet } from "../../../../interfaces/wallet";
import { PreviewWrapper } from "./style"

import Dashboard from "./dashboard";
import Submit from "./submit";
import { ModalActions } from "../../../../redux/actions";
import { rootState } from "../../../../redux/reducers";
import { compareStringsAsNumbers, getApplyDecimalsAmount, getTokenStrFromUTokenStr, getUTokenStrFromTokenStr, isValidAddress, validateSymbol } from "../../../../utils/common";
import { NETWORKS } from "../../../../constants/common";
import { CRAFT_CONFIGS } from "../../../../config";
import { BASIC_LABEL } from "../../../../constants/cw20Types";

interface IProps {
  isBasic: boolean;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDescription: string;
  minterble: boolean;
  minterCap: string;
  minterAddress: string;
  totalSupply: string;
  walletList: IWallet[];
  decimals: string;
  label: string;
  marketingAddress: string;
  marketingProject: string;
}

const Preview = ({
  isBasic,
  tokenLogoUrl,
  tokenName,
  tokenSymbol,
  tokenDescription,
  minterble,
  minterCap,
  minterAddress,
  walletList,
  totalSupply,
  decimals,
  label,
  marketingAddress,
  marketingProject,
}: IProps) => {
  const { isInit, address } = useSelector((state: rootState) => state.wallet);
  const { network } = useSelector((state: rootState) => state.global);

  const [codeId, setCodeId] = useState<string>('');

  useEffect(() => {
    const craftConfig = network === NETWORKS[0] ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    const cw20CodeId = craftConfig.CW20.CODE_ID;

    setCodeId(cw20CodeId);
  }, [network]);

  const handleInstantiate = () => {
    if (isInit) {
      const newDecimals = isBasic ? 6 : Number(decimals);

      let decimalsTotalSupply = getApplyDecimalsAmount(totalSupply, newDecimals.toString());
      let decimalsMinterCap = getApplyDecimalsAmount(minterCap, newDecimals.toString());

      let convertWalletList = [];

      for (const wallet of walletList) {
        convertWalletList.push({
          address: wallet.recipient,
          amount: getApplyDecimalsAmount(wallet.amount, newDecimals.toString())
        });
      }

      const invalidMessageType = checkInstantiate(isBasic, walletList, decimalsTotalSupply, decimalsMinterCap);

      if (invalidMessageType === "") {
        const messageData = {
          decimals: newDecimals,
          name: tokenName,
          symbol: tokenSymbol,
          initial_balances: convertWalletList,
          ...(minterble && {
            mint: {
              minter: isBasic ? address : minterAddress,
              cap: decimalsMinterCap
            }
          }),
          marketing: {
            description: tokenDescription === '' ? 'description' : tokenDescription,
            logo: { url: tokenLogoUrl === '' ? 'token logo url' : tokenLogoUrl },
            marketing: isBasic ? address : marketingAddress === '' ? address : marketingAddress,
            project: isBasic ? `${address} PROJECT` : marketingProject === '' ? `${address} PROJECT` : marketingProject
          }
        };

        ModalActions.handleData({
          module: '/cosmwasm/instantiateContract',
          params: {
            admin: address,
            codeId: codeId,
            label: label === '' ? BASIC_LABEL : label,
            msg: JSON.stringify(messageData)
          }
        });

        ModalActions.handleQrConfirm(true);

      } else {
        ModalActions.handleData({
          module: 'Instantiation',
          result: false,
          message: invalidMessageType
        });

        ModalActions.handleTxConfirm(true);
      }
    } else {
      ModalActions.handleConnectWallet(true);
    }
  }

  const checkInstantiate = (isBasic: boolean, walletList: IWallet[], totalSupply: string, minterCap: string) => {
    const addresses = walletList.map(item => item.recipient);
    const uniqueAddresses = new Set(addresses);

    if (tokenName === '')
      return 'Empty Token Name';

    if (tokenSymbol === '')
      return 'Empty Token Symbol';

    if (!validateSymbol(tokenSymbol))
      return 'Symbol is not in expected format [a-zA-Z0-9\\-]{3,12}';

    if (!isBasic && decimals === '')
      return 'Empty Decimals';

    if (!isBasic && label === '')
      return 'Empty Label';

    if (walletList.length === 0)
      return 'Not add a wallet';

    for (const wallet of walletList) {
      if (wallet.recipient === "") return 'Empty initial wallet address';
      if (wallet.amount === "0") return 'Wallet amount must be greater than 0';
      if (wallet.amount === "") return 'Empty initial wallet amount';
      if (!isValidAddress(wallet.recipient)) return 'Is valid address in wallet list';
    }

    if (walletList.length >= 1 && addresses.length !== uniqueAddresses.size)
      return 'Duplicated address';

    if (minterble && minterAddress === '')
      return 'Empty minter address';

    if (minterble && minterCap === '')
      return 'Empty minter cap amount';

    if (minterble && compareStringsAsNumbers(minterCap, totalSupply) === -1)
      return 'Initial supply greater than cap';

    return '';
  };


  return (
    <PreviewWrapper>
      <Dashboard
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
      <Submit
        onClickInstantiate={handleInstantiate}
      />
    </PreviewWrapper>
  )
};

export default Preview;