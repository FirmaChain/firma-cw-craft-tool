interface IRawData {
    code: number;
    gasUsed: number;
    gasWanted: number;
    height: number;
    rawLog: string;
    transactionHash: string;
}

interface ISignData {
    address: string;
    chainId: string;
    rawData: string;
}

export const getTransactionStatusCode = (signData: string) => {
    console.log(JSON.parse(signData))
    const parseSignData = JSON.parse(signData) as ISignData;
    const parseRawData = JSON.parse(parseSignData.rawData) as IRawData;

    return parseRawData.code;
};

export const getTransactionHash = (signData: string) => {
    const parseSignData = JSON.parse(signData) as ISignData;
    const parseRawData = JSON.parse(parseSignData.rawData) as IRawData;

    return parseRawData.transactionHash;
};