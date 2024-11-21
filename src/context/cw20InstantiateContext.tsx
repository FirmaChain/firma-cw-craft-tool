import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IWallet } from '@/interfaces/wallet';
import { v4 } from 'uuid';

export interface IWalletWithID extends IWallet {
    id?: string;
}

interface CW20InstantiateContextProps {
    tokenName: string;
    setTokenName: (v: string) => void;

    tokenSymbol: string;
    setTokenSymbol: (v: string) => void;

    tokenLogoUrl: string;
    setTokenLogoUrl: (v: string) => void;

    tokenDescription: string;
    setTokenDescription: (v: string) => void;

    minterCap: string;
    setMinterCap: (v: string) => void;

    walletList: IWalletWithID[];
    setWalletList: (v: IWalletWithID[]) => void;

    decimals: string;
    setDecimals: (v: string) => void;

    label: string;
    setLabel: (v: string) => void;

    marketingAddress: string;
    setMarketingAddress: (v: string) => void;

    marketingProject: string;
    setMarketingProject: (v: string) => void;

    minterAddress: string;
    setMinterAddress: (v: string) => void;

    totalSupply: string;
    setTotalSupply: (v: string) => void;

    walletCount: number;
    setWalletCount: (v: number) => void;

    minterble: boolean;
    setMinterble: (v: boolean) => void;

    clearForm: () => void;
}

const INIT_WALLET_INFO: IWalletWithID = { recipient: '', amount: '', id: v4() };

const CW20InstantiateContext = createContext<CW20InstantiateContextProps | undefined>(undefined);

export const CW20InstantiateProvider = ({ children }: { children: ReactNode }) => {
    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [tokenLogoUrl, setTokenLogoUrl] = useState<string>('');
    const [tokenDescription, setTokenDescription] = useState<string>('');
    const [minterCap, setMinterCap] = useState<string>('');
    const [walletList, setWalletList] = useState<IWalletWithID[]>([INIT_WALLET_INFO]);
    const [decimals, setDecimals] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const [marketingAddress, setMarketingAddress] = useState<string>('');
    const [marketingProject, setMarketingProject] = useState<string>('');
    const [minterAddress, setMinterAddress] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');
    const [walletCount, setWalletCount] = useState<number>(0);
    const [minterble, setMinterble] = useState<boolean>(false);

    const clearForm = () => {
        setTokenName('');
        setTokenSymbol('');
        setTokenLogoUrl('');
        setTokenDescription('');
        setMinterCap('');
        setWalletList([INIT_WALLET_INFO]);
        setDecimals('');
        setLabel('');
        setMarketingAddress('');
        setMarketingProject('');
        setMinterAddress('');
        setTotalSupply('');
        setWalletCount(0);
        setMinterble(false);
    };

    return (
        <CW20InstantiateContext.Provider
            value={{
                tokenName,
                setTokenName,
                tokenSymbol,
                setTokenSymbol,
                tokenLogoUrl,
                setTokenLogoUrl,
                tokenDescription,
                setTokenDescription,
                minterCap,
                setMinterCap,
                walletList,
                setWalletList,
                decimals,
                setDecimals,
                label,
                setLabel,
                marketingAddress,
                setMarketingAddress,
                marketingProject,
                setMarketingProject,
                minterAddress,
                setMinterAddress,
                totalSupply,
                setTotalSupply,
                walletCount,
                setWalletCount,
                minterble,
                setMinterble,
                clearForm
            }}
        >
            {children}
        </CW20InstantiateContext.Provider>
    );
};

export const useCW20Instantiate = (): CW20InstantiateContextProps => {
    const context = useContext(CW20InstantiateContext);
    if (!context) {
        throw new Error('useCW20Instantiate must be used within an CW20InstantiateProvider');
    }
    return context;
};
