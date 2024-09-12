import { createAction, createReducer } from '@reduxjs/toolkit';
import { CONTRACT_MODE_TYPE, CW_MODE_TYPE, MENU_TYPE } from '@/constants/common';

export interface IGlobalStateProps {
    menu: MENU_TYPE;
    cwMode: CW_MODE_TYPE;
    contractMode: CONTRACT_MODE_TYPE;
    cw20Minterble: boolean;
    globalLoading: boolean;
    isFetchedBalance: boolean;
}

const HANDLE_CW_MODE = 'HANDLE_CW_MODE';
const HANDLE_CONTRACT_MODE = 'HANDLE_CONTRACT_MODE';
const HANDLE_MENU = 'HANDLE_MENU';
const HANDLE_CW20_MINTERBLE = 'HANDLE_CW20_MINTERBLE';
const HANDLE_GLOBAL_LOADING = 'HANDLE_GLOBAL_LOADING';
const HANDLE_FETCHED_BALANCE = 'HANDLE_FETCHED_BALANCE';

//? cw mode by current location
const INITIAL_CW_MODE = window.location.href.toLowerCase().includes('cw721') ? 'CW721' : 'CW20';

const initialState: IGlobalStateProps = {
    menu: 'INSTANTAITE',
    cwMode: INITIAL_CW_MODE,
    contractMode: 'BASIC',
    cw20Minterble: false,
    globalLoading: false,
    isFetchedBalance: false
};

const ACTION_CREATORS = {
    HANDLE_MENU: createAction<MENU_TYPE>(HANDLE_MENU),
    HANDLE_CW_MODE: createAction<CW_MODE_TYPE>(HANDLE_CW_MODE),
    HANDLE_MODE: createAction<CONTRACT_MODE_TYPE>(HANDLE_CONTRACT_MODE),
    HANDLE_CW20_MINTERBLE: createAction<boolean>(HANDLE_CW20_MINTERBLE),
    HANDLE_GLOBAL_LOADING: createAction<boolean>(HANDLE_GLOBAL_LOADING),
    HANDLE_FETCHED_BALANCE: createAction<boolean>(HANDLE_FETCHED_BALANCE)
};

export const ACTIONS = {
    handleCw: ACTION_CREATORS.HANDLE_CW_MODE,
    handleMenu: ACTION_CREATORS.HANDLE_MENU,
    handleMode: ACTION_CREATORS.HANDLE_MODE,
    handleCw20Minterble: ACTION_CREATORS.HANDLE_CW20_MINTERBLE,
    handleGlobalLoading: ACTION_CREATORS.HANDLE_GLOBAL_LOADING,
    handleFetchedBalance: ACTION_CREATORS.HANDLE_FETCHED_BALANCE
};

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(ACTION_CREATORS.HANDLE_CW_MODE, (state, { payload }) => {
        state.cwMode = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_MENU, (state, { payload }) => {
        state.menu = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_MODE, (state, { payload }) => {
        state.contractMode = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_CW20_MINTERBLE, (state, { payload }) => {
        state.cw20Minterble = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_GLOBAL_LOADING, (state, { payload }) => {
        state.globalLoading = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_FETCHED_BALANCE, (state, { payload }) => {
        state.isFetchedBalance = payload;
    });
});

export default reducer;
