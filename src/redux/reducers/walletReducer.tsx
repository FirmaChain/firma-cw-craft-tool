import { createAction, createReducer } from '@reduxjs/toolkit';

export interface IWalletStateProps {
    address: string;
    fctBalance: string;
    isInit: boolean;
    isStation: boolean;
    timeKey: string;
    timeKeyWallet: string;
    passwordWallet: string;
    clearStore: () => void;
}

export const HANDLE_ADDRESS = 'HANDLE_ADDRESS';
export const HANDLE_FCT_BALANCE = 'HANDLE_FCT_BALANCE';
export const HANDLE_INIT = 'HANDLE_INIT';
export const HANDLE_STATION = 'HANDLE_STATION';
export const HANDLE_TIME_KEY = 'HANDLE_TIME_KEY';
export const HANDLE_TIME_KEY_WALLET = 'HANDLE_TIME_KEY_WALLET';
export const HANDLE_PASSWORD_KEY_WALLET = 'HANDLE_PASSWORD_KEY_WALLET';

const CLEAR_STORE = 'CLEAR_STROE';

const initialState: IWalletStateProps = {
    address: '',
    fctBalance: '',
    isInit: false,
    isStation: false,
    timeKey: '',
    timeKeyWallet: '',
    passwordWallet: '',
    clearStore: () => {}
};

export const ACTION_CREATORS = {
    HANDLE_ADDRESS: createAction<string>(HANDLE_ADDRESS),
    HANDLE_FCT_BALANCE: createAction<string>(HANDLE_FCT_BALANCE),
    HANDLE_INIT: createAction<boolean>(HANDLE_INIT),
    HANDLE_STATION: createAction<boolean>(HANDLE_STATION),
    HANDLE_TIME_KEY: createAction<string>(HANDLE_TIME_KEY),
    HANDLE_TIME_KEY_WALLET: createAction<string>(HANDLE_TIME_KEY_WALLET),
    HANDLE_PASSWORD_KEY_WALLET: createAction<string>(HANDLE_PASSWORD_KEY_WALLET),
    CLEAR_STORE: createAction<void>(CLEAR_STORE)
};

export const ACTIONS = {
    handleAddress: ACTION_CREATORS.HANDLE_ADDRESS,
    handleFCTBalance: ACTION_CREATORS.HANDLE_FCT_BALANCE,
    handleInit: ACTION_CREATORS.HANDLE_INIT,
    handleStation: ACTION_CREATORS.HANDLE_STATION,
    handleTimeKey: ACTION_CREATORS.HANDLE_TIME_KEY,
    handleTimeKeyWallet: ACTION_CREATORS.HANDLE_TIME_KEY_WALLET,
    handlePasswordWallet: ACTION_CREATORS.HANDLE_PASSWORD_KEY_WALLET,
    clearStore: ACTION_CREATORS.CLEAR_STORE
};

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(ACTION_CREATORS.HANDLE_ADDRESS, (state, { payload }) => {
        state.address = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_FCT_BALANCE, (state, { payload }) => {
        state.fctBalance = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_INIT, (state, { payload }) => {
        state.isInit = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_STATION, (state, { payload }) => {
        state.isStation = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_TIME_KEY, (state, { payload }) => {
        state.timeKey = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_TIME_KEY_WALLET, (state, { payload }) => {
        state.timeKeyWallet = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_PASSWORD_KEY_WALLET, (state, { payload }) => {
        state.passwordWallet = payload;
    });

    builder.addCase(ACTION_CREATORS.CLEAR_STORE, (state) => {
        state.address = '';
        state.fctBalance = '';
        state.isInit = false;
        state.isStation = false;
        state.timeKey = '';
        state.timeKeyWallet = '';
        state.passwordWallet = '';
    });
});

export default reducer;
