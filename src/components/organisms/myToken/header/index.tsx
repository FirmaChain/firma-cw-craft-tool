import { useEffect, useState } from 'react';

import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import Icons from '@/components/atoms/icons';
import SearchInput2 from '@/components/atoms/input/searchInput';
import axios from 'axios';
import { CRAFT_CONFIGS } from '@/config';
import { getAccessToken } from '@/utils/token';

const Header = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <HeaderTitle>My Minted Tokens</HeaderTitle>
                {/* <SearchInput2
                    placeHolder={'Search Token Name, Token Symbols'}
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    adornment={{
                        end: <Icons.Search width={'16px'} height={'16px'} />
                    }}
                    maxWidth="352px"
                /> */}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
