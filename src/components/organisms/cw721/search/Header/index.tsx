import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import { GlobalActions } from '@/redux/actions';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { isValidAddress } from '@/utils/address';

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
    const { address } = useSelector((state: rootState) => state.wallet);
    const [keyword, setKeyword] = useState<string>('');
    const prevKeyword = useRef<string | null>(null);

    const { contractDetail } = useNFTContractDetailStore();

    const { setContractDetail, setNftsInfo, setOwnedNftsInfo, setTransactions, clearForm } = useNFTContractDetailStore();
    const { checkExistContract, getNFTContractDetail, getNFTsInfo, getOwnedNFTsInfo, getNFTContractTransactions } = useNFTContractDetail();

    const getRequiredInfo = useCallback(async () => {
        GlobalActions.handleGlobalLoading(true);

        try {
            if (prevKeyword.current === null || prevKeyword.current !== keyword) {
                const exist = await checkExistContract(keyword);

                if (exist) {
                    clearForm();

                    const detail = await getNFTContractDetail(keyword);
                    setContractDetail(detail);

                    const nfts = await getNFTsInfo(keyword);
                    setNftsInfo(nfts);

                    if (address) {
                        const ownedNfts = await getOwnedNFTsInfo(keyword, address);
                        setOwnedNftsInfo(ownedNfts);
                    }

                    const txData = await getNFTContractTransactions(keyword);
                    setTransactions(txData.txData);
                } else {
                    prevKeyword.current = null;
                    clearForm();
                }
                prevKeyword.current = keyword;
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        } finally {
            GlobalActions.handleGlobalLoading(false);
        }
    }, [keyword, prevKeyword]);

    const onClickClearKeyword = () => {
        setKeyword('');
        prevKeyword.current = null;
        clearForm();
    };

    const onClickSearch = () => {
        getRequiredInfo();
    };

    useEffect(() => {
        return () => {
            onClickClearKeyword();
        };
    }, []);

    useEffect(() => {
        onClickClearKeyword();
    }, [address]);

    useEffect(() => {
        if (keyword.length > 44 && isValidAddress(keyword)) onClickSearch();
    }, [keyword]);

    return (
        <HeaderBox>
            <HeaderWrap>
                <Title>Search</Title>
                <SearchInputWithButton2
                    value={keyword}
                    placeHolder={'Search CW721 Contract Address'}
                    onChange={(v) => setKeyword(v)}
                    // onClickEvent={disableSearch ? () => null : onClickSearch}
                    adornment={{
                        end: (
                            <EndAdornment
                                keyword={keyword}
                                clearKeyword={onClickClearKeyword}
                                showClearButton={Boolean(keyword?.length > 0 || contractDetail !== null)}
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
