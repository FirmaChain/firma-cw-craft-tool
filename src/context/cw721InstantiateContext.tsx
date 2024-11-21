import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CW721InstantiateContextProps {
    nftName: string;
    setNftName: (v: string) => void;

    nftSymbol: string;
    setNftSymbol: (v: string) => void;

    admin: string;
    setAdmin: (v: string) => void;

    minter: string;
    setMinter: (v: string) => void;

    label: string;
    setLabel: (v: string) => void;

    clearForm: () => void;
}

const CW721InstantiateContext = createContext<CW721InstantiateContextProps | undefined>(undefined);

export const CW721InstantiateProvider = ({ children }: { children: ReactNode }) => {
    const [nftName, setNftName] = useState<string>('');
    const [nftSymbol, setNftSymbol] = useState<string>('');
    const [admin, setAdmin] = useState<string>('');
    const [minter, setMinter] = useState<string>('');
    const [label, setLabel] = useState<string>('');

    const clearForm = () => {
        setNftName('');
        setNftSymbol('');
        setAdmin('');
        setMinter('');
        setLabel('');
    };

    return (
        <CW721InstantiateContext.Provider
            value={{
                nftName,
                setNftName,
                nftSymbol,
                setNftSymbol,
                admin,
                setAdmin,
                minter,
                setMinter,
                label,
                setLabel,
                clearForm
            }}
        >
            {children}
        </CW721InstantiateContext.Provider>
    );
};

export const useCW721Instantiate = (): CW721InstantiateContextProps => {
    const context = useContext(CW721InstantiateContext);
    if (!context) {
        throw new Error('useCW721Instantiate must be used within an CW721InstantiateProvider');
    }
    return context;
};
