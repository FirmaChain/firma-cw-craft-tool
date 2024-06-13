import { combineReducers } from "redux";

import global, { IGlobalStateProps } from "./globalReducer";
import modal, { IModalStateProps } from "./modalReducer";
import wallet, { IWalletStateProps } from "./walletReducer";

export interface rootState {
  global: IGlobalStateProps,
  modal: IModalStateProps,
  wallet: IWalletStateProps
}

const reducers = combineReducers({ global, modal, wallet });

export default reducers;