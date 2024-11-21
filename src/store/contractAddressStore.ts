import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Props {
    cw20: string;
    cw721: string;
    setCW20: (v: string) => void;
    setCW721: (v: string) => void;
}

const useContractAddressStore = create<Props>()(
    immer((set) => ({
        cw20: '',
        cw721: '',
        setCW20: (v) => {
            set((state) => {
                state.cw20 = v;
            });
        },
        setCW721: (v) => {
            set((state) => {
                state.cw721 = v;
            });
        }
    }))
);

export default useContractAddressStore;
