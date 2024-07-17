import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';

export interface ITransferInfo {
    fromAddress: string;
    toAddress: string;
    amount: string;
    id: string;
}

interface FormProps {
    transferList: ITransferInfo[];
    setTransferList: (newList: ITransferInfo[]) => void;

    minterAddress: string;
    setMinterAddress: (v: string) => void;

    clearForm: () => void;
}

const INIT_TRANSFER_LIST: ITransferInfo[] = [{ fromAddress: '', toAddress: '', amount: '', id: v4() }];

const useExecuteStore = create<FormProps>()(
    immer((set) => ({
        transferList: INIT_TRANSFER_LIST,
        setTransferList: (data) =>
            set((state) => {
                state.transferList = data;
            }),
        minterAddress: '',
        setMinterAddress: (data) =>
            set((state) => {
                state.minterAddress = data;
            }),
        clearForm: () =>
            set((state) => {
                state.transferList = INIT_TRANSFER_LIST;
            })
    }))
);

export default useExecuteStore;
