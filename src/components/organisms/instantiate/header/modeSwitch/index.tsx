import { useState } from 'react';
import { ActiveIndicator, SwitchButton, SwitchContainer, SwitchLabel } from './style';

interface IProps {
    leftMenu: string;
    rightMenu: string;
    onChangeMenu: (value: string) => void;
}

const ModeSwitch = ({ leftMenu, rightMenu, onChangeMenu }: IProps) => {
    const [selectMenu, setSelectMenu] = useState<string>(leftMenu);

    const handleChangeMode = (value: string) => {
        setSelectMenu(value);
        onChangeMenu(value);
    };
    return (
        <SwitchContainer>
            <ActiveIndicator position={selectMenu === leftMenu ? 'left' : 'right'} />
            <SwitchButton isActive={selectMenu === leftMenu} position="left" onClick={() => handleChangeMode(leftMenu)}>
                <SwitchLabel>BASIC</SwitchLabel>
            </SwitchButton>
            <SwitchButton isActive={selectMenu === rightMenu} position="right" onClick={() => handleChangeMode(rightMenu)}>
                <SwitchLabel>ADVANCED</SwitchLabel>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default ModeSwitch;
