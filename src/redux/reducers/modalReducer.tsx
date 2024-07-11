import { createAction, createReducer } from '@reduxjs/toolkit';

export interface IModalStateProps {
    connectWallet: boolean;
    data: any;
    qrConfirm: boolean;
    txConfirm: boolean;
    callback?: () => void;
}

export const HANDLE_CONNECT_WALLET = 'HANDLE_CONNECT_WALLET';
export const HANDLE_MODAL_DATA = 'HANDLE_DATA';
export const HANDLE_QR_CONFIRM = 'HANDLE_QR_CONFIRM';
export const HANDLE_TX_CONFIRM = 'HANDLE_TX_CONFIRM';
export const HANDLE_SET_CALLBACK = 'HANDLE_SET_CALLBACK';
export const HANDLE_CLEAR_CALLBACK = 'HANDLE_CLEAR_CALLBACK';

const initiateState: IModalStateProps = {
    connectWallet: false,
    data: {},
    qrConfirm: false,
    txConfirm: false,
    callback: undefined,
};

export const ACTION_CREATORS = {
    HANDLE_CONNECT_WALLET: createAction<boolean>(HANDLE_CONNECT_WALLET),
    HANDLE_MODAL_DATA: createAction<any>(HANDLE_MODAL_DATA),
    HANDLE_QR_CONFIRM: createAction<boolean>(HANDLE_QR_CONFIRM),
    HANDLE_TX_CONFIRM: createAction<boolean>(HANDLE_TX_CONFIRM),
    HANDLE_SET_CALLBACK: createAction<{ callback: () => void }>(HANDLE_SET_CALLBACK),
    HANDLE_CLEAR_CALLBACK: createAction(HANDLE_CLEAR_CALLBACK),
};

export const ACTIONS = {
    handleConnectWallet: ACTION_CREATORS.HANDLE_CONNECT_WALLET,
    handleData: ACTION_CREATORS.HANDLE_MODAL_DATA,
    handleQrConfirm: ACTION_CREATORS.HANDLE_QR_CONFIRM,
    handleTxConfirm: ACTION_CREATORS.HANDLE_TX_CONFIRM,
    handleSetCallback: ACTION_CREATORS.HANDLE_SET_CALLBACK,
    handleClearCallback: ACTION_CREATORS.HANDLE_CLEAR_CALLBACK,
};

const reducer = createReducer(initiateState, (builder) => {
    builder.addCase(ACTION_CREATORS.HANDLE_CONNECT_WALLET, (state, { payload }) => {
        state.connectWallet = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_MODAL_DATA, (state, { payload }) => {
        state.data = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_QR_CONFIRM, (state, { payload }) => {
        state.qrConfirm = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_TX_CONFIRM, (state, { payload }) => {
        state.txConfirm = payload;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_SET_CALLBACK, (state, { payload }) => {
        state.callback = payload.callback;
    });

    builder.addCase(ACTION_CREATORS.HANDLE_CLEAR_CALLBACK, (state) => {
        if (state.callback) {
            state.callback();
            state.callback = undefined;
        }
    });
});

export default reducer;
