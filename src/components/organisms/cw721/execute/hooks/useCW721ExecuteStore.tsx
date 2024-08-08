import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 } from 'uuid';
import { ContractInfo, Cw721Approval, Cw721ContractInfo, Cw721Expires, Cw721NftInfo } from '@firmachain/firma-js';

import { IExecuteTransfer } from '@/interfaces/cw721';
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
    nftApprovalInfo: Cw721Approval;
    minter: string;
    nftDatas: Cw721NftInfo[];
    allOperators: Cw721Approval[];

    setFctBalance: (v: string) => void;
    setContractInfo: (v: ContractInfo) => void;
    setNftContractInfo: (v: Cw721ContractInfo) => void;
    setTotalNfts: (v: string) => void;
    setMyNftList: (v: string[]) => void;
    setOwnershipInfo: (v: CwOwnershipInfo) => void;
    setBlockHeight: (v: string) => void;
    setNftApprovalInfo: (v: Cw721Approval) => void;
    setMinter: (v: string) => void;
    setNftDatas: (v: Cw721NftInfo[]) => void;
    setAllOperators: (v: Cw721Approval[]) => void;
    clearInfo: () => void;

    contractAddress: string;
    // Mint
    selectMenu: IMenuItem;
    mintRecipientAddress: string;
    mintBaseURI: string;
    mintStartTokenId: string;
    mintEndTokenId: string;
    mintList: { token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[];
    alreadyMintList: string[];
    notYetMintList: string[];
    // BURN
    burnList: string;
    // TRANSFER
    transfer: IExecuteTransfer[];
    approveInfoById: Record<string, boolean>;
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
    setMintList: (v: { token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[]) => void;
    setAlreadyMintList: (v: string[]) => void;
    setNotYetMintList: (v: string[]) => void;
    // BURN
    setBurnList: (v: string) => void;
    // TRANSFER
    setTransfer: (v: IExecuteTransfer[]) => void;
    setApproveInfoById: (v: Record<string, boolean>) => void;
    // APPROVE
    setApproveRecipientAddress: (v: string) => void;
    setApproveTokenId: (v: string) => void;
    setApproveType: (v: string) => void;
    setApproveValue: (v: string) => void;
    // REVOKE
    setRevokeAddress: (v: string) => void;
    setRevokeTokenId: (v: string) => void;

    clearForm: () => void;
    clearSelectMenu: () => void;
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
const INIT_MINT_LIST: { token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[] = [
    { token_id: '', token_uri: '', id: v4(), isAlreadyMint: false }
];
const INIT_TRANSFER: IExecuteTransfer = { recipient: '', token_ids: [] };
const INIT_NFT_APPROVAL: Cw721Approval = { spender: '', expires: { at_height: 0 } };

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
        nftApprovalInfo: INIT_NFT_APPROVAL,
        minter: '',
        nftDatas: [],
        allOperators: [],

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
        setNftApprovalInfo: (data) =>
            set((state) => {
                state.nftApprovalInfo = data;
            }),
        setMinter: (data) =>
            set((state) => {
                state.minter = data;
            }),
        setNftDatas: (data) =>
            set((state) => {
                state.nftDatas = data;
            }),
        setAllOperators: (data) =>
            set((state) => {
                state.allOperators = data;
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
        alreadyMintList: [],
        notYetMintList: [],
        // BURN
        burnList: '',
        // TRANSFER
        transfer: [{ ...INIT_TRANSFER, id: v4() }],
        approveInfoById: {},
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
        setAlreadyMintList: (data) =>
            set((state) => {
                state.alreadyMintList = data;
            }),
        setNotYetMintList: (data) =>
            set((state) => {
                state.notYetMintList = data;
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
        setApproveInfoById: (data) =>
            set((state) => {
                state.approveInfoById = data;
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
            });
        },
        clearSelectMenu: () => {
            set((state) => {
                state.selectMenu = INIT_SELECT_MENU;
            });
        },
        clearMintForm: () => {
            set((state) => {
                state.mintBaseURI = '';
                state.mintRecipientAddress = '';
                state.mintStartTokenId = '';
                state.mintEndTokenId = '';
                state.mintList = INIT_MINT_LIST;
                state.nftDatas = [];
                state.alreadyMintList = [];
                state.notYetMintList = [];
            });
        },
        clearBurnForm: () => {
            set((state) => {
                state.burnList = '';
                state.nftDatas = [];
            });
        },
        clearTransferForm: () => {
            set((state) => {
                state.transfer = [{ ...INIT_TRANSFER, id: v4() }];
                state.approveInfoById = {};
            });
        },
        clearApproveForm: () => {
            set((state) => {
                state.approveRecipientAddress = '';
                state.approveTokenId = '';
                state.approveType = 'Height';
                state.approveValue = '';
            });
        },
        clearRevokeForm: () => {
            set((state) => {
                state.revokeAddress = '';
                state.revokeTokenId = '';
            });
        }
    }))
);

export default useCW721ExecuteStore;
