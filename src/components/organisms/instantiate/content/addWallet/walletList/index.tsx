export {};

// import React, { useEffect, useState } from 'react';
// import { FirmaUtil } from '@firmachain/firma-js';
// import InputAddressAmount from '@/components/atoms/input/inputAddressAmount';
// import {
//     AddWalletCountWrapper,
//     AddWalletTypo,
//     AddWalletWrapper,
//     DeleteAllButton,
//     MaxWalletCountTypo,
//     NowWalletCountTypo,
//     TotalWalletTypo,
//     TotalWalletWrapper,
//     WalletCountWrapper,
//     WalletListSummery,
//     WalletListWrapper
// } from './style';
// import { IWallet } from '@/interfaces/wallet';
// import Icons from '@/components/atoms/icons';

// interface IProps {
//     decimals: string;
//     maxLength?: number;
//     onChangeWalletList: (walletList: IWallet[]) => void;
//     addressTitle: string;
//     addressPlaceholder: string;
//     amountTitle: string;
// }

// const WalletList = ({ decimals, maxLength = 20, onChangeWalletList }: IProps) => {
//     const [walletList, setWalletList] = useState<IWallet[]>([{ recipient: '', amount: '' }]);
//     const [validity, setValidity] = useState<boolean[]>([true]);

//     useEffect(() => {
//         if (walletList.length === 0) {
//             handleAddWallet();
//         }
//     }, [walletList]);

//     useEffect(() => {
//         onChangeWalletList(walletList);
//     }, [walletList, onChangeWalletList]);

//     const handleAddWallet = () => {
//         setWalletList([...walletList, { recipient: '', amount: '' }]);
//         setValidity([...validity, true]);
//     };

//     const handleRemoveWallet = (index: number) => {
//         if (walletList.length !== 1) {
//             const newWalletList = walletList.filter((_, i) => i !== index);
//             const newValidity = validity.filter((_, i) => i !== index);
//             setWalletList(newWalletList);
//             setValidity(newValidity);
//         }
//     };

//     const handleChange = (index: number, field: keyof IWallet, value: string) => {
//         const newWalletList = walletList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
//         setWalletList(newWalletList);

//         if (field === 'recipient') {
//             const isValid = validateAddress(value);
//             const newValidity = validity.map((valid, i) => (i === index ? isValid : valid));
//             setValidity(newValidity);
//         }
//     };

//     const validateAddress = (value: string): boolean => {
//         return FirmaUtil.isValidAddress(value);
//     };

//     const handleDeleteAll = () => {
//         setWalletList([{ recipient: '', amount: '' }]);
//         setValidity([true]);
//     };

//     return (
//         <WalletListWrapper>
//             <WalletListSummery>
//                 <TotalWalletWrapper>
//                     <TotalWalletTypo>Total Wallet</TotalWalletTypo>
//                     <WalletCountWrapper>
//                         <NowWalletCountTypo>{walletList.length}</NowWalletCountTypo>
//                         <MaxWalletCountTypo>/20</MaxWalletCountTypo>
//                     </WalletCountWrapper>
//                 </TotalWalletWrapper>
//                 <DeleteAllButton length={walletList.length} onClick={handleDeleteAll}>
//                     Delete All
//                 </DeleteAllButton>
//             </WalletListSummery>
//             {walletList.map((wallet, index) => (
//                 <InputAddressAmount
//                     key={index}
//                     index={index + 1}
//                     address={wallet.recipient}
//                     amount={wallet.amount}
//                     onChangeAddress={(value) => handleChange(index, 'recipient', value)}
//                     onChangeAmount={(value) => handleChange(index, 'amount', value)}
//                     onRemoveClick={() => handleRemoveWallet(index)}
//                     isLast={index === walletList.length - 1}
//                     isValid={validity[index]}
//                     decimals={decimals}
//                     addressTitle={''}
//                     addressPlaceholder={''}
//                     amountTitle={''}
//                 />
//             ))}
//             <AddWalletWrapper onClick={handleAddWallet}>
//                 <Icons.Add width={'16px'} height={'16px'} />
//                 <AddWalletTypo style={{ marginLeft: '2px' }}>Add</AddWalletTypo>
//                 <AddWalletCountWrapper>
//                     <AddWalletTypo>{'('}</AddWalletTypo>
//                     <AddWalletTypo>{walletList.length}</AddWalletTypo>
//                     <AddWalletTypo>{`/${maxLength})`}</AddWalletTypo>
//                 </AddWalletCountWrapper>
//             </AddWalletWrapper>
//         </WalletListWrapper>
//     );
// };

// export default React.memo(WalletList);
