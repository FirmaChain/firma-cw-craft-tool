import { createAction, createReducer } from '@reduxjs/toolkit';

export interface IWalletStateProps {
    address: string;
    isInit: boolean;
    isStation: boolean;
    timeKey: string;
    userKey: string;
    clearStore: () => void;
}

export const HANDLE_ADDRESS = 'HANDLE_ADDRESS';
export const HANDLE_INIT = 'HANDLE_INIT';
export const HANDLE_STATION = 'HANDLE_STATION';
export const HANDLE_TIME_KEY = 'HANDLE_TIME_KEY';
export const HANDLE_USER_KEY = 'HANDLE_USER_KEY';

const CLEAR_STORE = 'CLEAR_STROE';

const initialState: IWalletStateProps = {
    address: '',
    isInit: false,
    isStation: false,
    timeKey: '',
    userKey: '',
    clearStore: () => {}
};

export const ACTION_CREATORS = {
    HANDLE_ADDRESS: createAction<string>(HANDLE_ADDRESS),
    HANDLE_INIT: createAction<boolean>(HANDLE_INIT),
    HANDLE_STATION: createAction<boolean>(HANDLE_STATION),
    HANDLE_TIME_KEY: createAction<string>(HANDLE_TIME_KEY),
    HANDLE_USER_KEY: createAction<string>(HANDLE_USER_KEY),
    CLEAR_STORE: createAction<void>(CLEAR_STORE)
};

export const ACTIONS = {
    handleAddress: ACTION_CREATORS.HANDLE_ADDRESS,
    handleInit: ACTION_CREATORS.HANDLE_INIT,
    handleStation: ACTION_CREATORS.HANDLE_STATION,
    handleTimeKey: ACTION_CREATORS.HANDLE_TIME_KEY,
    handleUserKey: ACTION_CREATORS.HANDLE_USER_KEY,
    clearStore: ACTION_CREATORS.CLEAR_STORE
};

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(ACTION_CREATORS.HANDLE_ADDRESS, (state, { payload }) => {
        state.address = payload;
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

    builder.addCase(ACTION_CREATORS.HANDLE_USER_KEY, (state, { payload }) => {
        state.userKey = payload;
    });
    
    builder.addCase(ACTION_CREATORS.CLEAR_STORE, (state) => {
        state.address = '';
        state.isInit = false;
        state.isStation = false;
        state.timeKey = '';
        state.userKey = '';
    });
});

export default reducer;
