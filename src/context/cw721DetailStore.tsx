import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { INFTContractInfo, INFTsInfo } from '@/hooks/useNFTContractDetail';
import { ITransaction } from '@/interfaces/cw20';
import useWalletStore from '@/store/walletStore';

interface CW721DetailContextProps {
    contractDetail: INFTContractInfo | null;
    setContractDetail: (v: INFTContractInfo) => void;

    nftsInfo: INFTsInfo | null;
    setNftsInfo: (v: INFTsInfo) => void;

    ownedNftsInfo: INFTsInfo | null;
    setOwnedNftsInfo: (v: INFTsInfo) => void;

    transactions: ITransaction[] | null;
    setTransactions: (v: ITransaction[]) => void;

    clearForm: () => void;
}

const CW721DetailContext = createContext<CW721DetailContextProps | undefined>(undefined);

export const CW721DetailProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useWalletStore();

    const [contractDetail, setContractDetail] = useState<INFTContractInfo | null>(null);
    const [nftsInfo, setNftsInfo] = useState<INFTsInfo | null>(null);
    const [ownedNftsInfo, setOwnedNftsInfo] = useState<INFTsInfo | null>(null);
    const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

    const clearForm = () => {
        setContractDetail(null);
        setNftsInfo(null);
        setOwnedNftsInfo(null);
        setTransactions(null);
    };

    useEffect(() => {
        clearForm();
    }, [address]);

    return (
        <CW721DetailContext.Provider
            value={{
                contractDetail,
                setContractDetail,
                nftsInfo,
                setNftsInfo,
                ownedNftsInfo,
                setOwnedNftsInfo,
                transactions,
                setTransactions,
                clearForm
            }}
        >
            {children}
        </CW721DetailContext.Provider>
    );
};

export const useCW721Detail = (): CW721DetailContextProps => {
    const context = useContext(CW721DetailContext);
    if (!context) {
        throw new Error('useCW721Detail must be used within an CW721DetailProvider');
    }
    return context;
};
