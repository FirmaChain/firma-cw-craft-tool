import { ITransaction } from '@/interfaces/cw20';
import { ContractHistoryInfo, ContractInfo, Cw721ContractInfo, Cw721Expires } from '@firmachain/firma-js';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CW721Owner {
    owner: string | null;
    pending_owner: string | null;
    pending_expiry: Cw721Expires | null;
}

interface FormProps {
    keyword: string;
    setKeyword: (v: string) => void;

    contractExist: Boolean | null;
    setContractExist: (v: Boolean | null) => void;

    nftInfo: Cw721ContractInfo | null;
    setNftInfo: (v: Cw721ContractInfo) => void;

    contractInfo: ContractInfo | null;
    setContractInfo: (v: ContractInfo) => void;

    minterInfo: string | null;
    setMinterInfo: (v: string) => void;

    ownerInfo: CW721Owner | null;
    setOwnerInfo: (v: CW721Owner) => void;

    allNftIds: string[] | null;
    setAllNftIds: (v: string[]) => void;

    userNftIds: string[] | null;
    setUserNftIds: (v: string[]) => void;

    allTransactions: ITransaction[] | null;
    setAllTransactions: (v: ITransaction[]) => void;

    contractHistory: ContractHistoryInfo[] | null; //?
    setContractHistory: (v: ContractHistoryInfo[]) => void; //?

    clearSearchInfo: () => void;

    clearAll: () => void;
}

const useCW721SearchStore = create<FormProps>()(
    immer((set) => ({
        keyword: '',
        setKeyword: (data) => {
            set((state) => {
                state.keyword = data;
            });
        },
        contractExist: null,
        setContractExist: (data) => {
            set((state) => {
                state.contractExist = data;
            });
        },

        nftInfo: null,
        setNftInfo: (data) => {
            set((state) => {
                state.nftInfo = data;
            });
        },

        contractInfo: null,
        setContractInfo: (data) => {
            set((state) => {
                state.contractInfo = data;
            });
        },

        minterInfo: null,
        setMinterInfo: (data) => {
            set((state) => {
                state.minterInfo = data;
            });
        },

        ownerInfo: null,
        setOwnerInfo: (data) => {
            set((state) => {
                state.ownerInfo = data;
            });
        },

        allNftIds: null,
        setAllNftIds: (data) => {
            set((state) => {
                state.allNftIds = data;
            });
        },
        userNftIds: null,
        setUserNftIds: (data) => {
            set((state) => {
                state.userNftIds = data;
            });
        },

        contractHistory: null,
        setContractHistory: (data) => {
            set((state) => {
                state.contractHistory = data;
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
                state.nftInfo = null;
                state.contractInfo = null;
                state.minterInfo = null;
                state.ownerInfo = null;
                state.allNftIds = null;
                state.userNftIds = null;
                state.allTransactions = null;
                state.contractHistory = null;
            });
        },

        clearAll: () =>
            set((state) => {
                state.keyword = '';
                state.contractExist = null;
                state.nftInfo = null;
                state.contractInfo = null;
                state.minterInfo = null;
                state.ownerInfo = null;
                state.allNftIds = null;
                state.userNftIds = null;
                state.allTransactions = null;
                state.contractHistory = null;
            })
    }))
);

export default useCW721SearchStore;
