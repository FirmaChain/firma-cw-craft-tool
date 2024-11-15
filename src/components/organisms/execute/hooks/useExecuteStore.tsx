import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';
import { ContractInfo, Cw20Allowance, Cw20MarketingInfo, Cw20Minter, Cw20TokenInfo } from '@firmachain/firma-js';
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
    //? Contract exist
    contractExist: boolean | null;

    // Contract(Chain) Side Datas
    contractInfo: ContractInfo | null;
    tokenInfo: Cw20TokenInfo | null;
    minterInfo: Cw20Minter | null;
    marketingInfo: Cw20MarketingInfo | null;
    cw20Balance: string | null;
    // fctBalance: string | null;
    allowanceInfo: Cw20Allowance | null;

    setContractExist: (v: boolean) => void;

    setContractInfo: (v: ContractInfo) => void;
    setTokenInfo: (v: Cw20TokenInfo) => void;
    setMinterInfo: (v: Cw20Minter) => void;
    setMarketingInfo: (v: Cw20MarketingInfo) => void;
    setCw20Balance: (v: string) => void;
    // setFctBalance: (v: string) => void;
    setAllowanceInfo: (v: Cw20Allowance) => void;

    clearInfo: () => void;

    // Input(User) Side Datas
    isFetched: boolean;
    contractAddress: string | null;
    selectMenu: IMenuItem | null;
    mintingList: IWallet[] | null;
    burnAmount: string | null;
    burnFromList: IWallet[] | null;
    allowance: IAllowanceInfo | null;
    transferList: IWallet[] | null;
    transferFromList: ITransferInfo[] | null;
    marketingDescription: string | null;
    marketingAddress: string | null;
    marketingProject: string | null;
    minterAddress: string | null;
    marketingLogoUrl: string | null;
    allowanceByAddress: Record<string, string>;
    balanceByAddress: Record<string, string>;
    cw20BalanceByAddress: Record<string, string>;

    setIsFetched: (v: boolean) => void;
    setContractAddress: (v: string) => void;
    setSelectMenu: (v: IMenuItem) => void;
    setMinterList: (newList: IWallet[]) => void;
    setBurnAmount: (v: string) => void;
    setBurnFromList: (burnList: IWallet[]) => void;
    setAllowance: (allowanceInfo: IAllowanceInfo) => void;
    setTransferList: (transferList: IWallet[]) => void;
    setTransferFromList: (transferFromList: ITransferInfo[]) => void;
    setMarketingDescription: (v: string) => void;
    setMarketingAddress: (v: string) => void;
    setMarketingProject: (v: string) => void;
    setMinterAddress: (v: string) => void;
    setMarketingLogoUrl: (v: string) => void;
    setAllowanceByAddress: ({ address, amount }: { address: string; amount: string }) => void;
    setBalanceByAddress: ({ address, amount }: { address: string; amount: string }) => void;
    setCW20BalanceByAddress: ({ address, amount }: { address: string; amount: string }) => void;

    clearMinterList: () => void;
    clearBurn: () => void;
    clearBurnFrom: () => void;
    clearAllowance: () => void;
    clearTransfer: () => void;
    clearTransferFrom: () => void;
    clearMinter: () => void;
    clearLogoUrl: () => void;
    clearMarketing: () => void;
    clearAllowanceInfo: () => void;

    clearForm: () => void;
}

const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };
const INIT_TRANSFER_FROM_LIST: ITransferInfo[] = [
    { fromAddress: '', fromAmount: '', toAddress: '', toAmount: '', allowanceAmount: '', id: v4() }
];

const INIT_ADDRESS_AMOUNT: IWallet = { recipient: '', amount: '' };

