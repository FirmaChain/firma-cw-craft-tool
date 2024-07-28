import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IContractInfo {
    contractAddress: string;
    tokenLogoUrl: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply: string;
    decimals: number;
}

interface IContractState {
    contractAddress: string;
    info?: IContractInfo;
}

interface CW20MyTokenContextProps {
    contracts: IContractState[] | null;
    addContracts: (list: string[]) => void;
    updateContractInfo: (info: IContractInfo) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const CW20MyTokenContext = createContext<CW20MyTokenContextProps | undefined>(undefined);

export const useCW20MyTokenContext = () => {
    const context = useContext(CW20MyTokenContext);
    if (!context) {
        throw new Error('useContractContext must be used within a ContractProvider');
    }
    return context;
};

export const CW20MyTokenProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const [contracts, setContracts] = useState<IContractState[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const addContracts = (newContracts: string[]) => {
        if (contracts === null) {
            setContracts(newContracts.map(address => ({ contractAddress: address })))
        } else {
            const uniqueNewContracts = newContracts.filter(contract => !contracts.some(c => c.contractAddress === contract));
            setContracts(prevContracts => [
                ...prevContracts,
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
        if (!location.pathname.includes('mytoken')) {
            setCurrentPage(1);
        }
    }, [location]);

    return (
        <CW20MyTokenContext.Provider
            value={{
                contracts,
                addContracts,
                updateContractInfo,
                currentPage,
                setCurrentPage
            }}
        >
            {children}
        </CW20MyTokenContext.Provider>
    );
};

