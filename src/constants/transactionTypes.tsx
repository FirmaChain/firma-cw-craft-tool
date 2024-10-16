export const MINT = {
    key: 'mint',
    value: 'Mint'
};

export const TRANSFER = {
    key: 'transfer',
    value: 'Transfer'
};

export const TRANSFER_FROM = {
    key: 'transfer_from',
    value: 'TransferFrom'
};

export const BURN = {
    key: 'burn',
    value: 'Burn'
};

export const BURN_FROM = {
    key: 'burn_from',
    value: 'BurnFrom'
};

export const INCREASE_ALLOWANCE = {
    key: 'increase_allowance',
    value: 'IncreaseAllowance'
};

export const DECREASE_ALLOWANCE = {
    key: 'decrease_allowance',
    value: 'DecreaseAllowance'
};

export const UPDATE_MINTER = {
    key: 'update_minter',
    value: 'UpdateMinter'
};

export const UPDATE_MARKETING = {
    key: 'update_marketing',
    value: 'UpdateMarketing'
};

export const UPLOAD_LOGO = {
    key: 'upload_logo',
    value: 'UpdateLogo'
};

export const CW20_TRANSACTION_TYPES = [
    MINT,
    TRANSFER,
    TRANSFER_FROM,
    BURN,
    BURN_FROM,
    INCREASE_ALLOWANCE,
    DECREASE_ALLOWANCE,
    UPDATE_MINTER,
    UPDATE_MARKETING,
    UPLOAD_LOGO
];

//? For CW721 TX types, may be wrong
export const TRANSFER_NFT = {
    key: 'transfer_nft',
    value: 'Transfer'
};

export const SEND_NFT = {
    key: 'send_nft',
    value: 'Send'
};

export const APPROVE = {
    key: 'approve',
    value: 'Approve'
};

export const REVOKE = {
    key: 'revoke',
    value: 'Revoke'
};

export const APPROVE_ALL = {
    key: 'approve_all',
    value: 'ApproveAll'
};

export const REVOKE_ALL = {
    key: 'revoke_all',
    value: 'RevokeAll'
};

export const QUERY_OWNER = {
    key: 'owner_of',
    value: 'QueryOwner'
};

export const QUERY_TOKEN_INFO = {
    key: 'nft_info',
    value: 'QueryTokenInfo'
};

export const UPDATE_OWNERSHIP = {
    key: 'update_ownership',
    value: 'UpdateOwnership'
};

export const CW721_TRANSACTION_TYPES = [
    MINT,
    BURN,
    TRANSFER_NFT,
    SEND_NFT,
    APPROVE,
    REVOKE,
    APPROVE_ALL,
    REVOKE_ALL,
    QUERY_OWNER,
    QUERY_TOKEN_INFO,
    UPDATE_OWNERSHIP
];
