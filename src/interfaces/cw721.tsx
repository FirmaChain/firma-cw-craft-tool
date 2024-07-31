export interface INftInfo {
    token_id: string;
    token_uri: string;
}

export interface IExecuteMint {
    recipient: string;
    nftInfos: INftInfo[];
}

export interface IExecuteBurn {
    token_ids: string[];
}

export interface IExecuteTransfer {
    recipient: string;
    token_ids: string[];
}

export interface IExecuteApprove {
    recipient: string;
    token_id: string;
    expire: {
        type: string;
        value: string;
    };
}

export interface IExecuteRevoke {
    recipient: string;
    token_id: string;
}

export interface IExecuteApproveAll {
    recipient: string;
    expire: {
        type: string;
        value: string;
    };
}

export interface IExecuteRevokeAll {
    recipient: string;
}

export interface IExecuteUpdateOwnershipTransfer {
    recipient: string;
    expire: {
        type: string;
        value: string;
    }
}