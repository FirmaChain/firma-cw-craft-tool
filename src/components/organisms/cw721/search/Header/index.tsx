import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useCW721SearchStore from '../cw721SearchStore';
import React from 'react';
import useCW721SearchActions from '../action';

const EndAdornment = ({
    keyword,
    clearKeyword,
    disableSearch,
    onClickSearch
}: {
    keyword: string;
    clearKeyword: () => void;
    disableSearch?: boolean;
    onClickSearch: () => void;
}) => {
    const disableEventBubbling = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }} onClick={disableEventBubbling}>
            {keyword.length > 0 && (
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={clearKeyword}>
                    <Icons.CloseIcon width="32px" height="32px" strokeWidth="2.6" stroke="#1A1A1A" />
                </IconButton>
            )}

            <IconButton disabled={disableSearch} style={{ display: 'flex', padding: 0 }} onClick={onClickSearch}>
                <Icons.Search
                    width="28px"
                    height="28px"
                    fill={disableSearch ? '#807E7E' : '#E6E6E6'}
                    stroke={disableSearch ? '#807E7E' : '#E6E6E6'}
                />
            </IconButton>
        </div>
    );
};

const Header = () => {
    const keyword = useCW721SearchStore((state) => state.keyword);
    const setKeyword = useCW721SearchStore((state) => state.setKeyword);
    const clearAll = useCW721SearchStore((state) => state.clearAll);
    const clearSearchInfo = useCW721SearchStore((state) => state.clearSearchInfo);

    const { checkContractExist, clearSearchKeywordRef } = useCW721SearchActions();

    const disableSearch = keyword.length === 0;

    const onClickClearKeyword = () => {
        setKeyword('');
        clearSearchInfo();
        clearAll();
        clearSearchKeywordRef();
    };

    const onClickSearch = () => {
        checkContractExist(keyword);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <Title>Search</Title>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Search CW721 Contract Address'}
                    onChange={(v) => setKeyword(v)}
                    onClickEvent={disableSearch ? () => null : onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={onClickClearKeyword}
                                onClickSearch={onClickSearch}
                                disableSearch={disableSearch}
                            />
                        )
                    }}
                />
            </HeaderWrap>
        </HeaderBox>
    );
};

export default React.memo(Header);
