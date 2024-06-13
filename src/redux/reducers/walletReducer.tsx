import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IWalletStateProps {
  address: string;
  isInit: boolean;
  isStation: boolean;
}

export const HANDLE_ADDRESS = "HANDLE_ADDRESS";
export const HANDLE_INIT = "HANDLE_INIT";
export const HANDLE_STATION = "HANDLE_STATION";

const initialState: IWalletStateProps = {
  address: "",
  isInit: false,
  isStation: false
};

export const ACTION_CREATORS = {
  HANDLE_ADDRESS: createAction<string>(HANDLE_ADDRESS),
  HANDLE_INIT: createAction<boolean>(HANDLE_INIT),
  HANDLE_STATION: createAction<boolean>(HANDLE_STATION),
};

export const ACTIONS = {
  handleAddress: ACTION_CREATORS.HANDLE_ADDRESS,
  handleInit: ACTION_CREATORS.HANDLE_INIT,
  handleStation: ACTION_CREATORS.HANDLE_STATION
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
});

export default reducer;