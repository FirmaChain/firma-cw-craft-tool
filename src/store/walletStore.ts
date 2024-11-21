// @Dev
// zustand will import wallet data, stored by redux using 'merge' method automatically.
// wheather wallet is imported or not, 'persist:root' (redux persist store) will be removed.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IWalletStateProps {
    address: string;
    fctBalance: string;
    isInit: boolean;
    isStation: boolean;
    timeKey: string;
    timeKeyWallet: string;
    passwordWallet: string;

    handleAddress: (v: string) => void;
    handleFCTBalance: (v: string) => void;
    handleInit: (v: boolean) => void;
    handleStation: (v: boolean) => void;
    handleTimeKey: (v: string) => void;
    handleTimeKeyWallet: (v: string) => void;
    handlePasswordWallet: (v: string) => void;
    clearStore: () => void;
}

const useWalletStore = create<IWalletStateProps>()(
    persist(
        immer((set) => ({
            address: '',
            fctBalance: '',
            isInit: false,
            isStation: false,
            timeKey: '',
            timeKeyWallet: '',
            passwordWallet: '',

            handleAddress: (v: string) =>
                set((state) => {
                    state.address = v;
                }),
            handleFCTBalance: (v: string) =>
                set((state) => {
                    state.fctBalance = v;
                }),
            handleInit: (v: boolean) =>
                set((state) => {
                    state.isInit = v;
                }),
            handleStation: (v: boolean) =>
                set((state) => {
                    state.isStation = v;
                }),
            handleTimeKey: (v: string) =>
                set((state) => {
                    state.timeKey = v;
                }),
            handleTimeKeyWallet: (v: string) =>
                set((state) => {
                    state.timeKeyWallet = v;
                }),
            handlePasswordWallet: (v: string) =>
                set((state) => {
                    state.passwordWallet = v;
                }),
            clearStore: () =>
                set((state) => {
                    state.address = '';
                    state.fctBalance = '';
                    state.isInit = false;
                    state.isStation = false;
                    state.timeKey = '';
                    state.timeKeyWallet = '';
                    state.passwordWallet = '';
                })
        })),

        {
            name: 'firma-cw-craft-wallet',
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['balance'].includes(key.toLowerCase()))),
            merge: (persistedState, currentState: IWalletStateProps) => {
                // Migrate Redux store to Zustand Store
                // Run once when the page loads

                const reduxStore = localStorage.getItem('persist:root');

                try {
                    if (reduxStore) {
                        const wallet = JSON.parse(JSON.parse(reduxStore)?.wallet);

                        // Minimal validation: address and init state is set
                        if (typeof wallet?.address === 'string' && typeof wallet?.isInit) {
                            currentState.address = wallet?.address;

                            currentState = { ...currentState, ...wallet };
                        }
                    } else {
                        currentState = { ...currentState, ...(persistedState as IWalletStateProps) };
                    }
                } catch (error) {
                    // When restore failed
                    console.error('[Zustand] Failed to restore wallet information.');
                } finally {
                    // Remove persist:root data permanently
                    localStorage.removeItem('persist:root');
                }

                return currentState;
            }
        }
    )
);

export default useWalletStore;
