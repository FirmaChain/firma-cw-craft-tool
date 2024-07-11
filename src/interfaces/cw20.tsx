export interface ITransaction {
    hash: string;
    type: string;
    height: string;
    address: string;
    success: boolean;
    timestamp: string;
}

export interface IMessages {
    messages: IMessage[];
}

export interface IMessage {
    msg: IMsg;
    '@type': string;
    funds: any[];
    sender: string;
    contract: string;
}

export interface IMsg {
    [key: string]: any;
}
