import { useEffect, useRef, useState } from 'react';
import Icons from '@/components/atoms/icons';
import { enqueueSnackbar } from 'notistack';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import IconButton from '@/components/atoms/buttons/iconButton';

import useExecuteStore from '../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useNavigate } from 'react-router-dom';
import { isValidAddress } from '@/utils/address';

const EndAdornment = ({
    keyword,
    showClearButton,
    // disableSearch = false,
    // onClickSearch,
    onClickClear
}: {
    keyword: string;
    showClearButton?: boolean;
    // disableSearch?: boolean;
    // onClickSearch: () => void;
    onClickClear: () => void;
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {showClearButton && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            {/* <IconButton style={{ padding: 0, display: 'flex' }} disabled={disableSearch} onClick={onClickSearch}>
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

interface ISearchContractProps {
    contractAddress: string;
}

const SearchContract = ({ contractAddress }: ISearchContractProps) => {
    const navigate = useNavigate();

    const setContractAddress = useExecuteStore((state) => state.setContractAddress);
    const clearForm = useExecuteStore((state) => state.clearForm);
    const clearInfo = useExecuteStore((state) => state.clearInfo);
    const network = useSelector((v: rootState) => v.global.network);
    const contractInfo = useExecuteStore((v) => v.contractInfo);

    const storeContractAddress = useExecuteStore((v) => v.contractAddress);

    const previousKeywordRef = useRef<string | null>(null);
    const [keyword, setKeyword] = useState<string>(contractAddress);

    useEffect(() => {
        previousKeywordRef.current = keyword;
    }, [contractAddress]);

    const onClickSearch = () => {
        if (keyword.length === 0 || previousKeywordRef.current === keyword) return;
        const valid = isValidAddress(keyword) && keyword.length > 44;

        if (valid) {
            //? fix: once search and try again with same address -> info will be gone and error occur
            if (contractInfo?.address !== keyword) {
                clearInfo();
                clearForm();
            }

            console.log('keyword', keyword);

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
        clearInfo();
        clearForm();
        previousKeywordRef.current = null;
        navigate('/execute', { replace: true });
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

    useEffect(() => {
        if (keyword.length > 44 && isValidAddress(keyword)) onClickSearch();
    }, [keyword]);

    return (
        <SearchInputWithButton2
            placeHolder={'Search CW20 contract address'}
            value={keyword}
            onChange={(v) => setKeyword(v)}
            // onClickEvent={onClickSearch}
            adornment={{
                end: (
                    <EndAdornment
                        keyword={keyword}
                        // disableSearch={keyword.length === 0 || !isValidAddress(keyword)}
                        // onClickSearch={onClickSearch}
                        onClickClear={onClickClear}
                        showClearButton={Boolean(keyword?.length > 0 || storeContractAddress?.length > 0)}
                    />
                )
            }}
        />
    );
};

export default SearchContract;
