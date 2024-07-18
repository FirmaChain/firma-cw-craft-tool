export const addNanoSeconds = (value: string) => {
    return `${value}000000`;
};

export const removeNanoSeconds = (value: string) => {
    return value.slice(0, -6);
};

export const getCurrentUTCTimeStamp = (): string => {
    return Math.floor(new Date().getTime()).toString();
};