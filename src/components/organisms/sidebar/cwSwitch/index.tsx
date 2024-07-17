import React, { useState } from 'react';

import { CW_TYPE } from '@/constants/common';
import { ActiveIndicator, SwitchButton, SwitchContainer, SwitchLabel } from './style';

interface IProps {
    onChange: (type: CW_TYPE) => void;
}

const CwSwitch = ({ onChange }: IProps) => {
    const [active, setActive] = useState<CW_TYPE>('CW20');

    const onChangeActiveType = (value: CW_TYPE) => {
        setActive(value);
        onChange(value);
    };

    return (
        <SwitchContainer>
            <ActiveIndicator position={active === 'CW20' ? 'left' : 'right'} />
            <SwitchButton onClick={() => onChangeActiveType('CW20')}>
                <SwitchLabel $active={active === 'CW20' ? 'true' : 'false'}>CW 20</SwitchLabel>
            </SwitchButton>
            <SwitchButton
                disabled
                // onClick={() => onChangeActiveType('CW721')}
            >
                <SwitchLabel $active={active === 'CW721' ? 'true' : 'false'}>CW 721</SwitchLabel>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default React.memo(CwSwitch);
