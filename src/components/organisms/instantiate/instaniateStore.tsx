import { IWallet } from '@/interfaces/wallet';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';

export interface IWalletWithID extends IWallet {
    id?: string;
}

interface FormProps {
    tokenName: string;
    tokenSymbol: string;
    tokenLogoUrl: string;
    tokenDescription: string;
    minterCap: string;
    walletList: IWalletWithID[];
    decimals: string;
    label: string;
    marketingAddress: string;
    marketingProject: string;
    minterAddress: string;
    totalSupply: string;
    walletCount: number;
    minterble: boolean;
    setTokenName: (v: string) => void;
    setTokenSymbol: (v: string) => void;
    setTokenLogoUrl: (v: string) => void;
    setTokenDescription: (v: string) => void;
    setMinterCap: (v: string) => void;
    setWalletList: (v: IWallet[]) => void;
    setDecimals: (v: string) => void;
    setLabel: (v: string) => void;
    setMarketingAddress: (v: string) => void;
    setMarketingProject: (v: string) => void;
    setMinterAddress: (v: string) => void;
    setTotalSupply: (v: string) => void;
    setWalletCount: (v: number) => void;
    setMinterble: (v: boolean) => void;
    clearForm: () => void;
}

const INIT_WALLET_INFO: IWalletWithID = { recipient: '', amount: '', id: v4() };

const useInstantiateStore = create<FormProps>()(
    immer((set) => ({
        tokenName: '',
        tokenSymbol: '',
        tokenLogoUrl: '',
        tokenDescription: '',
        minterCap: '',
        walletList: [INIT_WALLET_INFO],
        decimals: '',
        label: '',
        marketingAddress: '',
        marketingProject: '',
        minterAddress: '',
        totalSupply: '',
        walletCount: 0,
        minterble: false,

        setTokenName: (value: string) => {
            set((state) => {
                state.tokenName = value;
            });
        },

        setTokenSymbol: (value: string) => {
            set((state) => {
                state.tokenSymbol = value;
            });
        },

        setTokenLogoUrl: (value: string) => {
            set((state) => {
                state.tokenLogoUrl = value;
            });
        },

        setTokenDescription: (value: string) => {
            set((state) => {
                state.tokenDescription = value;
            });
        },

        setMinterCap: (value: string) => {
            set((state) => {
                state.minterCap = value;
            });
        },

        setWalletList: (value: IWalletWithID[]) => {
            set((state) => {
                state.walletList = value;
            });
        },

        setDecimals: (value: string) => {
            set((state) => {
                state.decimals = value;
            });
        },

        setLabel: (value: string) => {
            set((state) => {
                state.label = value;
            });
        },

        setMarketingAddress: (value: string) => {
            set((state) => {
                state.marketingAddress = value;
            });
        },

        setMarketingProject: (value: string) => {
            set((state) => {
                state.marketingProject = value;
            });
        },

        setMinterAddress: (value: string) => {
            set((state) => {
                state.minterAddress = value;
            });
        },

        setTotalSupply: (value: string) => {
            set((state) => {
                state.totalSupply = value;
            });
        },

        setWalletCount: (value: number) => {
            set((state) => {
                state.walletCount = value;
            });
        },

        setMinterble: (value: boolean) => {
            set((state) => {
                state.minterble = value;
            });
        },
        clearForm: () =>
            set((state) => {
                state.tokenName = '';
                state.tokenSymbol = '';
                state.tokenLogoUrl = '';
                state.tokenDescription = '';
                state.minterCap = '';
                state.walletList = [INIT_WALLET_INFO];
                state.decimals = '';
                state.label = '';
                state.marketingAddress = '';
                state.marketingProject = '';
                state.minterAddress = '';
                state.totalSupply = '';
                state.walletCount = 0;
                state.minterble = false;
            })
    }))
);

export default useInstantiateStore;
