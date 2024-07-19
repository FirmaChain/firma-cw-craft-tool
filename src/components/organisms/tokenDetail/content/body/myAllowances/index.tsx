import {
    AllowanceCard,
    AllowanceWrapper,
    AllowanceCardHeaderTypo,
    AllowanceCardHeaderWrapper,
    AllowanceContentWrapper,
    ItemLabel
} from './style';

import { useMemo, useState } from 'react';
import Icons from '@/components/atoms/icons';
import { IAllowances, ISpenders } from '@/hooks/useTokenDetail';
import SearchInput2 from '@/components/atoms/input/searchInput';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import { getTokenStrFromUTokenStr, parseExpires } from '@/utils/common';

interface IProps {
    decimals: string;
    allAllowances: IAllowances[];
    allSpenders: ISpenders[];
}

const MyAllowances = ({ decimals, allAllowances, allSpenders }: IProps) => {
    const [keyword, setKeyword] = useState<string>('');

    const handleSearchAddress = (value: string) => {
        setKeyword(value);
    };

    const allowancesList = useMemo(() => {
        if (keyword === '') return allAllowances;
        else return allAllowances.filter((one) => one.Receiver.toLowerCase().includes(keyword.toLowerCase()));
    }, [allAllowances, keyword]);

    const receiverList = useMemo(() => {
        if (keyword === '') return allSpenders;
        else return allSpenders.filter((one) => one.Receiver.toLowerCase().includes(keyword.toLowerCase()));
    }, [allSpenders, keyword]);

    const columns: IColumn[] = [
        {
            id: 'Receiver',
            label: 'Receiver',
            renderCell: (id, row) => <Cell.WalletAddress address={row['Receiver']} />,
            width: '50%'
        },
        {
            id: 'Amount',
            label: 'Amount',
            renderCell: (id, row) => commaNumber(getTokenStrFromUTokenStr(row['Amount'], decimals)),
            width: '20%'
        },
        {
            id: 'Expires',
            label: 'Expires',
            renderCell: (id: string, row: any) => parseExpires(JSON.stringify(row['Expires'])),
            width: '30%'
        }
    ];

    return (
        <AllowanceCard>
            <AllowanceCardHeaderWrapper>
                <AllowanceCardHeaderTypo>My Allowances</AllowanceCardHeaderTypo>

                <SearchInput2
                    placeHolder={'Search Wallet Address'}
                    value={keyword}
                    onChange={handleSearchAddress}
                    adornment={{
                        end: <Icons.Search width={'15px'} height={'15px'} />
                    }}
                    maxWidth="564px"
                />
            </AllowanceCardHeaderWrapper>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Allowances to others</ItemLabel>
                    <StyledTable columns={columns} rows={allowancesList} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Received Allowances</ItemLabel>
                    <StyledTable columns={columns} rows={receiverList} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
        </AllowanceCard>
    );
};

export default MyAllowances;