const useExecuteStore = create<FormProps>()(
    immer((set) => ({
        contractExist: false,

        contractInfo: null,
        tokenInfo: null,
        minterInfo: null,
        marketingInfo: null,
        cw20Balance: null,
        // fctBalance: null,
        allowanceInfo: null,

        setContractExist: (data) =>
            set((state) => {
                state.contractExist = data;
            }),

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
        // setFctBalance: (data) =>
        //     set((state) => {
        //         state.fctBalance = data;
        //     }),
        setAllowanceInfo: (data) =>
            set((state) => {
                state.allowanceInfo = data;
            }),
        clearInfo: () =>
            set((state) => {
                state.contractInfo = null;
                state.tokenInfo = null;
                state.minterInfo = null;
                state.marketingInfo = null;
                state.cw20Balance = null;
                // state.fctBalance = null;
                state.allowanceInfo = null;
            }),
        isFetched: false,
        contractAddress: null,
        selectMenu: INIT_SELECT_MENU,
        mintingList: [{ ...INIT_ADDRESS_AMOUNT, id: v4() }],
        burnAmount: null,
        burnFromList: [{ ...INIT_ADDRESS_AMOUNT, id: v4() }],
        allowance: null,
        transferList: [{ ...INIT_ADDRESS_AMOUNT, id: v4() }],
        transferFromList: INIT_TRANSFER_FROM_LIST,
        marketingDescription: null,
        marketingAddress: null,
        marketingProject: null,
        minterAddress: null,
        marketingLogoUrl: null,
        allowanceByAddress: {},
        balanceByAddress: {},
        cw20BalanceByAddress: {},

        setIsFetched: (data) =>
            set((state) => {
                state.isFetched = data;
            }),
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
        setAllowance: (data) =>
            set((state) => {
                state.allowance = data;
            }),
        setTransferList: (data) =>
            set((state) => {
                state.transferList = data;
            }),
        setTransferFromList: (data) =>
            set((state) => {
                state.transferFromList = data;
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
        setAllowanceByAddress: (data) =>
            set((state) => {
                state.allowanceByAddress = { ...state.allowanceByAddress, [data.address]: data.amount };
            }),
        setBalanceByAddress: (data) =>
            set((state) => {
                state.balanceByAddress = { ...state.balanceByAddress, [data.address]: data.amount };
            }),
        setCW20BalanceByAddress: (data) =>
            set((state) => {
                state.cw20BalanceByAddress = { ...state.cw20BalanceByAddress, [data.address]: data.amount };
            }),
        clearMinterList: () =>
            set((state) => {
                state.mintingList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
            }),
        clearBurn: () =>
            set((state) => {
                state.burnAmount = null;
            }),
        clearBurnFrom: () =>
            set((state) => {
                state.burnFromList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
                state.allowanceByAddress = {};
            }),
        clearAllowance: () =>
            set((state) => {
                state.allowance = null;
            }),
        clearTransfer: () =>
            set((state) => {
                state.transferList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
            }),
        clearTransferFrom: () =>
            set((state) => {
                state.transferFromList = INIT_TRANSFER_FROM_LIST;
                state.allowanceByAddress = {};
                state.balanceByAddress = {};
            }),
        clearMinter: () =>
            set((state) => {
                state.minterAddress = null;
            }),
        clearLogoUrl: () =>
            set((state) => {
                state.marketingLogoUrl = null;
            }),
        clearMarketing: () =>
            set((state) => {
                state.marketingDescription = null;
                state.marketingAddress = null;
                state.marketingProject = null;
            }),
        clearAllowanceInfo: () =>
            set((state) => {
                state.allowanceInfo = null;
            }),

        clearForm: () => {
            set((state) => {
                state.contractExist = null;

                state.contractInfo = null;
                state.tokenInfo = null;
                state.minterInfo = null;
                state.marketingInfo = null;
                state.cw20Balance = null;
                // state.fctBalance = null;
                state.allowance = null;

                state.isFetched = false;
                state.contractAddress = null;
                state.selectMenu = INIT_SELECT_MENU;
                state.mintingList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
                state.burnAmount = null;
                state.burnFromList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
                state.allowance = null;
                state.transferList = [{ ...INIT_ADDRESS_AMOUNT, id: v4() }];
                state.transferFromList = INIT_TRANSFER_FROM_LIST;
                state.marketingDescription = null;
                state.marketingAddress = null;
                state.marketingProject = null;
                state.minterAddress = null;
                state.marketingLogoUrl = null;
                state.allowanceByAddress = {};
                state.balanceByAddress = {};
            });
        }
    }))
);

export default useExecuteStore;
