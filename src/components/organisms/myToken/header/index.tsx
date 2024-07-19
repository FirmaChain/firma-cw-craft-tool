import { useState } from 'react';

import { HeaderTitle, HeaderWrapper } from './style';
import Icons from '@/components/atoms/icons';
import SearchInput2 from '@/components/atoms/input/searchInput';

const Header = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };

    return (
        <HeaderWrapper>
            <HeaderTitle>My Minted Tokens</HeaderTitle>
            <SearchInput2
                placeHolder={'Search Token Name, Token Symbols'}
                value={searchValue}
                onChange={onChangeSearchValue}
                adornment={{
                    end: <Icons.Search width={'16px'} height={'16px'} />
                }}
                maxWidth="352px"
            />
        </HeaderWrapper>
    );
};

export default Header;
