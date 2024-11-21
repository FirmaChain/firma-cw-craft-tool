import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 } from 'uuid';
import { ContractInfo, Cw20Allowance, Cw20MarketingInfo, Cw20Minter, Cw20TokenInfo } from '@firmachain/firma-js';
import { IWallet } from '@/interfaces/wallet';
import { IMenuItem } from '@/interfaces/common';
import useWalletStore from '@/store/walletStore';

export interface ITransferInfo {
    fromAddress: string;
    fromAmount: string;
    toAddress: string;
    toAmount: string;
    allowanceAmount: string;
    id: string;
}

export interface IAllowanceInfo {
    address: string;
    amount: string;
    type: string;
    expire: string;
}

interface CW20ExecuteContextProps {
    contractExist: boolean | null;
    setContractExist: React.Dispatch<React.SetStateAction<boolean | null>>;
    contractInfo: ContractInfo | null;
    setContractInfo: React.Dispatch<React.SetStateAction<ContractInfo | null>>;
    tokenInfo: Cw20TokenInfo | null;
    setTokenInfo: React.Dispatch<React.SetStateAction<Cw20TokenInfo | null>>;
    minterInfo: Cw20Minter | null;
    setMinterInfo: React.Dispatch<React.SetStateAction<Cw20Minter | null>>;
    marketingInfo: Cw20MarketingInfo | null;
    setMarketingInfo: React.Dispatch<React.SetStateAction<Cw20MarketingInfo | null>>;
    cw20Balance: string | null;
    setCw20Balance: React.Dispatch<React.SetStateAction<string | null>>;
    allowanceInfo: Cw20Allowance | null;
    setAllowanceInfo: React.Dispatch<React.SetStateAction<Cw20Allowance | null>>;
    isFetched: boolean;
    setIsFetched: React.Dispatch<React.SetStateAction<boolean>>;
    contractAddress: string | null;
    setContractAddress: React.Dispatch<React.SetStateAction<string | null>>;
    selectMenu: IMenuItem | null;
    setSelectMenu: React.Dispatch<React.SetStateAction<IMenuItem | null>>;
    mintingList: IWallet[] | null;
    setMintingList: React.Dispatch<React.SetStateAction<IWallet[] | null>>;
    burnAmount: string | null;
    setBurnAmount: React.Dispatch<React.SetStateAction<string | null>>;
    burnFromList: IWallet[] | null;
    setBurnFromList: React.Dispatch<React.SetStateAction<IWallet[] | null>>;
    allowance: IAllowanceInfo | null;
    setAllowance: React.Dispatch<React.SetStateAction<IAllowanceInfo | null>>;
    transferList: IWallet[] | null;
    setTransferList: React.Dispatch<React.SetStateAction<IWallet[] | null>>;
    transferFromList: ITransferInfo[] | null;
    setTransferFromList: React.Dispatch<React.SetStateAction<ITransferInfo[] | null>>;
    marketingDescription: string | null;
    setMarketingDescription: React.Dispatch<React.SetStateAction<string | null>>;
    marketingAddress: string | null;
    setMarketingAddress: React.Dispatch<React.SetStateAction<string | null>>;
    marketingProject: string | null;
    setMarketingProject: React.Dispatch<React.SetStateAction<string | null>>;
    minterAddress: string | null;
    setMinterAddress: React.Dispatch<React.SetStateAction<string | null>>;
    marketingLogoUrl: string | null;
    setMarketingLogoUrl: React.Dispatch<React.SetStateAction<string | null>>;
    allowanceByAddress: Record<string, string>;
    setAllowanceByAddress: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    balanceByAddress: Record<string, string>;
    setBalanceByAddress: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    cw20BalanceByAddress: Record<string, string>;
    setCw20BalanceByAddress: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    clearInfo: () => void;
    clearForm: () => void;
    clearBurn: () => void;
    clearBurnFrom: () => void;
    clearAllowance: () => void;
    clearAllowanceInfo: () => void;
    setMinterList: (newList: IWallet[]) => void;
    clearMinterList: () => void;
    clearTransferFrom: () => void;
    clearTransfer: () => void;
    clearLogoUrl: () => void;
    clearMarketing: () => void;
    clearMinter: () => void;
}

const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };
const INIT_TRANSFER_FROM_LIST: ITransferInfo[] = [
    { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: v4() }
];

const INIT_ADDRESS_AMOUNT: IWallet = { recipient: '', amount: '' };

const CW20ExecuteContext = createContext<CW20ExecuteContextProps | undefined>(undefined);

