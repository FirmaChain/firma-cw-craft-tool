import styled from 'styled-components';

import { CONTRACT_MODES, CONTRACT_MODE_TYPE } from '@/constants/common';
// import { GlobalActions } from '@/redux/actions';
import ModeSwitch from '@/components/atoms/switch/modeSwitch';
import useGlobalStore from '@/store/globalStore';

export const HeaderBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeaderWrap = styled.div`
    width: 100%;
    max-width: 1600px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
`;

export const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const Header = () => {
    const { handleMode } = useGlobalStore();

    const onChangeMenu = (value: string) => {
        if (hasMode(value)) {
            handleMode(value as CONTRACT_MODE_TYPE);
        } else {
            console.error(`Invalid value for mode: ${value}`);
        }
    };

    const hasMode = (value: string): value is CONTRACT_MODE_TYPE => {
        return CONTRACT_MODES.includes(value as CONTRACT_MODE_TYPE);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <HeaderTitle>Instantiate</HeaderTitle>
                <ModeSwitch leftMenu={CONTRACT_MODES[0]} rightMenu={CONTRACT_MODES[1]} onChangeMenu={onChangeMenu} />
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
