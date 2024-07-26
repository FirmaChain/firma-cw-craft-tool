import { ITransaction } from '@/interfaces/cw20';
import { ContractHistoryInfo, ContractInfo, Cw20MarketingInfo, Cw20Minter, Cw20TokenInfo } from '@firmachain/firma-js';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FormProps {
    keyword: string;
    setKeyword: (v: string) => void;

    contractInfo: ContractInfo | null;
    setContractInfo: (v: ContractInfo) => void;

    tokenInfo: Cw20TokenInfo | null;
    setTokenInfo: (v: Cw20TokenInfo) => void;

    minterInfo: Cw20Minter | null;
    setMinterInfo: (v: Cw20Minter) => void;

    marketingInfo: Cw20MarketingInfo | null;
    setMarketingInfo: (v: Cw20MarketingInfo) => void;

    userBalance: string | null;
    setUserBalance: (v: string) => void;

    contractHistory: ContractHistoryInfo[] | null;
    setContractHistory: (v: ContractHistoryInfo[]) => void;

    allAccounts: { address: string; balance: string }[] | null;
    setAllAccounts: (v: { address: string; balance: string }[]) => void;

    allTransactions: ITransaction[] | null;
    setAllTransactions: (v: ITransaction[]) => void;

    clearSearchInfo: () => void;

    clearAll: () => void;
}

const useSearchStore = create<FormProps>()(
    immer((set) => ({
        keyword: '',
        setKeyword: (data) => {
            set((state) => {
                state.keyword = data;
            });
        },

        contractInfo: null,
        setContractInfo: (data) => {
            set((state) => {
                state.contractInfo = data;
            });
        },

        tokenInfo: null,
        setTokenInfo: (data) => {
            set((state) => {
                state.tokenInfo = data;
            });
        },

        minterInfo: null,
        setMinterInfo: (data) => {
            set((state) => {
                state.minterInfo = data;
            });
        },

        marketingInfo: null,
        setMarketingInfo: (data) => {
            set((state) => {
                state.marketingInfo = data;
            });
        },

        userBalance: null,
        setUserBalance: (data) => {
            set((state) => {
                state.userBalance = data;
            });
        },

        contractHistory: null,
        setContractHistory: (data) => {
            set((state) => {
                state.contractHistory = data;
            });
        },

        allAccounts: null,
        setAllAccounts: (data) => {
            set((state) => {
                state.allAccounts = data;
            });
        },

        allTransactions: null,
        setAllTransactions: (data) => {
            set((state) => {
                state.allTransactions = data;
            });
        },

        clearSearchInfo: () => {
            set((state) => {
                state.contractInfo = null;
                state.tokenInfo = null;
                state.minterInfo = null;
                state.marketingInfo = null;
            });
        },

        clearAll: () =>
            set((state) => {
                state.keyword = '';
                state.contractInfo = null;
                state.tokenInfo = null;
                state.minterInfo = null;
                state.marketingInfo = null;
                state.userBalance = null;
                state.contractHistory = null;
                state.allAccounts = null;
                state.allTransactions = null;
            })
    }))
);

export default useSearchStore;
