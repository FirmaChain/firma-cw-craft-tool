import { useMemo, useState } from 'react';

import { AllAccountsCard, AllAccountsCardHeaderTypo, AllAccountsCardWrapper, AllAccountsContentWrapper } from './style';
import Icons from '@/components/atoms/icons';
import SearchInput2 from '@/components/atoms/input/searchInput';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import IconButton from '@/components/atoms/buttons/iconButton';
import { compareStringNumbers } from '@/utils/balance';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';

const AllAccounts = () => {
    const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
    const accounts = useTokenDetailStore((state) => state.tokenDetail?.allAccounts);
    const symbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);

    const [keyword, setKeyword] = useState<string>('');

    const columns: IColumn[] = [
        {
            id: 'Wallet Address',
            label: 'Wallet Address',
            renderCell: (id, row) => <Cell.WalletAddress address={row['Wallet Address']} />,
            width: '60%',
            minWidth: '450px'
        },
        {
            id: 'Balance',
            label: 'Balance',
            renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
            width: '40%',
            minWidth: '200px'
        }
    ];

    const rows = useMemo(() => {
        if (!accounts || accounts?.length === 0) return [];

        let result = accounts.filter((one) => BigInt(one['Balance']) > BigInt(0));

        if (keyword.length > 0) result = result.filter((one) => one['Wallet Address'].toLowerCase().includes(keyword.toLowerCase()));

        return result.sort((a, b) => {
            return compareStringNumbers(b.Balance, a.Balance);
        });
    }, [accounts, keyword]);

    return (
        <AllAccountsCard>
            <AllAccountsCardWrapper>
                <AllAccountsCardHeaderTypo>All Accounts</AllAccountsCardHeaderTypo>
                <SearchInput2
                    placeHolder={'Search by CW20 Wallet Address'}
                    value={keyword}
                    onChange={(v) => setKeyword(v.replace(WALLET_ADDRESS_REGEX, ''))}
                    adornment={{
                        end: (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                {keyword.length > 0 && (
                                    <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => setKeyword('')}>
                                        <Icons.CloseIcon width="18px" height="18px" />
                                    </IconButton>
                                )}
                                {/* <Icons.Search width={'15px'} height={'15px'} /> */}
                            </div>
                        )
                    }}
                    maxWidth="564px"
                />
            </AllAccountsCardWrapper>
            <AllAccountsContentWrapper>
                <StyledTable columns={columns} rows={rows || []} isLoading={!accounts} />
            </AllAccountsContentWrapper>
        </AllAccountsCard>
    );
};

export default AllAccounts;
