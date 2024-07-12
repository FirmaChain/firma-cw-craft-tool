import { createContext, useState, useContext, ReactNode } from 'react';
import { IWallet } from '../../../../interfaces/wallet';
import { IMenuItem } from '../cards/tokenInfo';

interface ContractContextProps {
    contract: string;
    selectMenu: IMenuItem;
    isFetched: boolean;

    walletList: IWallet[];
    burnAmount: string;

    setContract: (value: string) => void;
    setSelectMenu: (value: IMenuItem) => void;
    setIsFetched:(value: boolean) => void;

    setWalletList: (value: IWallet[]) => void;
    setBurnAmount: (value: string) => void;
}

const ContractContext = createContext<ContractContextProps | undefined>(undefined);

export const useContractContext = () => {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error('useContractContext must be used within a SearchProvider');
    }
    return context;
};

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const [contract, setContract] = useState<string>("");
    const [selectMenu, setSelectMenu] = useState<IMenuItem>({ value: "", label: "" });
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const [walletList, setWalletList] = useState<IWallet[]>([]);
    const [burnAmount, setBurnAmount] = useState<string>("");
    
    return (
        <ContractContext.Provider
            value={{
                contract,
                selectMenu,
                isFetched,
                
                setContract,
                setSelectMenu,
                setIsFetched,
                
                walletList,
                setWalletList,
                burnAmount,
                setBurnAmount,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
