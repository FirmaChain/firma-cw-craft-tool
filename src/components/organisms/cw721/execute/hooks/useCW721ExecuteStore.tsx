import { ContractInfo, Cw721ContractInfo } from '@firmachain/firma-js';

import {
    IExecuteApproveAll,
    IExecuteApprove,
    IExecuteBurn,
    IExecuteMint,
    IExecuteTransfer,
    IExecuteRevokeAll,
    IExecuteRevoke,
    IExecuteUpdateOwnershipTransfer
} from '@/interfaces/cw721';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IMenuItem } from '@/interfaces/common';

interface FormProps {
    contractInfo: ContractInfo;
    nftContractInfo: Cw721ContractInfo;
    setContractInfo: (v: ContractInfo) => void;
    setNftContractInfo: (v: Cw721ContractInfo) => void;

    clearInfo: () => void;

    contractAddress: string;
    selectMenu: IMenuItem;
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

const INIT_CONTRACT_INFO: ContractInfo = {
    address: '',
    contract_info: {
        code_id: '',
        creator: '',
        admin: '',
        label: '',
        created: {
            block_height: '',
            tx_index: ''
        },
        ibc_port_id: '',
        extension: {
            '@type': ''
        }
    }
};
const INIT_NFT_CONTRACT_INFO: Cw721ContractInfo = { name: '', symbol: '' };
const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };
const INIT_MINT: IExecuteMint = { recipient: '', nftInfos: [] };
const INIT_BURN: IExecuteBurn = { token_ids: [] };
const INIT_TRANSFER: IExecuteTransfer[] = [{ recipient: '', token_ids: [] }];
const INIT_APPORVE: IExecuteApprove = { recipient: '', token_id: '', expire: { type: '', value: '' } };
const INIT_REVOKE: IExecuteRevoke = { recipient: '', token_id: '' };
const INIT_APPROVE_ALL: IExecuteApproveAll = { recipient: '', expire: { type: '', value: '' } };
const INIT_REVOKE_ALL: IExecuteRevokeAll = { recipient: '' };
const INIT_UPDATE_OWNERSHIP_TRANSFER: IExecuteUpdateOwnershipTransfer = { recipient: '', expire: { type: '', value: '' } };

const useCW721ExecuteStore = create<FormProps>()(
    immer((set) => ({
        contractInfo: INIT_CONTRACT_INFO,
        nftContractInfo: INIT_NFT_CONTRACT_INFO,
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
                state.contractInfo = INIT_CONTRACT_INFO;
                state.nftContractInfo = INIT_NFT_CONTRACT_INFO;
            }),

        contractAddress: '',
        selectMenu: INIT_SELECT_MENU,
        mint: INIT_MINT,
        burn: INIT_BURN,
        transfer: INIT_TRANSFER,
        approve: INIT_APPORVE,
        revoke: INIT_REVOKE,
        approveAll: INIT_APPROVE_ALL,
        revokeAll: INIT_REVOKE_ALL,
        updateOwnershipTransfer: INIT_UPDATE_OWNERSHIP_TRANSFER,
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
                state.contractInfo = INIT_CONTRACT_INFO;
                state.nftContractInfo = INIT_NFT_CONTRACT_INFO;

                state.contractAddress = '';
                state.selectMenu = INIT_SELECT_MENU;
                state.mint = INIT_MINT;
                state.burn = INIT_BURN;
                state.transfer = INIT_TRANSFER;
                state.approve = INIT_APPORVE;
                state.revoke = INIT_REVOKE;
                state.approveAll = INIT_APPROVE_ALL;
                state.revokeAll = INIT_REVOKE_ALL;
                state.updateOwnershipTransfer = INIT_UPDATE_OWNERSHIP_TRANSFER;
            });
        }
    }))
);

export default useCW721ExecuteStore;
