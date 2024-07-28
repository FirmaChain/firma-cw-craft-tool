import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';
import { ContractInfo, Cw20MarketingInfo, Cw20Minter, Cw20TokenInfo } from '@firmachain/firma-js';
import { IWallet } from '@/interfaces/wallet';
import { IMenuItem } from '../cards/tokenInfo';

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

interface FormProps {
    // Contract(Chain) Side Datas
    contractInfo: ContractInfo | null;
    tokenInfo: Cw20TokenInfo | null;
    minterInfo: Cw20Minter | null;
    marketingInfo: Cw20MarketingInfo | null;
    cw20Balance: string | null;
    fctBalance: string | null;

    setContractInfo: (v: ContractInfo) => void;
    setTokenInfo: (v: Cw20TokenInfo) => void;
    setMinterInfo: (v: Cw20Minter) => void;
    setMarketingInfo: (v: Cw20MarketingInfo) => void;
    setCw20Balance: (v: string) => void;
    setFctBalance: (v: string) => void;

    // Input(User) Side Datas
    contractAddress: string | null;
    selectMenu: IMenuItem | null;
    mintingList: IWallet[] | null;
    burnAmount: string | null;
    burnFromList: IWallet[] | null;
    transferList: IWallet[] | null;
    transferFromList: ITransferInfo[] | null;
    allowanceInfo: IAllowanceInfo | null;
    marketingDescription: string | null;
    marketingAddress: string | null;
    marketingProject: string | null;
    minterAddress: string | null;
    marketingLogoUrl: string;

    setContractAddress: (v: string) => void;
    setSelectMenu: (v: IMenuItem) => void;
    setMinterList: (newList: IWallet[]) => void;
    setBurnAmount: (v: string) => void;
    setBurnFromList: (burnList: IWallet[]) => void;
    setTransferList: (transferList: IWallet[]) => void;
    setTransferFromList: (transferFromList: ITransferInfo[]) => void;
    setAllowanceInfo: (allowanceInfo: IAllowanceInfo) => void;
    setMarketingDescription: (v: string) => void;
    setMarketingAddress: (v: string) => void;
    setMarketingProject: (v: string) => void;
    setMinterAddress: (v: string) => void;
    setMarketingLogoUrl: (v: string) => void;

    clearForm: () => void;
}

const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };
const INIT_TRANSFER_LIST: IWallet[] = [{ recipient: '', amount: '' }];
const INIT_TRANSFER_FROM_LIST: ITransferInfo[] = [
    { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: v4() }
];

const useExecuteStore = create<FormProps>()(
    immer((set) => ({
        contractInfo: null,
        tokenInfo: null,
        minterInfo: null,
        marketingInfo: null,
        cw20Balance: null,
        fctBalance: null,

        setContractInfo: (data) =>
            set((state) => {
                state.contractInfo = data;
            }),
        setTokenInfo: (data) =>
            set((state) => {
                state.tokenInfo = data;
            }),
        setMinterInfo: (data) =>
            set((state) => {
                state.minterInfo = data;
            }),
        setMarketingInfo: (data) =>
            set((state) => {
                state.marketingInfo = data;
            }),
        setCw20Balance: (data) =>
            set((state) => {
                state.cw20Balance = data;
            }),
        setFctBalance: (data) =>
            set((state) => {
                state.fctBalance = data;
            }),

        contractAddress: null,
        selectMenu: INIT_SELECT_MENU,
        mintingList: [],
        burnAmount: null,
        burnFromList: [],
        transferList: INIT_TRANSFER_LIST,
        transferFromList: INIT_TRANSFER_FROM_LIST,
        allowanceInfo: {
            address: '',
            amount: '',
            type: '',
            expire: ''
        },
        marketingDescription: null,
        marketingAddress: null,
        marketingProject: null,
        minterAddress: null,
        marketingLogoUrl: '',

        setContractAddress: (data) =>
            set((state) => {
                state.contractAddress = data;
            }),
        setSelectMenu: (data) =>
            set((state) => {
                state.selectMenu = data;
            }),
        setMinterList: (data) =>
            set((state) => {
                state.mintingList = data;
            }),
        setBurnAmount: (data) =>
            set((state) => {
                state.burnAmount = data;
            }),
        setBurnFromList: (data) =>
            set((state) => {
                state.burnFromList = data;
            }),
        setTransferList: (data) =>
            set((state) => {
                state.transferList = data;
            }),
        setTransferFromList: (data) =>
            set((state) => {
                state.transferFromList = data;
            }),
        setAllowanceInfo: (data) =>
            set((state) => {
                state.allowanceInfo = data;
            }),
        setMarketingDescription: (data) =>
            set((state) => {
                state.marketingDescription = data;
            }),
        setMarketingAddress: (data) =>
            set((state) => {
                state.marketingAddress = data;
            }),
        setMarketingProject: (data) =>
            set((state) => {
                state.marketingProject = data;
            }),
        setMinterAddress: (data) =>
            set((state) => {
                state.minterAddress = data;
            }),
        setMarketingLogoUrl: (data) =>
            set((state) => {
                state.marketingLogoUrl = data;
            }),

        clearForm: () =>
            set((state) => {
                state.transferList = INIT_TRANSFER_LIST;
            })
    }))
);

export default useExecuteStore;
