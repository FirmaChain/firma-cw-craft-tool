import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';
import { ContractInfo, Cw721ContractInfo, Cw721Expires } from '@firmachain/firma-js';

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
import { IMenuItem } from '@/interfaces/common';

interface CwOwnershipInfo {
    owner: string;
    pending_owner: string;
    pending_expiry: Cw721Expires;
}
interface FormProps {
    contractExist: boolean | null;
    setContractExist: (v: boolean) => void;

    fctBalance: string;
    contractInfo: ContractInfo;
    nftContractInfo: Cw721ContractInfo;
    totalNfts: string;
    ownershipInfo: CwOwnershipInfo;
    minterInfo: string;
    setFctBalance: (v: string) => void;
    setContractInfo: (v: ContractInfo) => void;
    setNftContractInfo: (v: Cw721ContractInfo) => void;
    setTotalNfts: (v: string) => void;
    
    clearInfo: () => void;

    contractAddress: string;
    // Mint
    selectMenu: IMenuItem;
    mintRecipientAddress: string;
    mintBaseURI: string;
    mintStartTokenId: string;
    mintEndTokenId: string;
    mintList: { token_id: string, token_uri: string, id: string }[];
    // BURN
    burnList: string;

    burn: IExecuteBurn;
    transfer: IExecuteTransfer[];
    approve: IExecuteApprove;
    revoke: IExecuteRevoke;
    approveAll: IExecuteApproveAll;
    revokeAll: IExecuteRevokeAll;
    updateOwnershipTransfer: IExecuteUpdateOwnershipTransfer;
    setContractAddress: (v: string) => void;
    setSelectMenu: (v: IMenuItem) => void;
    // MINT
    setMintRecipientAddress: (v: string) => void;
    setMintBaseURI: (v: string) => void;
    setMintStartTokenId: (v: string) => void;
    setMintEndTokenId: (v: string) => void;
    setMintList: (v: { token_id: string, token_uri: string, id: string }[]) => void;
    // BURN
    setBurnList: (v: string) => void;

    setBurn: (v: IExecuteBurn) => void;
    setTransfer: (v: IExecuteTransfer[]) => void;
    setApprove: (v: IExecuteApprove) => void;
    setRevoke: (v: IExecuteRevoke) => void;
    setApproveAll: (v: IExecuteApproveAll) => void;
    setRevokeAll: (v: IExecuteRevokeAll) => void;
    setUpdateOwnershipTransfer: (v: IExecuteUpdateOwnershipTransfer) => void;

    clearForm: () => void;
    clearMintForm: () => void;
    clearBurnForm: () => void;
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
const INIT_OWNERSHIP_INFO: CwOwnershipInfo = { owner: '', pending_owner: '', pending_expiry: { at_height: 0 } };
const INIT_MINTER_INFO: string = '';
const INIT_SELECT_MENU: IMenuItem = { value: 'select', label: 'Select' };
const INIT_MINT_LIST: { token_id: string, token_uri: string, id: string }[] = [{ token_id: '', token_uri: '', id: v4() }];
const INIT_BURN: IExecuteBurn = { token_ids: [] };
const INIT_TRANSFER: IExecuteTransfer[] = [{ recipient: '', token_ids: [] }];
const INIT_APPORVE: IExecuteApprove = { recipient: '', token_id: '', expire: { type: '', value: '' } };
const INIT_REVOKE: IExecuteRevoke = { recipient: '', token_id: '' };
const INIT_APPROVE_ALL: IExecuteApproveAll = { recipient: '', expire: { type: '', value: '' } };
const INIT_REVOKE_ALL: IExecuteRevokeAll = { recipient: '' };
const INIT_UPDATE_OWNERSHIP_TRANSFER: IExecuteUpdateOwnershipTransfer = { recipient: '', expire: { type: '', value: '' } };

const useCW721ExecuteStore = create<FormProps>()(
    immer((set) => ({
        contractExist: null,
        setContractExist: (data) =>
            set((state) => {
                state.contractExist = data;
            }),

        fctBalance: '',
        contractInfo: INIT_CONTRACT_INFO,
        nftContractInfo: INIT_NFT_CONTRACT_INFO,
        totalNfts: '',
        ownershipInfo: INIT_OWNERSHIP_INFO,
        minterInfo: INIT_MINTER_INFO,
        setFctBalance: (data) =>
            set((state) => {
                state.fctBalance = data;
            }),
        setContractInfo: (data) =>
            set((state) => {
                state.contractInfo = data;
            }),
        setTotalNfts: (data) =>
            set((state) => {
                state.totalNfts = data;
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
        // MINT
        mintRecipientAddress: '',
        mintBaseURI: '',
        mintStartTokenId: '',
        mintEndTokenId: '',
        mintList: INIT_MINT_LIST,
        // BURN
        burnList: '',
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
        // MINT
        setMintRecipientAddress: (data) => 
            set((state) => {
                state.mintRecipientAddress = data;
            }),
        setMintBaseURI: (data) => 
            set((state) => {
                state.mintBaseURI = data;
            }),
        setMintStartTokenId: (data) => 
            set((state) => {
                state.mintStartTokenId = data;
            }),
        setMintEndTokenId: (data) => 
            set((state) => {
                state.mintEndTokenId = data;
            }),
        setMintList: (data) => 
            set((state) => {
                state.mintList = data;
            }),
        // BURN
        setBurnList: (data) =>
            set((state) => {
                state.burnList = data;
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
                state.contractExist = null;

                state.contractInfo = INIT_CONTRACT_INFO;
                state.nftContractInfo = INIT_NFT_CONTRACT_INFO;

                state.contractAddress = '';
                state.selectMenu = INIT_SELECT_MENU;

                state.mintRecipientAddress = '';
                state.mintBaseURI = '';
                state.mintStartTokenId = '';
                state.mintEndTokenId = '';
                state.mintList = INIT_MINT_LIST;

                state.burn = INIT_BURN;
                state.transfer = INIT_TRANSFER;
                state.approve = INIT_APPORVE;
                state.revoke = INIT_REVOKE;
                state.approveAll = INIT_APPROVE_ALL;
                state.revokeAll = INIT_REVOKE_ALL;
                state.updateOwnershipTransfer = INIT_UPDATE_OWNERSHIP_TRANSFER;
            })
        },
        clearMintForm: () => {
            set((state) => {
                state.mintBaseURI = '';
                state.mintRecipientAddress = '';
                state.mintStartTokenId = '';
                state.mintEndTokenId = '';
                state.mintList = INIT_MINT_LIST;
            })
        },
        clearBurnForm: () => {
            set((state) => {
                state.burnList = '';
            })
        }
    }))
);

export default useCW721ExecuteStore;
