import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useSearchStore from '../searchStore';
import React from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
import useSearchActions from '../action';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

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
    const keyword = useSearchStore((state) => state.keyword);
    const setKeyword = useSearchStore((state) => state.setKeyword);
    const clearAll = useSearchStore((state) => state.clearAll);
    const clearSearchInfo = useSearchStore((state) => state.clearSearchInfo);
    
    const { checkContractExist, clearSearchKeywordRef } = useSearchActions();

    const disableSearch = Boolean(!FirmaUtil.isValidAddress(keyword) || keyword.length <= 44);

    const onClickClearKeyword = () => {
        setKeyword('');
        clearSearchInfo();
        clearAll();
        clearSearchKeywordRef();
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <Title>Search</Title>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Search by full CW20 Contract Address'}
                    onChange={(v) => setKeyword(v)}
                    onClickEvent={disableSearch ? () => null : () => checkContractExist(keyword)}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={() => onClickClearKeyword()}
                                onClickSearch={() => checkContractExist(keyword)}
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
