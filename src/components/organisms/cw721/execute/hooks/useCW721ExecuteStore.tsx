import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';
import { ContractInfo, Cw721ContractInfo, Cw721Expires } from '@firmachain/firma-js';

import {
    IExecuteTransfer
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
    myNftList: string[];
    ownershipInfo: CwOwnershipInfo;
    minterInfo: string;
    blockHeight: string;
    setFctBalance: (v: string) => void;
    setContractInfo: (v: ContractInfo) => void;
    setNftContractInfo: (v: Cw721ContractInfo) => void;
    setTotalNfts: (v: string) => void;
    setMyNftList: (v: string[]) => void;
    setOwnershipInfo: (v: CwOwnershipInfo) => void;
    setBlockHeight: (v: string) => void;
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
    // TRANSFER
    transfer: IExecuteTransfer[];
    // APPROVE
    approveRecipientAddress: string;
    approveTokenId: string;
    approveType: string;
    approveValue: string;
    // REVOKE
    revokeAddress: string;
    revokeTokenId: string;
    // APPROVE ALL
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
    // TRANSFER
    setTransfer: (v: IExecuteTransfer[]) => void;
    // APPROVE
    setApproveRecipientAddress: (v: string) => void;
    setApproveTokenId: (v: string) => void;
    setApproveType: (v: string) => void;
    setApproveValue: (v: string) => void;
    // REVOKE
    setRevokeAddress: (v: string) => void;
    setRevokeTokenId: (v: string) => void;

    clearForm: () => void;
    clearMintForm: () => void;
    clearBurnForm: () => void;
    clearTransferForm: () => void;
    clearApproveForm: () => void;
    clearRevokeForm: () => void;
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
const INIT_TRANSFER: IExecuteTransfer[] = [{ recipient: '', token_ids: [] }];

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
        myNftList: [],
        ownershipInfo: INIT_OWNERSHIP_INFO,
        minterInfo: INIT_MINTER_INFO,
        blockHeight: '0',
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
        setMyNftList: (data) =>
            set((state) => {
                state.myNftList = data;
            }),
        setNftContractInfo: (data) =>
            set((state) => {
                state.nftContractInfo = data;
            }),
        setOwnershipInfo: (data) => 
            set((state) => {
                state.ownershipInfo = data;
            }),
        setBlockHeight: (data) =>
            set((state) => {
                state.blockHeight = data;
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
        // TRANSFER
        transfer: INIT_TRANSFER,
        // APPROVE
        approveRecipientAddress: '',
        approveTokenId: '',
        approveType: 'Height',
        approveValue: '',
        // REVOKE
        revokeAddress: '',
        revokeTokenId: '',
        // APPROVE ALL
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
        // TRANSFER
        setTransfer: (data) =>
            set((state) => {
                state.transfer = data;
            }),
        // APPROVE
        setApproveRecipientAddress: (data) =>
            set((state) => {
                state.approveRecipientAddress = data;
            }),
        setApproveTokenId: (data) =>
            set((state) => {
                state.approveTokenId = data;
            }),
        setApproveType: (data) =>
            set((state) => {
                state.approveType = data;
            }),
        setApproveValue: (data) =>
            set((state) => {
                state.approveValue = data;
            }),
        // REVOKE
        setRevokeAddress: (data) =>
            set((state) => {
                state.revokeAddress = data;
            }),
        setRevokeTokenId: (data) =>
            set((state) => {
                state.revokeTokenId = data;
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
        },
        clearTransferForm: () => {
            set((state) => {
                state.transfer = INIT_TRANSFER;
            })
        },
        clearApproveForm: () => {
            set((state) => {
                state.approveRecipientAddress = '';
                state.approveTokenId = '';
                state.approveType = 'Height';
                state.approveValue = '';
            })
        },
        clearRevokeForm: () => {
            set((state) => {
                state.revokeAddress = '';
                state.revokeTokenId = '';
            })
        },
    }))
);

export default useCW721ExecuteStore;
