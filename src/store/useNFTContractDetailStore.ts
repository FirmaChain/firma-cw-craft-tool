import { INFTContractInfo } from '@/hooks/useNFTContractDetail';
import { ITransaction } from '@/interfaces/cw20';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';


interface FormProps {
    contractDetail: INFTContractInfo | null;
    setContractDetail: (v: INFTContractInfo) => void;

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

        transactions: null,
        setTransactions: (data) =>
            set((state) => {
                state.transactions = data;
            }),

        clearForm: () =>
            set((state) => {
                state.contractDetail = null;
                state.transactions = null;
            })
    }))
);

export default useNFTContractDetailStore;
