import { useState } from 'react';
import Icons from '@/components/atoms/icons';
import { useContractContext } from '../context/contractContext';
import { isValidAddress } from '@/utils/common';
import { enqueueSnackbar } from 'notistack';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

const SearchButton = styled(IconButton)`
    //? outside
    width: 168px;
    height: 40px;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    //? inside
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    flex-shrink: 0;
    background: ${({ disabled }) => (disabled ? 'var(--Gray-600, #707070)' : 'var(--Green-500, #02e191)')};

    //? button text
    .button-text {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-100, #121212)')};
        text-align: center;
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
    }
`;

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
            <SearchButton disabled={keyword === '' || disableSearch} onClick={onClickSearch}>
                <span className="button-text">Search</span>
            </SearchButton>
        </div>
    );
};

const SearchContract = () => {
    const [keyword, setKeyword] = useState<string>('');

    const { _setContract } = useContractContext();

    const onClickSearch = () => {
        const valid = isValidAddress(keyword);
        if (valid) {
            _setContract(keyword);
        } else {
            enqueueSnackbar(`Invalid contract address.`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
    };

    const onClickClear = () => {
        setKeyword('');
        _setContract('');
    };

    return (
        <SearchInputWithButton2
            placeHolder={'Search CW20 contract address'}
            value={keyword}
            onChange={(v) => setKeyword(v)}
            adornment={{
                end: (
                    <EndAdornment
                        keyword={keyword}
                        disableSearch={!isValidAddress(keyword)}
                        onClickSearch={onClickSearch}
                        onClickClear={onClickClear}
                    />
                )
            }}
        />
    );
};

export default SearchContract;
