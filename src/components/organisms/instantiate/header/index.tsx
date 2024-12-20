import ModeSwitch from '@/components/atoms/switch/modeSwitch';
import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import { CONTRACT_MODES, CONTRACT_MODE_TYPE } from '@/constants/common';
import useGlobalStore from '@/store/globalStore';
// import { GlobalActions } from '@/redux/actions';

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
