import { useState } from 'react';
import { ActiveIndicator, AdvancedTypo, BasicTypo, SwitchButton, SwitchContainer } from './style';

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
            <ActiveIndicator $position={selectMenu === leftMenu ? 'left' : 'right'} />
            <SwitchButton $isActive={selectMenu === leftMenu} $position="left" onClick={() => handleChangeMode(leftMenu)}>
                <BasicTypo $active={selectMenu === leftMenu}>BASIC</BasicTypo>
            </SwitchButton>
            <SwitchButton $isActive={selectMenu === rightMenu} $position="right" onClick={() => handleChangeMode(rightMenu)}>
                <AdvancedTypo $active={selectMenu === rightMenu}>ADVANCED</AdvancedTypo>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default ModeSwitch;
