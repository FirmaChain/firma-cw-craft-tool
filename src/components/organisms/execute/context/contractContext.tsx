import { createContext, useState, useContext, ReactNode } from 'react';
import { IWallet } from '../../../../interfaces/wallet';
import { IMenuItem } from '../cards/tokenInfo';

interface ContractContextProps {
    contract: string;
    selectMenu: IMenuItem;
    walletList: IWallet[];
    isFetched: boolean;

    setContract: (value: string) => void;
    setSelectMenu: (value: IMenuItem) => void;
    setWalletList: (value: IWallet[]) => void;
    setIsFetched:(value: boolean) => void;
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
    const [contract, setContract] = useState<string>('');
    const [selectMenu, setSelectMenu] = useState<IMenuItem>({ value: '', label: '' });
    const [walletList, setWalletList] = useState<IWallet[]>([]);
    const [isFetched, setIsFetched] = useState<boolean>(false);

    return (
        <ContractContext.Provider
            value={{
                contract,
                selectMenu,
                walletList,
                isFetched,

                setContract,
                setSelectMenu,
                setWalletList,
                setIsFetched,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
