import { useCallback, useState } from 'react';
import Icons from '../../../atoms/icons';
import SearchInputWithButton from '../../../atoms/input/searchInputWithButton';
import { useContractContext } from '../context/contractContext';
import { isValidAddress } from '../../../../utils/common';
import { enqueueSnackbar } from 'notistack';

const SearchContract = () => {
    const { setContract } = useContractContext();
    const [keyword, setKeyword] = useState<string>('');

    const onChangeSearchValue = (value: string) => {
        setKeyword(value);
    };

    const resetSearchValue = () => {
        setKeyword('');
        setContract('');
    };

    const onClickSearch = useCallback(() => {
        const valid = isValidAddress(keyword);
        if (valid) {
            setContract(keyword);
        } else {
            enqueueSnackbar(`Invalid contract address.`, {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
    }, [keyword]);

    return (
        <SearchInputWithButton
            sx={{
                width: '100%',
                color: '#FFF',
                fontFamily: 'General Sans Variable',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '22px'
            }}
            icon={<Icons.Search width={'16px'} height={'16px'} />}
            alwaysShowButton={false}
            placeholder={'Search CW20 contract address'}
            value={keyword}
            onChange={(value) => onChangeSearchValue(value)}
            onClickRemove={resetSearchValue}
            onClickSearch={onClickSearch}
        />
    );
};

export default SearchContract;
