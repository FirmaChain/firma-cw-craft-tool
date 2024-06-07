import { createAction, createReducer } from "@reduxjs/toolkit";
import { CW20_MODE_TYPE, CW_TYPE, MENU_TYPE, NETWORK_TYPE } from "../../constants/common";

export interface IGlobalStateProps {
  network: NETWORK_TYPE;
  menu: MENU_TYPE;
  cw: CW_TYPE;
  cw20Mode: CW20_MODE_TYPE;
};

export const HANDLE_NETWORK = "HANDLE_NETWORK";
export const HANDLE_CW = "HANDLE_CW";
export const HANDLE_MENU = "HANDLE_MENU";
export const HANDLE_CW20_MODE = "HANDLE_CW20_MODE";

export const initialState: IGlobalStateProps = {
  network: "TESTNET",
  menu: "INSTANTAITE",
  cw: "CW20",
  cw20Mode: "BASIC",
};

export const ACTION_CREATORS = {
  HANDLE_NETWORK: createAction<NETWORK_TYPE>(HANDLE_NETWORK),
  HANDLE_MENU: createAction<MENU_TYPE>(HANDLE_MENU),
  HANDLE_CW: createAction<CW_TYPE>(HANDLE_CW),
  HANDLE_CW20_MODE: createAction<CW20_MODE_TYPE>(HANDLE_CW20_MODE),
};

export const ACTIONS = {
  handleNetwork: ACTION_CREATORS.HANDLE_NETWORK,
  handleCw: ACTION_CREATORS.HANDLE_CW,
  handleMenu: ACTION_CREATORS.HANDLE_MENU,
  handleCw20Mode: ACTION_CREATORS.HANDLE_CW20_MODE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ACTION_CREATORS.HANDLE_NETWORK, (state, { payload }) => {
    state.network = payload;
  });

  builder.addCase(ACTION_CREATORS.HANDLE_CW, (state, { payload }) => {
    state.cw = payload;
  });

  builder.addCase(ACTION_CREATORS.HANDLE_MENU, (state, { payload }) => {
    state.menu = payload;
  });

  builder.addCase(ACTION_CREATORS.HANDLE_CW20_MODE, (state, { payload }) => {
    state.cw20Mode = payload;
  });
});

export default reducer;