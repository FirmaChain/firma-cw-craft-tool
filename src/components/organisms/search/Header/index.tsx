import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useSearchStore from '../searchStore';
import React from 'react';
import useSearchActions from '../action';
import { BYPASS_ALL } from '@/constants/regex';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import ConnectWallet from '../../execute/header/connectWallet';

const EndAdornment = ({
    keyword,
    clearKeyword,
    showClearButton
}: {
    keyword: string;
    clearKeyword: () => void;
    showClearButton?: boolean;
}) => {
    const disableEventBubbling = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }} onClick={disableEventBubbling}>
            {showClearButton && (
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={clearKeyword}>
                    <Icons.XCircle width={'32px'} height={'32px'} fill="#707070" />
                </IconButton>
            )}
        </div>
    );
};

const Header = () => {
    const address = useSelector((v: rootState) => v.wallet.address);
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

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

    // useEffect(() => {
    //     if (keyword.length > 44 && isValidAddress(keyword)) checkContractExist(keyword);
    // }, [keyword]);

    return (
        <HeaderBox $hideBorder={!Boolean(address)}>
            <HeaderWrap>
                <Title>Search</Title>
                {isInit ? (
                    <SearchInputWithButton2
                        value={keyword}
                        // placeHolder={'Search by the full CW20 Contract Address'}
                        placeHolder={'Search by Token Name / Symbol / Label / Address'}
                        onChange={(v) => setKeyword(v)}
                        adornment={{
                            end: (
                                <EndAdornment
                                    keyword={keyword}
                                    clearKeyword={onClickClearKeyword}
                                    showClearButton={Boolean(keyword?.length > 0 || storeContractInfo !== null)}
                                />
                            )
                        }}
                        autoComplete={Boolean(address)}
                        onClickContract={(v) => checkContractExist(v)}
                        usePinList
                    />
                ) : (
                    <ConnectWallet />
                )}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default React.memo(Header);
