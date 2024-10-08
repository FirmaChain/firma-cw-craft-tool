import { IMG_NFT_EMPTY_THUMBNAIL } from '@/components/atoms/icons/pngIcons';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface INFTState {
    tokenId: string;
    image: string;
}

interface CW721OwnedNFTListContextProps {
    nfts: INFTState[];
    addNFTs: (newNFTs: string[], isDeploiedFromFirma: boolean) => void;
    updateNFTs: (newNft: INFTState) => void;
    fetchNFTImage: (nfts: string, contractAddress: string, isDeploiedFromFirma: boolean) => Promise<INFTState>;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    clearCW721NFTListData: () => void;
}

const CW721OwnedNFTListContext = createContext<CW721OwnedNFTListContextProps | undefined>(undefined);

export const useCW721OwnedNFTListContext = () => {
    const context = useContext(CW721OwnedNFTListContext);
    if (!context) {
        throw new Error('useCW721OwnedNFTListContext must be used within a CW721OwnedNFTListProvider');
    }
    return context;
};

export const CW721OwnedNFTListProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    const { getCW721NFTImage } = useMyNFTContracts();
    const [nfts, setNfts] = useState<INFTState[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchNFTImage = async (nft: string, contractAddress: string, isDeploiedFromFirma: boolean) => {
        let newNFT: INFTState = {
            tokenId: nft,
            image: ''
        };
        try {
            const image = await getCW721NFTImage({ contractAddress: contractAddress, tokenId: nft });
            if (isDeploiedFromFirma && image === '') {
                newNFT = { image: IMG_NFT_EMPTY_THUMBNAIL, tokenId: nft };
            } else {
                newNFT = { image: image, tokenId: nft };
            }
        } catch (error) {
            console.error(`Failed to fetch image for NFT ID: ${nft}`, error);
            newNFT = { image: IMG_NFT_EMPTY_THUMBNAIL, tokenId: nft };
        } finally {
            return newNFT;
        }
    };

    const addNFTs = (newNFTs: string[], isDeploiedFromFirma: boolean) => {
        try {
            if (nfts === null) {
                setNfts(newNFTs.map((nft) => ({ tokenId: nft, image: isDeploiedFromFirma ? '' : '' })));
            } else {
                const uniqueNewContracts = newNFTs.filter((nft) => !nfts.some((c) => c.tokenId === nft));
                setNfts((prev) => [
                    ...(Array.isArray(prev) ? prev : []),
                    ...uniqueNewContracts.map((nft) => ({ tokenId: nft, image: isDeploiedFromFirma ? '' : '' }))
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateNFTs = (newNft: INFTState) => {
        setNfts((prev) => prev.map((nft) => (nft.tokenId === newNft.tokenId ? { ...nft, image: newNft.image } : nft)));
    };

    useEffect(() => {
        if (!location.pathname.includes('mynft')) {
            setCurrentPage(1);
        }
    }, [location]);

    const clearCW721NFTListData = () => {
        setNfts([]);
        setCurrentPage(1);
    };

    return (
        <CW721OwnedNFTListContext.Provider
            value={{
                nfts,
                addNFTs,
                updateNFTs,
                fetchNFTImage,
                currentPage,
                setCurrentPage,
                clearCW721NFTListData
            }}
        >
            {children}
        </CW721OwnedNFTListContext.Provider>
    );
};
