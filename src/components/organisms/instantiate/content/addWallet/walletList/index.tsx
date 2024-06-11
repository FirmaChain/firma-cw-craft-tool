import React, { useEffect, useState } from "react";
import { FirmaUtil } from "@firmachain/firma-js";

import InputAddressAmount from "../../../../../atoms/input/inputAddressAmount";
import { AddWalletCountWrapper, AddWalletTypo, AddWalletWrapper, MaxWalletCountTypo, NowWalletCountTypo, TotalWalletTypo, TotalWalletWrapper, WalletCountWrapper, WalletListSummery, WalletListWrapper } from "./style";

import { IWallet } from "../../../../../../interfaces/wallet"
import Icons from "../../../../../atoms/icons";

interface IProps {
  decimals: string;
  onChangeWalletList: (walletList: IWallet[]) => void;
}

const WalletList = ({ decimals, onChangeWalletList }: IProps) => {
  const [walletList, setWalletList] = useState<IWallet[]>([{ address: '', amount: '' }]);
  const [validity, setValidity] = useState<boolean[]>([true]);

  useEffect(() => {
    if (walletList.length === 0) {
      handleAddWallet();
    }
  }, [walletList]);

  useEffect(() => {
    onChangeWalletList(walletList);
  }, [walletList, onChangeWalletList]);
  
  const handleAddWallet = () => {
    setWalletList([...walletList, { address: '', amount: '' }]);
    setValidity([...validity, true]);
  };

  const handleRemoveWallet = (index: number) => {
    if (walletList.length !== 1) {
      const newWalletList = walletList.filter((_, i) => i !== index);
      const newValidity = validity.filter((_, i) => i !== index);
      setWalletList(newWalletList);
      setValidity(newValidity);
    }
  };

  const handleChange = (index: number, field: keyof IWallet, value: string) => {
    const newWalletList = walletList.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setWalletList(newWalletList);

    if (field === 'address') {
      const isValid = validateAddress(value);
      const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
      setValidity(newValidity);
    }
  };

  const validateAddress = (value: string): boolean => {
    return FirmaUtil.isValidAddress(value);
  };

  return (
    <WalletListWrapper>
      <WalletListSummery>
        <TotalWalletWrapper>
          <TotalWalletTypo>Total Wallet</TotalWalletTypo>
          <WalletCountWrapper>
            <NowWalletCountTypo>{walletList.length}</NowWalletCountTypo>
            <MaxWalletCountTypo>/20</MaxWalletCountTypo>
          </WalletCountWrapper>
        </TotalWalletWrapper>
      </WalletListSummery>
      {walletList.map((wallet, index) => (
        <InputAddressAmount
          key={index}
          index={index + 1}
          address={wallet.address}
          amount={wallet.amount}
          onChangeAddress={(value) => handleChange(index, 'address', value)}
          onChangeAmount={(value) => handleChange(index, 'amount', value)}
          onRemoveClick={() => handleRemoveWallet(index)}
          isLast={index === walletList.length - 1}
          isValid={validity[index]}
          decimals={decimals}
        />
      ))}
      <AddWalletWrapper onClick={handleAddWallet}>
        <Icons.Add width={'16px'} height={'16px'} />
        <AddWalletTypo style={{ marginLeft: '2px' }}>Add</AddWalletTypo>
        <AddWalletCountWrapper>
          <AddWalletTypo>{'('}</AddWalletTypo>
          <AddWalletTypo>{walletList.length}</AddWalletTypo>
          <AddWalletTypo>{'/20)'}</AddWalletTypo>
        </AddWalletCountWrapper>
      </AddWalletWrapper>
    </WalletListWrapper>
  )
};

export default React.memo(WalletList);