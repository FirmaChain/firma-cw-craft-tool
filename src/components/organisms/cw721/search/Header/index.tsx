import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import useCW721SearchStore from '../cw721SearchStore';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useCW721SearchActions from '../action';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import { GlobalActions } from '@/redux/actions';
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
    const { address } = useSelector((state: rootState) => state.wallet);
    const [keyword, setKeyword] = useState<string>('');
    const prevKeyword = useRef<string | null>(null)

    const disableSearch = keyword.length === 0;

    const { setContractDetail, setNftsInfo, setOwnedNftsInfo, setTransactions, clearForm } = useNFTContractDetailStore();
    const { checkExistContract, getNFTContractDetail, getNFTsInfo, getOwnedNFTsInfo, getNFTContractTransactions } = useNFTContractDetail();

    const getRequiredInfo = useCallback(async () => {
        try {
            if (prevKeyword.current === null || prevKeyword.current !== keyword) {
                const exist = await checkExistContract(keyword);

                if (exist) {
                    GlobalActions.handleGlobalLoading(true);
                    const detail = await getNFTContractDetail(keyword);
                    const nfts = await getNFTsInfo(keyword);
                    const ownedNfts = await getOwnedNFTsInfo(keyword, address)
                    const txData = await getNFTContractTransactions(keyword);

                    setContractDetail(detail);
                    setNftsInfo(nfts);
                    setOwnedNftsInfo(ownedNfts);
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
        }
    }, [])

    useEffect(() => {
        onClickClearKeyword();
    }, [address])

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
