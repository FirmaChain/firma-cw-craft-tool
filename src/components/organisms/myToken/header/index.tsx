import { ChangeEvent, useState } from 'react';
// import SearchInput from '../../../atoms/input/searchInput';
import { HeaderTitle, HeaderWrapper } from './style';
import Icons from '../../../atoms/icons';
import SearchInput2 from '@/components/atoms/input/searchInput2';

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
                    start: <Icons.Search width={'16px'} height={'16px'} />
                }}
                maxWidth="309px"
                // icon={<Icons.Search width={'16px'} height={'16px'} />}
                // sx={{
                //     width: '309px'
                // }}
            />
        </HeaderWrapper>
    );
};

export default Header;
