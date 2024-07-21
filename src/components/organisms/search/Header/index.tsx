import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useSearchStore from '../searchStore';
import React from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
import useSearchActions from '../action';

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
                <Icons.Search width="28px" height="28px" fill={disableSearch ? '' : '#E6E6E6'} stroke={disableSearch ? '' : '#E6E6E6'} />
            </IconButton>
        </div>
    );
};

const Header = () => {
    const keyword = useSearchStore((state) => state.keyword);
    const setKeyword = useSearchStore((state) => state.setKeyword);

    const { searchTokenInfo } = useSearchActions();

    return (
        <HeaderWrap>
            <HeaderBox>
                <Title>Search</Title>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Input contract address'}
                    onChange={(v) => setKeyword(v)}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={() => setKeyword('')}
                                onClickSearch={() => searchTokenInfo(keyword)}
                                disableSearch={!FirmaUtil.isValidAddress(keyword)}
                            />
                        )
                    }}
                />
            </HeaderBox>
        </HeaderWrap>
    );
};

export default React.memo(Header);
