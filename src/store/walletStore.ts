// @Dev
// zustand will import wallet data, stored by redux using 'merge' method automatically.
// wheather wallet is imported or not, 'persist:root' (redux persist store) will be removed.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const STORE_NAME = 'firma-cw-craft-wallet';
const STORE_VERSION = 0;

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
            version: STORE_VERSION,
            name: STORE_NAME,
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['fctBalance'].includes(key))), //? remove fct balance info
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

                // Force save wallet data to localstorage
                // when wallet data copied from persist:root, the data is not saved to localstorage at the same time
                // so force save current data with this line
                localStorage.setItem(
                    STORE_NAME,
                    JSON.stringify({
                        state: Object.fromEntries(Object.entries(currentState).filter(([key]) => !['fctBalance'].includes(key))),
                        version: STORE_VERSION
                    })
                );

                return currentState;
            }
        }
    )
);

export default useWalletStore;
