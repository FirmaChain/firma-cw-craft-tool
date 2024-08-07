import { rootState } from '@/redux/reducers';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export interface IContractInfo {
    contractAddress: string;
    name: string;
    symbol: string;
    totalNFTs: number;
    nftThumbnailURI: string[];
    label: string;
}

interface IContractState {
    contractAddress: string;
    info?: IContractInfo;
}

interface CW721NFTContractsContextProps {
    contracts: IContractState[] | null;
    addContracts: (list: string[]) => void;
    updateContractInfo: (info: IContractInfo) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    clearCW721NFTContractsData: () => void;
}

const CW721NFTContractsContext = createContext<CW721NFTContractsContextProps | undefined>(undefined);

export const useCW721NFTContractsContext = () => {
    const context = useContext(CW721NFTContractsContext);
    if (!context) {
        throw new Error('useCW721NFTContractsContext must be used within a CW721NFTContractsProvider');
    }
    return context;
};

export const CW721NFTContractsProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const { address } = useSelector((state: rootState) => state.wallet);

    const [contracts, setContracts] = useState<IContractState[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const addContracts = (newContracts: string[]) => {
        if (contracts === null || newContracts.length < contracts.length) {
            setContracts(newContracts.map(address => ({ contractAddress: address })))
        } else {
            const uniqueNewContracts = newContracts.filter(contract => !contracts.some(c => c.contractAddress === contract));
            setContracts(prevContracts => [
                ...(Array.isArray(prevContracts) ? prevContracts : []),
                ...uniqueNewContracts.map(address => ({ contractAddress: address }))
            ]);
        }
    };

    const updateContractInfo = (info: IContractInfo) => {
        setContracts(prevContracts =>
            prevContracts.map(contract =>
                contract.contractAddress === info.contractAddress ? { ...contract, info } : contract
            )
        );
    };

    useEffect(() => {
        if (!location.pathname.includes('mynft')) {
            setCurrentPage(1);
        }
    }, [location]);

    const clearCW721NFTContractsData = () => {
        setContracts(null);
        setCurrentPage(1);
    }

    useEffect(() => {
        clearCW721NFTContractsData();
    }, [address])

    return (
        <CW721NFTContractsContext.Provider
            value={{
                contracts,
                addContracts,
                updateContractInfo,
                currentPage,
                setCurrentPage,
                clearCW721NFTContractsData
            }}
        >
            {children}
        </CW721NFTContractsContext.Provider>
    );
};

