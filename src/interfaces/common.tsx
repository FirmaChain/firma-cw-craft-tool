export interface IMenuItem {
    value: string;
    label: string;
    isDisabled?: boolean;
}

export interface AddContractReq {
    type: 'cw20' | 'cw721';
    address: string;
    contractAddress: string;
}

export interface AddContractInfo extends AddContractReq {
    name: string;
    symbol: string;
    label: string;
    tokenLogoUrl: string;
}

export interface ContractInfoFromDB extends AddContractInfo {
    createdAt?: string;
    updatedAt?: string;
    isVerified?: boolean;
    _id?: string;
}

// export interface ContractInfoFromSearch extends ContractInfoFromDB {
//     tokenLogoUrl: string;
// }

export interface FetchContractResult {
    success: boolean;
    error: null | any;
    data: ContractInfoFromDB[];
}

export interface SearchContractResult {
    success: boolean;
    error: null | any;
    data: Record<string, ContractInfoFromDB[] | null>;
}

export interface UpdateTokenLogo {
    type: 'cw20' | 'cw721';
    contractAddress: string;
    // tokenLogoUrl: string;
}

export interface RefreshTokenRes {
    code: number;
    message: string;
    success: boolean;
    error: any;
    result: {
        token: string;
    };
}

export interface DeleteContractFromDBReq {
    type: 'cw20' | 'cw721';
    contractAddress: string;
    address: string;
    hash: string;
}

export interface DeleteContractFromDBRes {
    success: boolean;
    error: string | null;
    data: null;
}

export interface UpdateContractOwnerReq {
    type: 'cw20' | 'cw721';
    contractAddress: string;
    address: string;
}

export interface UpdateContractOwnerRes {
    success: boolean;
    error: string | null;
    data: ContractInfoFromDB | null;
}
