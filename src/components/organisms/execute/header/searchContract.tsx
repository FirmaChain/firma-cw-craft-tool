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
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';

const EndAdornment = ({
    keyword,
    showClearButton,
    onClickClear
}: {
    keyword: string;
    showClearButton?: boolean;
    onClickClear: () => void;
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {showClearButton && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}
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
    const contractInfo = useExecuteStore((v) => v.contractInfo);

    const storeContractAddress = useExecuteStore((v) => v.contractAddress);

    const previousKeywordRef = useRef<string | null>(null);
    const [keyword, setKeyword] = useState<string>(contractAddress);

    useEffect(() => {
        previousKeywordRef.current = keyword;
    }, [contractAddress]);

    const onClickSearch = () => {
        if (!isValidAddress(keyword) || previousKeywordRef.current?.toLowerCase() === keyword.toLowerCase()) return;
        const valid = isValidAddress(keyword) && keyword.length > 44;

        if (valid) {
            //? fix: once search and try again with same address -> info will be gone and error occur
            if (contractInfo?.address.toLowerCase() !== keyword.toLowerCase()) {
                clearInfo();
                clearForm();
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
        if (keyword.length > 44 && isValidAddress(keyword)) onClickSearch();
    }, [keyword]);

    return (
        <SearchInputWithButton2
            placeHolder={'Search by the full CW20 Contract Address'}
            value={keyword}
            onChange={(v) => setKeyword(v.replace(WALLET_ADDRESS_REGEX, ''))}
            adornment={{
                end: (
                    <EndAdornment
                        keyword={keyword}
                        onClickClear={onClickClear}
                        showClearButton={Boolean(keyword?.length > 0 || storeContractAddress?.length > 0)}
                    />
                )
            }}
        />
    );
};

export default SearchContract;
