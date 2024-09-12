import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useSearchStore from '../searchStore';
import React, { useEffect } from 'react';
import useSearchActions from '../action';
import { isValidAddress } from '@/utils/address';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';

const EndAdornment = ({
    keyword,
    clearKeyword,
    showClearButton
    // disableSearch
    // onClickSearch
}: {
    keyword: string;
    clearKeyword: () => void;
    showClearButton?: boolean;
    // disableSearch?: boolean;
    // onClickSearch: () => void;
}) => {
    const disableEventBubbling = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }} onClick={disableEventBubbling}>
            {showClearButton && (
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={clearKeyword}>
                    <Icons.CloseIcon width="32px" height="32px" strokeWidth="2.6" stroke="#1A1A1A" />
                </IconButton>
            )}

            {/* <IconButton disabled={disableSearch} style={{ display: 'flex', padding: 0 }} onClick={onClickSearch}>
                <Icons.Search
                    width="28px"
                    height="28px"
                    fill={disableSearch ? '#807E7E' : '#E6E6E6'}
                    stroke={disableSearch ? '#807E7E' : '#E6E6E6'}
                />
            </IconButton> */}
        </div>
    );
};

const Header = () => {
    const keyword = useSearchStore((state) => state.keyword);
    const setKeyword = useSearchStore((state) => state.setKeyword);
    const clearAll = useSearchStore((state) => state.clearAll);
    const clearSearchInfo = useSearchStore((state) => state.clearSearchInfo);
    const storeContractInfo = useSearchStore((v) => v.contractInfo);

    const { checkContractExist, clearSearchKeywordRef } = useSearchActions();

    const onClickClearKeyword = () => {
        setKeyword('');
        clearSearchInfo();
        clearAll();
        clearSearchKeywordRef();
    };

    useEffect(() => {
        if (keyword.length > 44 && isValidAddress(keyword)) checkContractExist(keyword);
    }, [keyword]);

    return (
        <HeaderBox>
            <HeaderWrap>
                <Title>Search</Title>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Search by the full CW20 Contract Address'}
                    onChange={(v) => setKeyword(v.replace(WALLET_ADDRESS_REGEX, ''))}
                    // onClickEvent={disableSearch ? () => null : onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={onClickClearKeyword}
                                showClearButton={Boolean(keyword?.length > 0 || storeContractInfo !== null)}
                                // onClickSearch={onClickSearch}
                                // disableSearch={disableSearch}
                            />
                        )
                    }}
                />
            </HeaderWrap>
        </HeaderBox>
    );
};

export default React.memo(Header);
