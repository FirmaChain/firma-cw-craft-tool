import { CRAFT_CONFIGS } from '@/config';
import { rootState } from '@/redux/reducers';
import { FirmaSDK } from '@firmachain/firma-js';
import { createContext, useContext, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

interface IScrollState {
    x: number;
    y: number;
}

interface ScrollContextProps {
    scroll: IScrollState;
    setScroll: (value: IScrollState) => void;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
    const [scroll, setScroll] = useState<IScrollState>({ x: 0, y: 0 });

    return (
        <ScrollContext.Provider
            value={{
                scroll,
                setScroll
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
};

