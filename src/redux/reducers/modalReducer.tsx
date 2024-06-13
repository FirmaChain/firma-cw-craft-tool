import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IModalStateProps {
  connectWallet: boolean;
};

export const HANDLE_CONNECT_WALLET = "HANDLE_CONNECT_WALLET";

const initiateState: IModalStateProps = {
  connectWallet: false,
};

export const ACTION_CREATORS = {
  HANDLE_CONNECT_WALLET: createAction<boolean>(HANDLE_CONNECT_WALLET),
};

export const ACTIONS = {
  handleConnectWallet: ACTION_CREATORS.HANDLE_CONNECT_WALLET,
};

const reducer = createReducer(initiateState, (builder) => {
  builder.addCase(ACTION_CREATORS.HANDLE_CONNECT_WALLET, (state, { payload }) => {
    state.connectWallet = payload;
  });
});

export default reducer;