import { ContractInfo, Cw721ContractInfo } from "@firmachain/firma-js";

import {
    IExecuteApproveAll,
    IExecuteApprove,
    IExecuteBurn,
    IExecuteMint,
    IExecuteTransfer,
    IExecuteRevokeAll,
    IExecuteRevoke,
    IExecuteUpdateOwnershipTransfer
} from "@/interfaces/cw721";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IMenuItem } from "@/interfaces/common";

interface FormProps {
    contractInfo: ContractInfo | null;
    nftContractInfo: Cw721ContractInfo | null;
    setContractInfo: (v: ContractInfo) => void;
    setNftContractInfo: (v: Cw721ContractInfo) => void;

    clearInfo: () => void;

    contractAddress: string | null;
    selectMenu: IMenuItem | null;
    mint: IExecuteMint;
    burn: IExecuteBurn;
    transfer: IExecuteTransfer[];
    approve: IExecuteApprove;
    revoke: IExecuteRevoke;
    approveAll: IExecuteApproveAll;
    revokeAll: IExecuteRevokeAll;
    updateOwnershipTransfer: IExecuteUpdateOwnershipTransfer;
    setContractAddress: (v: string) => void;
    setSelectMenu: (v: IMenuItem) => void;
    setMint: (v: IExecuteMint) => void;
    setBurn: (v: IExecuteBurn) => void;
    setTransfer: (v: IExecuteTransfer[]) => void;
    setApprove: (v: IExecuteApprove) => void;
    setRevoke: (v: IExecuteRevoke) => void;
    setApproveAll: (v: IExecuteApproveAll) => void;
    setRevokeAll: (v: IExecuteRevokeAll) => void;
    setUpdateOwnershipTransfer: (v: IExecuteUpdateOwnershipTransfer) => void;

    clearForm: () => void;
}

const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };

const useCW721ExecuteStore = create<FormProps>()(
    immer((set) => ({
        contractInfo: null,
        nftContractInfo: null,
        setContractInfo: (data) =>
            set((state) => {
                state.contractInfo = data;
            }),
        setNftContractInfo: (data) =>
            set((state) => {
                state.nftContractInfo = data;
            }),
        clearInfo: () =>
            set((state) => {
                state.contractInfo = null;
            }),
            
        contractAddress: null,
        selectMenu: INIT_SELECT_MENU,
        mint: null,
        burn: null,
        transfer: null,
        approve: null,
        revoke: null,
        approveAll: null,
        revokeAll: null,
        updateOwnershipTransfer: null,
        setContractAddress: (data) =>
            set((state) => {
                state.contractAddress = data;
            }),
        setSelectMenu: (data) =>
            set((state) => {
                state.selectMenu = data;
            }),
        setMint: (data) =>
            set((state) => {
                state.mint = data;
            }),
        setBurn: (data) =>
            set((state) => {
                state.burn = data;
            }),
        setTransfer: (data) =>
            set((state) => {
                state.transfer = data;
            }),
        setApprove: (data) =>
            set((state) => {
                state.approve = data;
            }),
        setRevoke: (data) => 
            set((state) => {
                state.revoke = data;
            }),
        setApproveAll: (data) =>
            set((state) => {
                state.approveAll = data;
            }),
        setRevokeAll: (data) => 
            set((state) => {
                state.revokeAll = data;
            }),
        setUpdateOwnershipTransfer: (data) =>
            set((state) => {
                state.updateOwnershipTransfer = data;
            }),
        clearForm: () => {
            set((state) => {
                state.contractInfo = null;
                state.contractAddress = null;
                state.selectMenu = INIT_SELECT_MENU;
                state.mint = null;
                state.burn = null;
                state.transfer = null;
                state.approve = null;
                state.revoke = null;
                state.approveAll = null;
                state.revokeAll = null;
                state.updateOwnershipTransfer = null;
            })
        }
    }))
)

export default useCW721ExecuteStore;