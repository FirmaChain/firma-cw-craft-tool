import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import { rootState } from '@/redux/reducers';

import Icons from '@/components/atoms/icons';
import { isValidAddress } from '@/utils/common';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import IconButton from '@/components/atoms/buttons/iconButton';

import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';

const EndAdornment = ({
    keyword,
    disableSearch = false,
    onClickSearch,
    onClickClear
}: {
    keyword: string;
    disableSearch?: boolean;
    onClickSearch: () => void;
    onClickClear: () => void;
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {keyword && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            <IconButton style={{ padding: 0, display: 'flex' }} disabled={disableSearch} onClick={onClickSearch}>
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

interface ISearchContractProps {
    contractAddress: string;
}

const SearchContract = ({ contractAddress }: ISearchContractProps) => {
    const network = useSelector((state: rootState) => state.global.network);
    
    const contractInfo = useCW721ExecuteStore((state) => state.contractInfo);
    const setContractAddress = useCW721ExecuteStore((state) => state.setContractAddress);
    const clearInfo = useCW721ExecuteStore((state) => state.clearInfo);
    const clearForm = useCW721ExecuteStore((state) => state.clearForm);

    const previousKeywordRef = useRef<string | null>(null);
    const [keyword, setKeyword] = useState<string>(contractAddress);

    useEffect(() => {
        previousKeywordRef.current = keyword;
    }, [contractAddress]);

    const onClickSearch = () => {
        if (keyword.length === 0 || previousKeywordRef.current === keyword) return;
        const valid = isValidAddress(keyword) && keyword.length > 44;

        if (valid) {
            if (contractInfo?.address !== keyword) {
                // clearInfo();
                // clearForm();
            }
            
            setContractAddress(keyword);
        } else {
            enqueueSnackbar(`Invalid contract address.`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
        previousKeywordRef.current = keyword;
    };

    const onClickClear = () => {
        setKeyword('');
        setContractAddress(null);
    };

    useEffect(() => {
        return () => {
            setContractAddress(null);
        };
    }, []);

    useEffect(() => {
        clearInfo();
        clearForm();
        previousKeywordRef.current = null;
    }, [network]);

    return (
        <SearchInputWithButton2
            placeHolder={'Search CW721 contract address'}
            value={keyword}
            onChange={(v) => setKeyword(v)}
            onClickEvent={onClickSearch}
            adornment={{
                end: (
                    <EndAdornment
                        keyword={keyword}
                        disableSearch={keyword.length === 0 || !isValidAddress(keyword)}
                        onClickSearch={onClickSearch}
                        onClickClear={onClickClear}
                    />
                )
            }}
        />
    );
};

export default SearchContract;
