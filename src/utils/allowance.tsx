import { Expires, ExpiresAtHeight, ExpiresAtTime, ExpiresNever } from "@firmachain/firma-js";

export const isAtHeight = (expires: Expires): expires is { at_height: number } => {
    return (expires as ExpiresAtHeight).at_height !== undefined
};

export const isAtTime = (expires: Expires): expires is { at_time: string } => {
    return (expires as ExpiresAtTime).at_time !== undefined;
};

export const isNever = (expires: Expires): expires is { never: {} } => {
    return (expires as ExpiresNever).never !== undefined;
};