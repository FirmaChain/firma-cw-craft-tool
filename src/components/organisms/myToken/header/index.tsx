import { ChangeEvent, useState } from 'react';
import SearchInput from '../../../atoms/input/searchInput';
import { HeaderTitle, HeaderWrapper } from './style';
import Icons from '../../../atoms/icons';

const Header = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };

    return (
        <HeaderWrapper>
            <HeaderTitle>My Minted Tokens</HeaderTitle>
            <SearchInput
                placeholder={'Search Token Name, Token Symbols'}
                value={searchValue}
                onChange={onChangeSearchValue}
                icon={<Icons.Search width={'16px'} height={'16px'} />}
                sx={{
                    width: '309px'
                }}
            />
        </HeaderWrapper>
    );
};

export default Header;
