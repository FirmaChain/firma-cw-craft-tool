import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ITransaction } from '@/interfaces/cw20';
import { ContractHistoryInfo, ContractInfo, Cw721ContractInfo, Cw721Expires } from '@firmachain/firma-js';

interface CW721Owner {
    owner: string | null;
    pending_owner: string | null;
    pending_expiry: Cw721Expires | null;
}

interface FormProps {
    keyword: string;
    setKeyword: (v: string) => void;

    contractExist: Boolean | null;
    setContractExist: (v: Boolean | null) => void;

    nftInfo: Cw721ContractInfo | null;
    setNftInfo: (v: Cw721ContractInfo) => void;

    contractInfo: ContractInfo | null;
    setContractInfo: (v: ContractInfo) => void;

    minterInfo: string | null;
    setMinterInfo: (v: string) => void;

    ownerInfo: CW721Owner | null;
    setOwnerInfo: (v: CW721Owner) => void;

    allNftIds: string[] | null;
    setAllNftIds: (v: string[]) => void;

    totalNfts: number | null;
    setTotalNfts: (v: number) => void;

    userNftIds: string[] | null;
    setUserNftIds: (v: string[]) => void;

    allTransactions: ITransaction[] | null;
    setAllTransactions: (v: ITransaction[]) => void;

    contractHistory: ContractHistoryInfo[] | null;
    setContractHistory: (v: ContractHistoryInfo[]) => void;

    clearSearchInfo: () => void;

    clearAll: () => void;
}

const CW721SearchContext = createContext<FormProps | undefined>(undefined);

export const CW721SearchProvider = ({ children }: { children: ReactNode }) => {
    const [keyword, setKeyword] = useState<string>('');
    const [contractExist, setContractExist] = useState<Boolean | null>(null);
    const [nftInfo, setNftInfo] = useState<Cw721ContractInfo | null>(null);
    const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
    const [minterInfo, setMinterInfo] = useState<string | null>(null);
    const [ownerInfo, setOwnerInfo] = useState<CW721Owner | null>(null);
    const [allNftIds, setAllNftIds] = useState<string[] | null>(null);
    const [totalNfts, setTotalNfts] = useState<number | null>(null);
    const [userNftIds, setUserNftIds] = useState<string[] | null>(null);
    const [allTransactions, setAllTransactions] = useState<ITransaction[] | null>(null);
    const [contractHistory, setContractHistory] = useState<ContractHistoryInfo[] | null>(null);

    const clearSearchInfo = () => {
        setNftInfo(null);
        setContractInfo(null);
        setMinterInfo(null);
        setOwnerInfo(null);
        setAllNftIds(null);
        setTotalNfts(null);
        setUserNftIds(null);
        setAllTransactions(null);
        setContractHistory(null);
    };

    const clearAll = () => {
        setKeyword('');
        setContractExist(null);
        clearSearchInfo();
    };

    return (
        <CW721SearchContext.Provider
            value={{
                keyword,
                setKeyword,
                contractExist,
                setContractExist,
                nftInfo,
                setNftInfo,
                contractInfo,
                setContractInfo,
                minterInfo,
                setMinterInfo,
                ownerInfo,
                setOwnerInfo,
                allNftIds,
                setAllNftIds,
                totalNfts,
                setTotalNfts,
                userNftIds,
                setUserNftIds,
                allTransactions,
                setAllTransactions,
                contractHistory,
                setContractHistory,
                clearSearchInfo,
                clearAll
            }}
        >
            {children}
        </CW721SearchContext.Provider>
    );
};

export const useCW721Search = () => {
    const context = useContext(CW721SearchContext);
    if (!context) {
        throw new Error('useCW721Search must be used within a CW721SearchProvider');
    }
    return context;
};
