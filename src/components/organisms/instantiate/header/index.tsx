import { HeaderTitle, HeaderWrapper } from './style';

import { CW20_MODE, CW20_MODE_TYPE } from '../../../../constants/common';
import { GlobalActions } from '../../../../redux/actions';
import ModeSwitch from './modeSwitch';

const Header = () => {
    const onChangeMenu = (value: string) => {
        if (isCW20Mode(value)) {
            GlobalActions.handleCw20Mode(value as CW20_MODE_TYPE);
        } else {
            console.error(`Invalid value for CW20 mode: ${value}`);
        }
    };

    const isCW20Mode = (value: string): value is CW20_MODE_TYPE => {
        return CW20_MODE.includes(value as CW20_MODE_TYPE);
    };

    return (
        <HeaderWrapper>
            <HeaderTitle>Instantitate</HeaderTitle>
            <ModeSwitch leftMenu={CW20_MODE[0]} rightMenu={CW20_MODE[1]} onChangeMenu={onChangeMenu} />
        </HeaderWrapper>
    );
};

export default Header;
