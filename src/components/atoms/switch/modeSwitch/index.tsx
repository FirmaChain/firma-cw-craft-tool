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

    const isLeft = selectMenu === leftMenu;
    const isRight = selectMenu === rightMenu;

    return (
        <SwitchContainer>
            <ActiveIndicator $position={isLeft ? 'left' : 'right'} />
            <SwitchButton style={{ width: '108px' }} $isActive={isLeft} $position="left" onClick={() => handleChangeMode(leftMenu)}>
                <BasicTypo style={{ zIndex: 1, transition: 'opacity 0.3s', opacity: isLeft ? 0 : 1 }} $active={false}>
                    BASIC
                </BasicTypo>
                <BasicTypo style={{ position: 'absolute', transition: 'opacity 0.1s', opacity: isLeft ? 1 : 0 }} $active={true}>
                    BASIC
                </BasicTypo>
            </SwitchButton>
            <SwitchButton style={{ width: '138px' }} $isActive={isRight} $position="right" onClick={() => handleChangeMode(rightMenu)}>
                <AdvancedTypo style={{ zIndex: 1, transition: 'opacity 0.3s', opacity: isRight ? 0 : 1 }} $active={false}>
                    ADVANCED
                </AdvancedTypo>
                <AdvancedTypo style={{ position: 'absolute', transition: 'opacity 0.1s', opacity: isRight ? 1 : 0 }} $active={true}>
                    ADVANCED
                </AdvancedTypo>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default ModeSwitch;
