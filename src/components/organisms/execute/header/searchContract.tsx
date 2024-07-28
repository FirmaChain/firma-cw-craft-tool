import { useState } from 'react';
import Icons from '@/components/atoms/icons';
import { isValidAddress } from '@/utils/common';
import { enqueueSnackbar } from 'notistack';
import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';
import useExecuteStore from '../hooks/useExecuteStore';
import useExecuteActions from '../action';
import { rootState } from '@/redux/reducers';
import { useSelector } from 'react-redux';

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
    const _disableSearch = keyword === '' || keyword.length <= 44 || disableSearch;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {keyword && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}
            {/* <SearchButton disabled={keyword === '' || keyword.length <= 44 || disableSearch} onClick={onClickSearch}>
                <span className="button-text">Search</span>
            </SearchButton> */}
            <IconButton style={{ padding: 0, display: 'flex' }} disabled={_disableSearch} onClick={onClickSearch}>
                <Icons.Search
                    width="32px"
                    height="32px"
                    fill={_disableSearch ? '#807E7E' : '#FFFFFF'}
                    stroke={_disableSearch ? '#807E7E' : '#FFFFFF'}
                />
            </IconButton>
        </div>
    );
};

const SearchContract = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const { setContractAddress } = useExecuteStore();
    const { setContractInfo, setTokenInfo, setMarketingInfo, setMinterInfo, setCw20Balance, setFctBalance } = useExecuteActions();

    const [keyword, setKeyword] = useState<string>('');

    const onClickSearch = () => {
        const valid = isValidAddress(keyword);
        if (valid) {
            setContractAddress(keyword);
            setContractInfo(keyword);
            setTokenInfo(keyword);
            setMarketingInfo(keyword);
            setMinterInfo(keyword);
            setCw20Balance(keyword, address);
            setFctBalance(address);
        } else {
            enqueueSnackbar(`Invalid contract address.`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
    };

    const onClickClear = () => {
        setKeyword('');
        setContractAddress(null);
    };

    return (
        <SearchInputWithButton2
            placeHolder={'Search CW20 contract address'}
            value={keyword}
            onChange={(v) => setKeyword(v)}
            onClickEvent={onClickSearch}
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
