import { ContractInfoFromDB } from '@/interfaces/common';

import useWalletStore from '@/store/walletStore';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export interface IContractInfo {
    contractAddress: string;
    name: string;
    symbol: string;
    totalNFTs?: number;
    nftThumbnailURI: string[] | null;
    label: string;
}

interface IContractState {
    contractAddress: string;
    info?: IContractInfo;
}

interface ThumbnailInfo {
    totalNFTs?: number;
    thumbnails?: string[];
    reqUpdate?: boolean;
}

interface CW721NFTContractsContextProps {
    contracts: IContractState[] | null;
    addContracts: (list: ContractInfoFromDB[]) => void;
    updateContractInfo: (info: IContractInfo) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    clearCW721NFTContractsData: () => void;

    thumbnailInfo: Record<string, ThumbnailInfo>;
    updateThumbnailInfo: (address: string, info: ThumbnailInfo) => void;
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
    const { address } = useWalletStore();
    // const { address } = useSelector((state: rootState) => state.wallet);

    const [contracts, setContracts] = useState<IContractState[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [thumbnailInfo, setThumbnailInfo] = useState<Record<string, ThumbnailInfo>>({});

    const addContracts = (newContracts: ContractInfoFromDB[]) => {
        setContracts(
            newContracts.map((v) => ({
                contractAddress: v.contractAddress,
                info: {
                    ...v,
                    nftThumbnailURI: null
                }
            }))
        );
        // if (contracts === null || newContracts.length < contracts.length) {
        //     // setContracts(newContracts.map((address) => ({ contractAddress: address })));
        //     setContracts(
        //         newContracts.map((v) => ({
        //             contractAddress: v.contractAddress,
        //             info: {
        //                 ...v,
        //                 nftThumbnailURI: null
        //             }
        //         }))
        //     );
        // } else {
        //     const uniqueNewContracts = newContracts.filter(
        //         ({ contractAddress }) => !contracts.some((c) => c.contractAddress === contractAddress)
        //     );
        //     setContracts((prevContracts) => [
        //         ...(Array.isArray(prevContracts) ? prevContracts : []),
        //         ...uniqueNewContracts.map((v) => ({
        //             contractAddress: v.contractAddress,
        //             info: {
        //                 ...v,
        //                 nftThumbnailURI: null
        //             }
        //         }))
        //     ]);
        // }
    };

    const updateContractInfo = (info: IContractInfo) => {
        if (contracts === null) return;

        setContracts((prevContracts) => {
            return prevContracts.map((contract) => (contract.contractAddress === info.contractAddress ? { ...contract, info } : contract));
        });

        //  else {
        //     setContracts([info]);
        // }
    };

    const updateThumbnailInfo = (address: string, info: ThumbnailInfo) => {
        address = address.toLowerCase(); // do now allow uppercase address.

        const currentInfo = thumbnailInfo[address] || {};

        setThumbnailInfo((prev) => ({ ...prev, [address]: { ...currentInfo, ...info } }));
    };

    useEffect(() => {
        if (!location.pathname.includes('mynft')) {
            setCurrentPage(1);
        }
    }, [location]);

    const clearCW721NFTContractsData = () => {
        setContracts(null);
        setCurrentPage(1);
    };

    useEffect(() => {
        clearCW721NFTContractsData();
    }, [address]);

    return (
        <CW721NFTContractsContext.Provider
            value={{
                contracts,
                addContracts,
                updateContractInfo,
                currentPage,
                setCurrentPage,
                clearCW721NFTContractsData,
                thumbnailInfo,
                updateThumbnailInfo
            }}
        >
            {children}
        </CW721NFTContractsContext.Provider>
    );
};
