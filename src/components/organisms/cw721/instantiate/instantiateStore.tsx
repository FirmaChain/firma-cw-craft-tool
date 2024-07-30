import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FormProps {
    nftName: string;
    nftSymbol: string;
    admin: string;
    minter: string;
    label: string;
    setNftName: (v: string) => void;
    setNftSymbol: (v: string) => void;
    setAdmin: (v: string) => void;
    setMinter: (v: string) => void;
    setLabel: (v: string) => void;
}

const useInstantiateStore = create<FormProps>()(
    immer((set) => ({
        nftName: '',
        nftSymbol: '',
        admin: '',
        minter: '',
        label: '',

        setNftName: (v: string) => {
            set((state) => {
                state.nftName = v;
            })
        },
        setNftSymbol: (v: string) => {
            set((state) => {
                state.nftSymbol = v;
            })
        },
        setAdmin: (v: string) => {
            set((state) => {
                state.admin = v;
            })
        },
        setMinter: (v: string) => {
            set((state) => {
                state.minter = v;
            })
        },
        setLabel: (v: string) => {
            set((state) => {
                state.label = v;
            })
        },
    }))
);

export default useInstantiateStore;