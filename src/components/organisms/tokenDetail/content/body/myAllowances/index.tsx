export {};

// import {
//     AllowanceCard,
//     AllowanceWrapper,
//     AllowanceCardHeaderTypo,
//     AllowanceCardHeaderWrapper,
//     AllowanceContentWrapper,
//     ItemLabel
// } from './style';

// import { useMemo, useState } from 'react';
// import Icons from '@/components/atoms/icons';
// import SearchInput2 from '@/components/atoms/input/searchInput';
// import StyledTable, { IColumn } from '@/components/atoms/table';
// import Cell from '@/components/atoms/table/cells';
// import { parseExpires } from '@/utils/common';
// import useTokenDetailStore from '@/store/useTokenDetailStore';
// import IconButton from '@/components/atoms/buttons/iconButton';

// const MyAllowances = () => {
//     const decimals = useTokenDetailStore((state) => state.tokenDetail?.decimals) || '';
//     const allowances = useTokenDetailStore((state) => state.tokenDetail?.allAllowances);
//     const spenders = useTokenDetailStore((state) => state.tokenDetail?.allSpenders);
//     const symbol = useTokenDetailStore((state) => state.tokenDetail?.tokenSymbol);

//     const [keyword, setKeyword] = useState<string>('');

//     const handleSearchAddress = (value: string) => {
//         setKeyword(value);
//     };

//     const allowancesList = useMemo(() => {
//         if (keyword === '') return allowances;
//         else return allowances.filter((one) => one.Spender.toLowerCase().includes(keyword.toLowerCase()));
//     }, [allowances, keyword]);

//     const receiverList = useMemo(() => {
//         if (keyword === '') return spenders;
//         else return spenders.filter((one) => one.Spender.toLowerCase().includes(keyword.toLowerCase()));
//     }, [spenders, keyword]);

//     const columns: IColumn[] = [
//         {
//             id: 'Spender',
//             label: 'Receiver',
//             renderCell: (id, row) => <Cell.WalletAddress address={row['Spender']} />,
//             width: '50%',
//             minWidth: '450px'
//         },
//         {
//             id: 'Amount',
//             label: 'Amount',
//             renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
//             width: '20%',
//             minWidth: '200px'
//         },
//         {
//             id: 'Expires',
//             label: 'Expires',
//             renderCell: (id: string, row: any) => parseExpires(JSON.stringify(row['Expires'])),
//             width: '30%',
//             minWidth: '200px'
//         }
//     ];

//     return (
//         <AllowanceCard>
//             <AllowanceCardHeaderWrapper>
//                 <AllowanceCardHeaderTypo>My Allowances</AllowanceCardHeaderTypo>

//                 <SearchInput2
//                     placeHolder={'Search Wallet Address'}
//                     value={keyword}
//                     onChange={handleSearchAddress}
//                     adornment={{
//                         end: (
//                             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
//                                 {keyword.length > 0 && (
//                                     <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => setKeyword('')}>
//                                         <Icons.CloseIcon width="18px" height="18px" />
//                                     </IconButton>
//                                 )}
//                                 <Icons.Search width={'15px'} height={'15px'} />
//                             </div>
//                         )
//                     }}
//                     maxWidth="564px"
//                 />
//             </AllowanceCardHeaderWrapper>
//             <AllowanceWrapper>
//                 <AllowanceContentWrapper>
//                     <ItemLabel>Allowances to others</ItemLabel>
//                     <StyledTable columns={columns} rows={allowancesList || []} isLoading={!allowancesList} />
//                 </AllowanceContentWrapper>
//             </AllowanceWrapper>
//             <AllowanceWrapper>
//                 <AllowanceContentWrapper>
//                     <ItemLabel>Received Allowances</ItemLabel>
//                     <StyledTable columns={columns} rows={receiverList || []} isLoading={!receiverList} />
//                 </AllowanceContentWrapper>
//             </AllowanceWrapper>
//         </AllowanceCard>
//     );
// };

// export default MyAllowances;
