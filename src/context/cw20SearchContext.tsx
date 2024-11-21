import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ITransaction } from '@/interfaces/cw20';
import { ContractHistoryInfo, ContractInfo, Cw20MarketingInfo, Cw20Minter, Cw20TokenInfo } from '@firmachain/firma-js';
import useWalletStore from '@/store/walletStore';

interface FormProps {
    keyword: string;
    setKeyword: (v: string) => void;

    contractExist: Boolean | null;
    setContractExist: (v: Boolean | null) => void;

    contractInfo: ContractInfo | null;
    setContractInfo: (v: ContractInfo) => void;

    tokenInfo: Cw20TokenInfo | null;
    setTokenInfo: (v: Cw20TokenInfo) => void;

    minterInfo: Cw20Minter | null;
    setMinterInfo: (v: Cw20Minter) => void;

    marketingInfo: Cw20MarketingInfo | null;
    setMarketingInfo: (v: Cw20MarketingInfo) => void;

    userBalance: string | null;
    setUserBalance: (v: string) => void;

    contractHistory: ContractHistoryInfo[] | null;
    setContractHistory: (v: ContractHistoryInfo[]) => void;

    allAccounts: { address: string; balance: string }[] | null;
    setAllAccounts: (v: { address: string; balance: string }[]) => void;

    allTransactions: ITransaction[] | null;
    setAllTransactions: (v: ITransaction[]) => void;

    clearSearchInfo: () => void;

    clearAll: () => void;
}

const CW20SearchContext = createContext<FormProps | undefined>(undefined);

export const CW20SearchProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useWalletStore();

    const [keyword, setKeyword] = useState<string>('');
    const [contractExist, setContractExist] = useState<Boolean | null>(null);
    const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
    const [tokenInfo, setTokenInfo] = useState<Cw20TokenInfo | null>(null);
    const [minterInfo, setMinterInfo] = useState<Cw20Minter | null>(null);
    const [marketingInfo, setMarketingInfo] = useState<Cw20MarketingInfo | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [contractHistory, setContractHistory] = useState<ContractHistoryInfo[] | null>(null);
    const [allAccounts, setAllAccounts] = useState<{ address: string; balance: string }[] | null>(null);
    const [allTransactions, setAllTransactions] = useState<ITransaction[] | null>(null);

    const clearSearchInfo = () => {
        setContractInfo(null);
        setTokenInfo(null);
        setMinterInfo(null);
        setMarketingInfo(null);
    };

    const clearAll = () => {
        setKeyword('');
        setContractExist(null);
        clearSearchInfo();
        setUserBalance(null);
        setContractHistory(null);
        setAllAccounts(null);
        setAllTransactions(null);
    };

    useEffect(() => {
        clearAll();
    }, [address]);

    return (
        <CW20SearchContext.Provider
            value={{
                keyword,
                setKeyword,
                contractExist,
                setContractExist,
                contractInfo,
                setContractInfo,
                tokenInfo,
                setTokenInfo,
                minterInfo,
                setMinterInfo,
                marketingInfo,
                setMarketingInfo,
                userBalance,
                setUserBalance,
                contractHistory,
                setContractHistory,
                allAccounts,
                setAllAccounts,
                allTransactions,
                setAllTransactions,
                clearSearchInfo,
                clearAll
            }}
        >
            {children}
        </CW20SearchContext.Provider>
    );
};

export const useCW20Search = () => {
    const context = useContext(CW20SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
