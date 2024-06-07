import Select from 'react-select';

import { NETWORK_TYPE } from "../../../../constants/common"
import { MenuHeader, NetworkMenuContainer, SelectStyle } from "./style";

interface IProps {
  onChange: (type: NETWORK_TYPE) => void;
}

const options = [
  { value: "MAINNET", label: "MAINNET" },
  { value: "TESTNET", label: "TESTNET" },
]

export const NetworkMenu = ({ onChange }: IProps) => {

  const onChangeActiveMenu = (e: any) => {
    if (e === null) return;

    onChange(e.value);
  };

  return (
    <NetworkMenuContainer>
      <MenuHeader>Network</MenuHeader>
      <Select
        options={options}
        styles={SelectStyle}
        defaultValue={options.find(option => option.value === 'TESTNET')}
        onChange={onChangeActiveMenu}
      />
    </NetworkMenuContainer>
  )
};

export default NetworkMenu;