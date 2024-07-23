import { ITokenDetailState } from '@/hooks/useTokenDetail';
import { ITransaction } from '@/interfaces/cw20';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface _ITokenDetailState extends ITokenDetailState {
    contractAddress: string;
    codeId: string;
}

interface FormProps {
    tokenDetail: _ITokenDetailState | null;
    setTokenDetail: (v: _ITokenDetailState) => void;

    transactions: ITransaction[] | null;
    setTransactions: (v: ITransaction[]) => void;

    clearForm: () => void;
}

const useTokenDetailStore = create<FormProps>()(
    immer((set) => ({
        tokenDetail: null,
        setTokenDetail: (data) =>
            set((state) => {
                state.tokenDetail = data;
            }),

        transactions: null,
        setTransactions: (data) =>
            set((state) => {
                state.transactions = data;
            }),

        clearForm: () =>
            set((state) => {
                state.tokenDetail = null;

                state.transactions = null;
            })
    }))
);

export default useTokenDetailStore;
