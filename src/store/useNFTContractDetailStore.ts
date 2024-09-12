import { INFTContractInfo, INFTsInfo } from '@/hooks/useNFTContractDetail';
import { ITransaction } from '@/interfaces/cw20';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FormProps {
    contractDetail: INFTContractInfo | null;
    setContractDetail: (v: INFTContractInfo) => void;

    nftsInfo: INFTsInfo | null;
    setNftsInfo: (v: INFTsInfo) => void;

    ownedNftsInfo: INFTsInfo | null;
    setOwnedNftsInfo: (v: INFTsInfo) => void;

    transactions: ITransaction[] | null;
    setTransactions: (v: ITransaction[]) => void;

    clearForm: () => void;
}

const useNFTContractDetailStore = create<FormProps>()(
    immer((set) => ({
        contractDetail: null,
        setContractDetail: (data) =>
            set((state) => {
                state.contractDetail = data;
            }),

        nftsInfo: null,
        setNftsInfo: (data) =>
            set((state) => {
                state.nftsInfo = data;
            }),

        ownedNftsInfo: null,
        setOwnedNftsInfo: (data) =>
            set((state) => {
                state.ownedNftsInfo = data;
            }),

        transactions: null,
        setTransactions: (data) =>
            set((state) => {
                state.transactions = data;
            }),

        clearForm: () =>
            set((state) => {
                state.contractDetail = null;
                state.transactions = null;
                state.nftsInfo = null;
                state.ownedNftsInfo = null;
            })
    }))
);

export default useNFTContractDetailStore;
