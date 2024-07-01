import React, { useState } from "react";

import { ActiveIndicator, SwitchButton, SwitchContainer, SwitchLabel } from "./style";
import { TRANSACTION_TYPE } from "../../../../../../../constants/common";

interface IProps {
  onChange: (type: TRANSACTION_TYPE) => void;
}
const TransactionSwitch = ({ onChange }: IProps) => {
  const [active, setActive] = useState<TRANSACTION_TYPE>('ALL');

  const onChangeActiveType = (value: TRANSACTION_TYPE) => {
    setActive(value);
    onChange(value);
  };

  return (
    <SwitchContainer>
      <ActiveIndicator position={active === 'ALL' ? 'left' : 'right'} />
      <SwitchButton onClick={() => onChangeActiveType('ALL')}>
        <SwitchLabel $active={active === 'ALL' ? 'true' : 'false'}>All</SwitchLabel>
      </SwitchButton>
      <SwitchButton onClick={() => onChangeActiveType('MY')}>
        <SwitchLabel $active={active === 'MY' ? 'true' : 'false'}>My</SwitchLabel>
      </SwitchButton>
    </SwitchContainer>
  )
}

export default React.memo(TransactionSwitch);