import { createContext, useState, useContext, ReactNode } from "react";

interface ContractContextProps {
    contract: string;
    setContract: (keyword: string) => void;
}

const ContractContext = createContext<ContractContextProps | undefined>(undefined);

export const useContractContext = () => {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error("useContractContext must be used within a SearchProvider");
    }
    return context;
};

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const [contract, setContract] = useState<string>("");

    return <ContractContext.Provider value={{ contract, setContract }}>{children}</ContractContext.Provider>;
};
