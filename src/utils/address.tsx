import { FirmaUtil } from '@firmachain/firma-js';

export const isValidAddress = (address: string) => {
    return FirmaUtil.isValidAddress(address);
};

export const shortenAddress = (address: string, startLength: number = 6, endLength: number = 6) => {
    if (address.length <= startLength + endLength) {
        return address;
    }

    const start = address.slice(0, startLength);
    const end = address.slice(-endLength);
    return `${start}...${end}`;
};
