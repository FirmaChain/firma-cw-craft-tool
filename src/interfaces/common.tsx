export interface IMenuItem {
    value: string;
    label: string;
    isDisabled?: boolean;
}

export interface AddContractInfo {
    type: 'cw20' | 'cw721';
    address: string;
    contractAddress: string;
    name: string;
    symbol: string;
    label: string;
}

export interface ContractInfoFromDB extends AddContractInfo {
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}

export interface FetchContractResult {
    success: boolean;
    error: null | any;
    data: ContractInfoFromDB[];
}