export const CW20ExecuteProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useWalletStore();

    const [contractExist, setContractExist] = useState<boolean | null>(null);
    const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
    const [tokenInfo, setTokenInfo] = useState<Cw20TokenInfo | null>(null);
    const [minterInfo, setMinterInfo] = useState<Cw20Minter | null>(null);
    const [marketingInfo, setMarketingInfo] = useState<Cw20MarketingInfo | null>(null);
    const [cw20Balance, setCw20Balance] = useState<string | null>(null);
    const [allowanceInfo, setAllowanceInfo] = useState<Cw20Allowance | null>(null);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [contractAddress, setContractAddress] = useState<string | null>(null);
    const [selectMenu, setSelectMenu] = useState<IMenuItem | null>(INIT_SELECT_MENU);
    const [mintingList, setMintingList] = useState<IWallet[] | null>([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
    const [burnAmount, setBurnAmount] = useState<string | null>(null);
    const [burnFromList, setBurnFromList] = useState<IWallet[] | null>([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
    const [allowance, setAllowance] = useState<IAllowanceInfo | null>(null);
    const [transferList, setTransferList] = useState<IWallet[] | null>([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
    const [transferFromList, setTransferFromList] = useState<ITransferInfo[] | null>(INIT_TRANSFER_FROM_LIST);
    const [marketingDescription, setMarketingDescription] = useState<string | null>(null);
    const [marketingAddress, setMarketingAddress] = useState<string | null>(null);
    const [marketingProject, setMarketingProject] = useState<string | null>(null);
    const [minterAddress, setMinterAddress] = useState<string | null>(null);
    const [marketingLogoUrl, setMarketingLogoUrl] = useState<string | null>(null);
    const [allowanceByAddress, _setAllowanceByAddress] = useState<Record<string, string>>({});
    const [balanceByAddress, _setBalanceByAddress] = useState<Record<string, string>>({});
    const [cw20BalanceByAddress, _setCw20BalanceByAddress] = useState<Record<string, string>>({});

    const setAllowanceByAddress = ({ address, amount }: { address?: string; amount?: string }) => {
        if (!address && !amount) _setAllowanceByAddress({});
        else if (!address || !amount) return;
        else {
            _setAllowanceByAddress((prev) => ({
                ...prev,
                [address]: amount
            }));
        }
    };

    const setBalanceByAddress = ({ address, amount }: { address?: string; amount?: string }) => {
        if (!address && !amount) _setBalanceByAddress({});
        else if (!address || !amount) return;
        else {
            _setBalanceByAddress((prev) => ({
                ...prev,
                [address]: amount
            }));
        }
    };

    const setCw20BalanceByAddress = ({ address, amount }: { address?: string; amount?: string }) => {
        if (!address && !amount) _setCw20BalanceByAddress({});
        else if (!address || !amount) return;
        else {
            _setCw20BalanceByAddress((prev) => ({
                ...prev,
                [address]: amount
            }));
        }
    };

    const clearBurn = () => {
        setBurnAmount(null);
    };

    const clearBurnFrom = () => {
        setBurnFromList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
        setAllowanceByAddress({});
    };

    const clearAllowance = () => {
        setAllowance(null);
    };

    const clearAllowanceInfo = () => {
        setAllowanceInfo(null);
    };

    const setMinterList = (newList: IWallet[]) => {
        setMintingList(newList);
    };

    const clearMinterList = () => {
        setMinterList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
    };

    const clearTransferFrom = () => {
        setTransferFromList(INIT_TRANSFER_FROM_LIST);
        setAllowanceByAddress({});
        setBalanceByAddress({});
    };

    const clearTransfer = () => {
        setTransferList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
    };

    const clearLogoUrl = () => {
        setMarketingLogoUrl(null);
    };

    const clearMinter = () => {
        setMinterAddress(null);
    };

    const clearMarketing = () => {
        setMarketingDescription(null);
        setMarketingAddress(null);
        setMarketingProject(null);
    };

    const clearInfo = () => {
        setContractInfo(null);
        setTokenInfo(null);
        setMinterInfo(null);
        setMarketingInfo(null);
        setCw20Balance(null);
        setAllowanceInfo(null);
    };

    const clearForm = () => {
        setContractExist(null);
        clearInfo();
        setIsFetched(false);
        setContractAddress(null);
        setSelectMenu(INIT_SELECT_MENU);
        setMintingList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
        setBurnAmount(null);
        setBurnFromList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
        setAllowance(null);
        setTransferList([{ ...INIT_ADDRESS_AMOUNT, id: v4() }]);
        setTransferFromList(INIT_TRANSFER_FROM_LIST);
        setMarketingDescription(null);
        setMarketingAddress(null);
        setMarketingProject(null);
        setMinterAddress(null);
        setMarketingLogoUrl(null);
        setAllowanceByAddress({});
        setBalanceByAddress({});
        setCw20BalanceByAddress({});
    };

    useEffect(() => {
        clearForm();
    }, [address]);

    return (
        <CW20ExecuteContext.Provider
            value={{
                contractExist,
                setContractExist,
                contractInfo,
                setContractInfo,
                tokenInfo,
                setTokenInfo,
                minterInfo,
                setMinterInfo,
                marketingInfo,
                setMarketingInfo,
                cw20Balance,
                setCw20Balance,
                allowanceInfo,
                setAllowanceInfo,
                isFetched,
                setIsFetched,
                contractAddress,
                setContractAddress,
                selectMenu,
                setSelectMenu,
                mintingList,
                setMintingList,
                burnAmount,
                setBurnAmount,
                burnFromList,
                setBurnFromList,
                allowance,
                setAllowance,
                transferList,
                setTransferList,
                transferFromList,
                setTransferFromList,
                marketingDescription,
                setMarketingDescription,
                marketingAddress,
                setMarketingAddress,
                marketingProject,
                setMarketingProject,
                minterAddress,
                setMinterAddress,
                marketingLogoUrl,
                setMarketingLogoUrl,
                allowanceByAddress,
                setAllowanceByAddress,
                balanceByAddress,
                setBalanceByAddress,
                cw20BalanceByAddress,
                setCw20BalanceByAddress,
                clearInfo,
                clearForm,
                clearBurn,
                clearBurnFrom,
                clearAllowance,
                clearAllowanceInfo,
                setMinterList,
                clearMinterList,
                clearTransferFrom,
                clearTransfer,
                clearLogoUrl,
                clearMarketing,
                clearMinter
            }}
        >
            {children}
        </CW20ExecuteContext.Provider>
    );
};

export const useCW20Execute = () => {
    const context = useContext(CW20ExecuteContext);
    if (!context) {
        throw new Error('useCW20Execute must be used within an CW20ExecuteProvider');
    }
    return context;
};
