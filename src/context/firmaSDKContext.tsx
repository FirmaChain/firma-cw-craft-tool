import { CRAFT_CONFIGS } from '@/config';
import { rootState } from '@/redux/reducers';
import { FirmaSDK } from '@firmachain/firma-js';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface CW20MyTokenContextProps {
    firmaSDK: FirmaSDK;
}

const FirmaSDKContext = createContext<CW20MyTokenContextProps | undefined>(undefined);

export const useFirmaSDKContext = () => {
    const context = useContext(FirmaSDKContext);
    if (!context) {
        throw new Error('useFirmaSDKContext must be used within a FirmaSDKProvider');
    }
    return context;
};

export const FirmaSDKProvider = ({ children }: { children: ReactNode }) => {
    const network = useSelector((state: rootState) => state.global.network);

    const MAINNET_SDK = new FirmaSDK(CRAFT_CONFIGS.MAINNET.FIRMACHAIN_CONFIG);
    const TESTNET_SDK = new FirmaSDK(CRAFT_CONFIGS.TESTNET.FIRMACHAIN_CONFIG);
    const firmaSDK = network === 'MAINNET' ? MAINNET_SDK : TESTNET_SDK;

    return (
        <FirmaSDKContext.Provider
            value={{
                firmaSDK
            }}
        >
            {children}
        </FirmaSDKContext.Provider>
    );
};

