import { ContractInfoFromDB } from '@/interfaces/common';
import { rootState } from '@/redux/reducers';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface IContractInfo {
    contractAddress: string;
    tokenLogoUrl?: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply?: string;
    decimals?: number;
}

interface IContractState {
    contractAddress: string;
    info?: IContractInfo;
}

interface TokenAdditionalInfo {
    imageUrl?: string;
    totalSupply?: string;
    decimals?: number;
    reqUpdate?: boolean;
}

interface CW20MyTokenContextProps {
    contracts: IContractState[] | null;
    addContracts: (list: ContractInfoFromDB[]) => void;
    updateContractInfo: (info: IContractInfo) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    clearCW20MyTokenData: () => void;

    tokenAdditionalInfo: Record<string, TokenAdditionalInfo>;
    updateTokenAdditionalInfo: (address: string, info: TokenAdditionalInfo) => void;
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
    const { address } = useSelector((state: rootState) => state.wallet);

    const [contracts, setContracts] = useState<IContractState[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [tokenAdditionalInfo, setTokenAdditionalInfo] = useState<Record<string, TokenAdditionalInfo>>({});

    const addContracts = (newContracts: ContractInfoFromDB[]) => {
        // setContracts(newContracts.map((address) => ({ contractAddress: address })));

        setContracts(
            newContracts.map((v) => ({
                contractAddress: v.contractAddress,
                info: {
                    // ...v,
                    tokenSymbol: v.symbol,
                    tokenName: v.name,
                    contractAddress: v.contractAddress
                    // tokenLogoUrl: '',
                    // totalSupply: '',
                    // decimals: 0
                }
            }))
        );

        // if (contracts === null) {
        //     setContracts(newContracts.map((address) => ({ contractAddress: address })));
        // } else {
        //     const uniqueNewContracts = newContracts.filter((contract) => !contracts.some((c) => c.contractAddress === contract));
        //     setContracts((prevContracts) => [...prevContracts, ...uniqueNewContracts.map((address) => ({ contractAddress: address }))]);
        // }
    };

    const updateContractInfo = (info: IContractInfo) => {
        if (contracts !== null)
            setContracts((prevContracts) =>
                prevContracts.map((contract) => (contract.contractAddress === info.contractAddress ? { ...contract, info } : contract))
            );
        else {
            setContracts([info]);
        }
    };

    const updateTokenAdditionalInfo = (address: string, info: TokenAdditionalInfo) => {
        address = address.toLowerCase();

        const currentInfo = tokenAdditionalInfo[address] || {};

        setTokenAdditionalInfo((prev) => ({ ...prev, [address]: { ...currentInfo, ...info } }));
    };

    useEffect(() => {
        if (!location.pathname.includes('mytoken')) {
            setCurrentPage(1);
        }
    }, [location]);

    const clearCW20MyTokenData = () => {
        setContracts(null);
        setCurrentPage(1);
    };

    useEffect(() => {
        clearCW20MyTokenData();
    }, [address]);

    return (
        <CW20MyTokenContext.Provider
            value={{
                contracts,
                addContracts,
                updateContractInfo,
                currentPage,
                setCurrentPage,
                clearCW20MyTokenData,

                tokenAdditionalInfo,
                updateTokenAdditionalInfo
            }}
        >
            {children}
        </CW20MyTokenContext.Provider>
    );
};
