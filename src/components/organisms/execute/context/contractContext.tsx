import { createContext, useState, useContext, ReactNode } from 'react';
import { IWallet } from '../../../../interfaces/wallet';
import { IMenuItem } from '../cards/tokenInfo';

interface ContractContextProps {
    _contract: string;
    _selectMenu: IMenuItem;
    _isFetched: boolean;

    _walletList: IWallet[];
    _burnAmount: string;
    _marketingDescription: string;
    _marketingAddress: string;
    _marketingProject: string;

    _setContract: (value: string) => void;
    _setSelectMenu: (value: IMenuItem) => void;
    _setIsFetched:(value: boolean) => void;

    _setWalletList: (value: IWallet[]) => void;
    _setBurnAmount: (value: string) => void;
    _setMarketingDescription: (value: string) => void;
    _setMarketingAddress: (value: string) => void;
    _setMarketingProject: (value: string) => void;
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
    const [_contract, _setContract] = useState<string>("");
    const [_selectMenu, _setSelectMenu] = useState<IMenuItem>({ value: "", label: "" });
    const [_isFetched, _setIsFetched] = useState<boolean>(false);

    const [_walletList, _setWalletList] = useState<IWallet[]>([]);
    const [_burnAmount, _setBurnAmount] = useState<string>("");
    const [_marketingDescription, _setMarketingDescription] = useState<string>("");
    const [_marketingAddress, _setMarketingAddress] = useState<string>("");
    const [_marketingProject, _setMarketingProject] = useState<string>("");

    return (
        <ContractContext.Provider
            value={{
                _contract,
                _selectMenu,
                _isFetched,
                
                _walletList,
                _burnAmount,
                _marketingDescription,
                _marketingAddress,
                _marketingProject,

                _setContract,
                _setSelectMenu,
                _setIsFetched,
                
                _setWalletList,
                _setBurnAmount,
                _setMarketingDescription,
                _setMarketingAddress,
                _setMarketingProject,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
