import { useMemo, useState } from 'react';

import { AllAccountsCard, AllAccountsCardHeaderTypo, AllAccountsCardWrapper, AllAccountsContentWrapper } from './style';
import Icons from '@/components/atoms/icons';
import SearchInput2 from '@/components/atoms/input/searchInput';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { getTokenStrFromUTokenStr } from '@/utils/common';
import useTokenDetailStore from '@/store/useTokenDetailStore';

const AllAccounts = () => {
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
    const accounts = useTokenDetailStore((state) => state.tokenDetail?.allAccounts) || [];

    const [keyword, setKeyword] = useState<string>('');

    const handleKeyword = (value: string) => {
        setKeyword(value);
    };

    const columns: IColumn[] = [
        {
            id: 'Wallet Address',
            label: 'Wallet Address',
            renderCell: (id, row) => <Cell.WalletAddress address={row['Wallet Address']} />,
            width: '60%'
        },
        {
            id: 'Balance',
            label: 'Balance',
            renderCell: (id, row) => commaNumber(getTokenStrFromUTokenStr(row['Balance'], decimals)),
            width: '40%'
        }
    ];

    const rows = useMemo(() => {
        if (keyword !== '') {
            return accounts.filter((one) => one['Wallet Address'].toLowerCase().includes(keyword));
        } else {
            return accounts;
        }
    }, [accounts, keyword]);

    return (
        <AllAccountsCard>
            <AllAccountsCardWrapper>
                <AllAccountsCardHeaderTypo>All Accounts</AllAccountsCardHeaderTypo>
                <SearchInput2
                    placeHolder={'Search Wallet Address'}
                    value={keyword}
                    onChange={handleKeyword}
                    adornment={{
                        end: <Icons.Search width={'15px'} height={'15px'} />
                    }}
                    maxWidth="564px"
                />
            </AllAccountsCardWrapper>
            <AllAccountsContentWrapper>
                <StyledTable columns={columns} rows={rows} />
            </AllAccountsContentWrapper>
        </AllAccountsCard>
    );
};

export default AllAccounts;
