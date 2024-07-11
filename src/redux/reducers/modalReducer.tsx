import { createAction, createReducer } from '@reduxjs/toolkit';

export interface IModalStateProps {
    connectWallet: boolean;
    data: any;
    qrConfirm: boolean;
    txConfirm: boolean;
}

export const HANDLE_CONNECT_WALLET = 'HANDLE_CONNECT_WALLET';
export const HANDLE_MODAL_DATA = 'HANDLE_DATA';
export const HANDLE_QR_CONFIRM = 'HANDLE_QR_CONFIRM';
export const HANDLE_TX_CONFIRM = 'HANDLE_TX_CONFIRM';

const initiateState: IModalStateProps = {
    connectWallet: false,
    data: {},
    qrConfirm: false,
    txConfirm: false
};

export const ACTION_CREATORS = {
    HANDLE_CONNECT_WALLET: createAction<boolean>(HANDLE_CONNECT_WALLET),
    HANDLE_MODAL_DATA: createAction<any>(HANDLE_MODAL_DATA),
    HANDLE_QR_CONFIRM: createAction<boolean>(HANDLE_QR_CONFIRM),
    HANDLE_TX_CONFIRM: createAction<boolean>(HANDLE_TX_CONFIRM)
};

export const ACTIONS = {
    handleConnectWallet: ACTION_CREATORS.HANDLE_CONNECT_WALLET,
    handleData: ACTION_CREATORS.HANDLE_MODAL_DATA,
    handleQrConfirm: ACTION_CREATORS.HANDLE_QR_CONFIRM,
    handleTxConfirm: ACTION_CREATORS.HANDLE_TX_CONFIRM
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
});

export default reducer;
