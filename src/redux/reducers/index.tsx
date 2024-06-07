import { combineReducers } from "redux";

import global, { IGlobalStateProps } from "./globalReducer";

export interface rootState {
  global: IGlobalStateProps,
}

const reducers = combineReducers({ global });

export default reducers;