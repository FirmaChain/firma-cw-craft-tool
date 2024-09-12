import { CRAFT_CONFIGS } from '@/config';
import { FirmaSDK } from '@firmachain/firma-js';
import { createContext, useContext, ReactNode } from 'react';

interface FirmaSDKContextProps {
    firmaSDK: FirmaSDK;
}

const FirmaSDKContext = createContext<FirmaSDKContextProps | undefined>(undefined);

export const useFirmaSDKContext = () => {
    const context = useContext(FirmaSDKContext);
    if (!context) {
        throw new Error('useFirmaSDKContext must be used within a FirmaSDKProvider');
    }
    return context;
};

export const FirmaSDKProvider = ({ children }: { children: ReactNode }) => {
    const FIRMA_SDK = new FirmaSDK(CRAFT_CONFIGS.FIRMACHAIN_CONFIG);

    return (
        <FirmaSDKContext.Provider
            value={{
                firmaSDK: FIRMA_SDK
            }}
        >
            {children}
        </FirmaSDKContext.Provider>
    );
};
