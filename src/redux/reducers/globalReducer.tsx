import { createAction, createReducer } from '@reduxjs/toolkit';
import { CONTRACT_MODE_TYPE, CW_MODE_TYPE, MENU_TYPE, NETWORK_TYPE } from '@/constants/common';

export interface IGlobalStateProps {
    network: NETWORK_TYPE;
    menu: MENU_TYPE;
    cwMode: CW_MODE_TYPE;
    contractMode: CONTRACT_MODE_TYPE;
    cw20Minterble: boolean;

    globalLoading: boolean;
}

export const HANDLE_NETWORK = 'HANDLE_NETWORK';
export const HANDLE_CW_MODE = 'HANDLE_CW_MODE';
export const HANDLE_CONTRACT_MODE = 'HANDLE_CONTRACT_MODE';
export const HANDLE_MENU = 'HANDLE_MENU';
export const HANDLE_CW20_MINTERBLE = 'HANDLE_CW20_MINTERBLE';
const HANDLE_GLOBAL_LOADING = 'HANDLE_GLOBAL_LOADING';

export const initialState: IGlobalStateProps = {
    network: 'TESTNET',
    menu: 'INSTANTAITE',
    cwMode: 'CW20',
    contractMode: 'BASIC',
    cw20Minterble: false,
    globalLoading: false
};

export const ACTION_CREATORS = {
    HANDLE_NETWORK: createAction<NETWORK_TYPE>(HANDLE_NETWORK),
    HANDLE_MENU: createAction<MENU_TYPE>(HANDLE_MENU),
    HANDLE_CW_MODE: createAction<CW_MODE_TYPE>(HANDLE_CW_MODE),
    HANDLE_MODE: createAction<CONTRACT_MODE_TYPE>(HANDLE_CONTRACT_MODE),
    HANDLE_CW20_MINTERBLE: createAction<boolean>(HANDLE_CW20_MINTERBLE),
    HANDLE_GLOBAL_LOADING: createAction<boolean>(HANDLE_GLOBAL_LOADING)
};

export const ACTIONS = {
    handleNetwork: ACTION_CREATORS.HANDLE_NETWORK,
    handleCw: ACTION_CREATORS.HANDLE_CW_MODE,
    handleMenu: ACTION_CREATORS.HANDLE_MENU,
    handleMode: ACTION_CREATORS.HANDLE_MODE,
    handleCw20Minterble: ACTION_CREATORS.HANDLE_CW20_MINTERBLE,
    handleGlobalLoading: ACTION_CREATORS.HANDLE_GLOBAL_LOADING
};

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(ACTION_CREATORS.HANDLE_NETWORK, (state, { payload }) => {
        state.network = payload;
    });

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
});

export default reducer;
