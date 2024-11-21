import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 } from 'uuid';
import { ContractInfo, Cw721Approval, Cw721ContractInfo, Cw721Expires, Cw721NftInfo } from '@firmachain/firma-js';

import { IExecuteTransfer } from '@/interfaces/cw721';
import { IMenuItem } from '@/interfaces/common';
import useWalletStore from '@/store/walletStore';

interface CwOwnershipInfo {
    owner: string;
    pending_owner: string;
    pending_expiry: Cw721Expires;
}

interface CW721ExecuteContextProps {
    contractExist: boolean | null;
    setContractExist: (v: boolean) => void;

    contractInfo: ContractInfo;
    setContractInfo: (v: ContractInfo) => void;

    nftContractInfo: Cw721ContractInfo;
    setNftContractInfo: (v: Cw721ContractInfo) => void;

    totalNfts: string;
    setTotalNfts: (v: string) => void;

    myNftList: string[];
    setMyNftList: (v: string[]) => void;

    ownershipInfo: CwOwnershipInfo;
    setOwnershipInfo: (v: CwOwnershipInfo) => void;

    minterInfo: string;
    setMinterInfo: (v: string) => void;

    blockHeight: string;
    setBlockHeight: (v: string) => void;

    nftApprovalInfo: Cw721Approval;
    setNftApprovalInfo: (v: Cw721Approval) => void;

    minter: string;
    setMinter: (v: string) => void;

    nftDatas: Cw721NftInfo[];
    setNftDatas: (v: Cw721NftInfo[]) => void;

    clearInfo: () => void;

    contractAddress: string;
    setContractAddress: (v: string) => void;

    // Mint
    selectMenu: IMenuItem;
    setSelectMenu: (v: IMenuItem) => void;

    mintRecipientAddress: string;
    setMintRecipientAddress: (v: string) => void;

    mintBaseURI: string;
    setMintBaseURI: (v: string) => void;

    mintStartTokenId: string;
    setMintStartTokenId: (v: string) => void;

    mintEndTokenId: string;
    setMintEndTokenId: (v: string) => void;

