import { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import Icons from '@/components/atoms/icons';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import IconButton from '@/components/atoms/buttons/iconButton';
// import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';
import { useNavigate } from 'react-router-dom';
import { isValidAddress } from '@/utils/address';
import { BYPASS_ALL, NORMAL_TEXT } from '@/constants/regex';
import { useCW721Execute } from '@/context/cw721ExecuteContext';

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
                <IconButton id="clear-all-button" style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} fill="#707070" />
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

    const context = useCW721Execute();
    const contractInfo = context.contractInfo;
    const storeContractAddress = context.contractAddress;
    const setContractAddress = context.setContractAddress;
    const clearInfo = context.clearInfo;
    const clearForm = context.clearForm;

    const previousKeywordRef = useRef<string | null>(null);
    const [keyword, setKeyword] = useState<string>(contractAddress);

    useEffect(() => {
        previousKeywordRef.current = keyword;
    }, [contractAddress]);

    const onClickSearch = (contractAddress: string) => {
        if (!isValidAddress(contractAddress) || previousKeywordRef.current?.toLowerCase() === contractAddress.toLowerCase()) return;

        const valid = isValidAddress(contractAddress) && contractAddress.length > 44;

        if (valid) {
            if (contractInfo?.address !== contractAddress) {
                clearInfo();
                clearForm();
            }

            setContractAddress(contractAddress);
        } else {
            enqueueSnackbar(`Invalid contract address.`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
        previousKeywordRef.current = contractAddress;
    };

    const onClickClear = () => {
        setKeyword('');
        setContractAddress(null);
        clearForm();
        clearInfo();
        previousKeywordRef.current = null;
        navigate('/cw721/execute', { replace: true });
    };

    useEffect(() => {
        return () => {
            setContractAddress(null);
        };
    }, []);

    // useEffect(() => {
    //     if (keyword.length > 44 && isValidAddress(keyword)) onClickSearch();
    // }, [keyword]);

    return (
        <SearchInputWithButton2
            // placeHolder={'Search by the full CW721 Contract Address'}
            placeHolder={'Search by NFT Contract Name / Symbol / Label / Address'}
            value={keyword}
            onChange={(v) => setKeyword(v)}
            adornment={{
                end: (
                    <EndAdornment
                        keyword={keyword}
                        showClearButton={Boolean(keyword?.length > 0 || storeContractAddress?.length > 0)}
                        onClickClear={onClickClear}
                    />
                )
            }}
            autoComplete
            autoCompleteType="cw721"
            onClickContract={(v) => onClickSearch(v)}
            usePinList
            regex={NORMAL_TEXT}
        />
    );
};

export default SearchContract;
