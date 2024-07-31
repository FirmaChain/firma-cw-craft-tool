import React from 'react';

import { CW_MODE_TYPE } from '@/constants/common';
import { ActiveIndicator, SwitchButton, SwitchContainer, SwitchLabel } from './style';

interface IProps {
    value: CW_MODE_TYPE;
    onChange: (type: CW_MODE_TYPE) => void;
}

const CwSwitch = ({ value, onChange }: IProps) => {
    const onChangeActiveType = (value: CW_MODE_TYPE) => {
        onChange(value);
    };

    return (
        <SwitchContainer>
            <ActiveIndicator $position={value === 'CW20' ? 'left' : 'right'} />
            <SwitchButton onClick={() => onChangeActiveType('CW20')}>
                <SwitchLabel $active={value === 'CW20' ? 'true' : 'false'}>CW 20</SwitchLabel>
            </SwitchButton>
            <SwitchButton onClick={() => onChangeActiveType('CW721')}>
                <SwitchLabel $active={value === 'CW721' ? 'true' : 'false'}>CW 721</SwitchLabel>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default React.memo(CwSwitch);
