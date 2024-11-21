import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CONTRACT_MODE_TYPE, CW_MODE_TYPE, CW_MODES, MENU_TYPE } from '@/constants/common';

interface IGlobalState {
    menu: MENU_TYPE;
    cwMode: CW_MODE_TYPE;
    contractMode: CONTRACT_MODE_TYPE;
    globalLoading: boolean;
    isFetchedBalance: boolean;
    handleCw: (payload: CW_MODE_TYPE) => void;
    handleMenu: (payload: MENU_TYPE) => void;
    handleMode: (payload: CONTRACT_MODE_TYPE) => void;
    handleGlobalLoading: (payload: boolean) => void;
    handleFetchedBalance: (payload: boolean) => void;
}

const useGlobalStore = create<IGlobalState>()(
    persist(
        immer((set) => ({
            menu: 'INSTANTAITE',
            cwMode: 'CW20',
            contractMode: 'BASIC',
            globalLoading: false,
            isFetchedBalance: false,
            handleCw: (payload) =>
                set((state) => {
                    state.cwMode = payload;
                }),
            handleMenu: (payload) =>
                set((state) => {
                    state.menu = payload;
                }),
            handleMode: (payload) =>
                set((state) => {
                    state.contractMode = payload;
                }),
            handleGlobalLoading: (payload) =>
                set((state) => {
                    state.globalLoading = payload;
                }),
            handleFetchedBalance: (payload) =>
                set((state) => {
                    state.isFetchedBalance = payload;
                })
        })),
        {
            name: 'firma-cw-craft-global',
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => key === 'cwMode')),
            onRehydrateStorage: (state) => {
                if (!CW_MODES.includes(state.cwMode)) {
                    state.cwMode = 'CW20';
                }
            }
        }
    )
);

export default useGlobalStore;
