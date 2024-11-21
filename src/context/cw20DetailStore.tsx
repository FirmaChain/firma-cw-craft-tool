import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ITokenDetailState } from '@/hooks/useTokenDetail';
import { ITransaction } from '@/interfaces/cw20';
import useWalletStore from '@/store/walletStore';

interface _ITokenDetailState extends ITokenDetailState {
    contractAddress: string;
    codeId: string;
}

interface CW20DetailContextProps {
    tokenDetail: _ITokenDetailState | null;
    setTokenDetail: (v: _ITokenDetailState) => void;

    transactions: ITransaction[] | null;
    setTransactions: (v: ITransaction[]) => void;

    clearForm: () => void;
}

const CW20DetailContext = createContext<CW20DetailContextProps | undefined>(undefined);

export const CW20DetailProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useWalletStore();

    const [tokenDetail, setTokenDetail] = useState<_ITokenDetailState | null>(null);
    const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

    const clearForm = () => {
        setTokenDetail(null);
        setTransactions(null);
    };

    useEffect(() => {
        clearForm();
    }, [address]);

    return (
        <CW20DetailContext.Provider
            value={{
                tokenDetail,
                setTokenDetail,
                transactions,
                setTransactions,
                clearForm
            }}
        >
            {children}
        </CW20DetailContext.Provider>
    );
};

export const useCW20Detail = (): CW20DetailContextProps => {
    const context = useContext(CW20DetailContext);
    if (!context) {
        throw new Error('useCW20Detail must be used within a CW20DetailProvider');
    }
    return context;
};