    mintList: { token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[];
    setMintList: (v: { token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[]) => void;

    alreadyMintList: string[];
    setAlreadyMintList: (v: string[]) => void;

    notYetMintList: string[];
    setNotYetMintList: (v: string[]) => void;

    // Burn
    burnList: string;
    setBurnList: (v: string) => void;

    // Transfer
    transfer: IExecuteTransfer[];
    setTransfer: (v: IExecuteTransfer[]) => void;

    approveInfoById: Record<string, boolean>;
    setApproveInfoById: (v: Record<string, boolean>) => void;

    // Approve
    approveRecipientAddress: string;
    setApproveRecipientAddress: (v: string) => void;

    approveTokenId: string;
    setApproveTokenId: (v: string) => void;

    approveType: string;
    setApproveType: (v: string) => void;

    approveValue: string;
    setApproveValue: (v: string) => void;

    // Revoke
    revokeAddress: string;
    setRevokeAddress: (v: string) => void;

    revokeTokenId: string;
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
const INIT_TRANSFER: IExecuteTransfer = { recipient: '', token_ids: [], id: v4() };
const INIT_NFT_APPROVAL: Cw721Approval = { spender: '', expires: { at_height: 0 } };

const CW721ExecuteContext = createContext<CW721ExecuteContextProps | undefined>(undefined);

interface CW721ExecuteProviderProps {
    children: ReactNode;
}

export const CW721ExecuteProvider: React.FC<CW721ExecuteProviderProps> = ({ children }) => {
    const { address } = useWalletStore();

    const [contractExist, setContractExist] = useState<boolean | null>(null);

    const [contractInfo, setContractInfo] = useState<ContractInfo>(INIT_CONTRACT_INFO);
    const [nftContractInfo, setNftContractInfo] = useState<Cw721ContractInfo>(INIT_NFT_CONTRACT_INFO);
    const [totalNfts, setTotalNfts] = useState<string>('');
    const [myNftList, setMyNftList] = useState<string[]>([]);
    const [ownershipInfo, setOwnershipInfo] = useState<CwOwnershipInfo>(INIT_OWNERSHIP_INFO);
    const [minterInfo, setMinterInfo] = useState<string>(INIT_MINTER_INFO);
    const [blockHeight, setBlockHeight] = useState<string>('0');
    const [nftApprovalInfo, setNftApprovalInfo] = useState<Cw721Approval>(INIT_NFT_APPROVAL);
    const [minter, setMinter] = useState<string>('');
    const [nftDatas, setNftDatas] = useState<Cw721NftInfo[]>([]);

    const [contractAddress, setContractAddress] = useState<string>('');
    const [selectMenu, setSelectMenu] = useState<IMenuItem>(INIT_SELECT_MENU);

    // Mint
    const [mintRecipientAddress, setMintRecipientAddress] = useState<string>('');
    const [mintBaseURI, setMintBaseURI] = useState<string>('');
    const [mintStartTokenId, setMintStartTokenId] = useState<string>('');
    const [mintEndTokenId, setMintEndTokenId] = useState<string>('');
    const [mintList, setMintList] = useState<{ token_id: string; token_uri: string; id: string; isAlreadyMint: boolean }[]>(INIT_MINT_LIST);
    const [alreadyMintList, setAlreadyMintList] = useState<string[]>([]);
    const [notYetMintList, setNotYetMintList] = useState<string[]>([]);

    // Burn
    const [burnList, setBurnList] = useState<string>('');

    // Transfer
    const [transfer, setTransfer] = useState<IExecuteTransfer[]>([{ ...INIT_TRANSFER }]);
    const [approveInfoById, setApproveInfoById] = useState<Record<string, boolean>>({});

    // Approve
    const [approveRecipientAddress, setApproveRecipientAddress] = useState<string>('');
    const [approveTokenId, setApproveTokenId] = useState<string>('');
    const [approveType, setApproveType] = useState<string>('Height');
    const [approveValue, setApproveValue] = useState<string>('');

    // Revoke
    const [revokeAddress, setRevokeAddress] = useState<string>('');
    const [revokeTokenId, setRevokeTokenId] = useState<string>('');

    const clearInfo = () => {
        setContractInfo(INIT_CONTRACT_INFO);
        setNftContractInfo(INIT_NFT_CONTRACT_INFO);
    };

    const clearForm = () => {
        setContractExist(null);
        setContractInfo(INIT_CONTRACT_INFO);
        setNftContractInfo(INIT_NFT_CONTRACT_INFO);

        setContractAddress('');
        setSelectMenu(INIT_SELECT_MENU);

        setMintRecipientAddress('');
        setMintBaseURI('');
        setMintStartTokenId('');
        setMintEndTokenId('');
        setMintList(INIT_MINT_LIST);
    };

    const clearSelectMenu = () => {
        setSelectMenu(INIT_SELECT_MENU);
    };

    const clearMintForm = () => {
        setMintBaseURI('');
        setMintRecipientAddress('');
        setMintStartTokenId('');
        setMintEndTokenId('');
        setMintList(INIT_MINT_LIST);
        setNftDatas([]);
        setAlreadyMintList([]);
        setNotYetMintList([]);
    };

    const clearBurnForm = () => {
        setBurnList('');
        setNftDatas([]);
    };

    const clearTransferForm = () => {
        setTransfer([{ ...INIT_TRANSFER }]);
        setApproveInfoById({});
    };

    const clearApproveForm = () => {
        setApproveRecipientAddress('');
        setApproveTokenId('');
        setApproveType('Height');
        setApproveValue('');
    };

    const clearRevokeForm = () => {
        setRevokeAddress('');
        setRevokeTokenId('');
    };

    useEffect(() => {
        clearForm();
    }, [address]);

    return (
        <CW721ExecuteContext.Provider
            value={{
                contractExist,
                setContractExist,

                contractInfo,
                setContractInfo,

                nftContractInfo,
                setNftContractInfo,

                totalNfts,
                setTotalNfts,

                myNftList,
                setMyNftList,

                ownershipInfo,
                setOwnershipInfo,

                minterInfo,
                setMinterInfo,

                blockHeight,
                setBlockHeight,

                nftApprovalInfo,
                setNftApprovalInfo,

                minter,
                setMinter,

                nftDatas,
                setNftDatas,

                clearInfo,

                contractAddress,
                setContractAddress,

                selectMenu,
                setSelectMenu,

                // Mint
                mintRecipientAddress,
                setMintRecipientAddress,

                mintBaseURI,
                setMintBaseURI,

                mintStartTokenId,
                setMintStartTokenId,

                mintEndTokenId,
                setMintEndTokenId,

                mintList,
                setMintList,

                alreadyMintList,
                setAlreadyMintList,

                notYetMintList,
                setNotYetMintList,

                // Burn
                burnList,
                setBurnList,

                // Transfer
                transfer,
                setTransfer,

                approveInfoById,
                setApproveInfoById,

                // Approve
                approveRecipientAddress,
                setApproveRecipientAddress,

                approveTokenId,
                setApproveTokenId,

                approveType,
                setApproveType,

                approveValue,
                setApproveValue,

                // Revoke
                revokeAddress,
                setRevokeAddress,

                revokeTokenId,
                setRevokeTokenId,

                clearForm,
                clearSelectMenu,
                clearMintForm,
                clearBurnForm,
                clearTransferForm,
                clearApproveForm,
                clearRevokeForm
            }}
        >
            {children}
        </CW721ExecuteContext.Provider>
    );
};

export const useCW721Execute = (): CW721ExecuteContextProps => {
    const context = useContext(CW721ExecuteContext);
    if (!context) {
        throw new Error('useCW721Execute must be used within a CW721ExecuteProvider');
    }
    return context;
};
