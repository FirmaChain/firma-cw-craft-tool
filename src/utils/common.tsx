import { Expires } from '@firmachain/firma-js';
import { CW20_TRANSACTION_TYPES, CW721_TRANSACTION_TYPES } from '../constants/transactionTypes';
import { IMsg } from '../interfaces/cw20';
import qs from 'qs';

export const addCommasToNumberString = (numberString: string): string => {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const validateSymbol = (symbol: string): boolean => {
    const symbolRegex = /^[a-zA-Z]{3,12}$/;
    if (!symbolRegex.test(symbol)) {
        return false;
    }

    return true;
};

export const getApplyDecimalsAmount = (amount: string, decimals: string): string => {
    const zerosToAdd = parseInt(decimals, 10);

    if (amount.includes('.')) {
        const [integerPart, fractionalPart] = amount.split('.');
        const fractionalLength = fractionalPart.length;
        if (fractionalLength >= zerosToAdd) {
            return integerPart + fractionalPart.slice(0, zerosToAdd);
        }
        return integerPart + fractionalPart + '0'.repeat(zerosToAdd - fractionalLength);
    } else {
        return amount + '0'.repeat(zerosToAdd);
    }
};

export const getUTokenStrFromTokenStr = (numberString: string, decimals: string): string => {
    const convertDecimals = Number(decimals);
    const number = parseFloat(numberString);

    if (isNaN(number)) {
        return numberString;
    }

    const [integerPart, decimalPart] = numberString.split('.');
    const formattedInteger = parseInt(integerPart, 10).toString(); // .toLocaleString('en-US');

    let formattedDecimal = decimalPart ? decimalPart.slice(0, convertDecimals) : '';

    let formattedNumber = formattedInteger;

    if (formattedDecimal) {
        formattedNumber += '.' + formattedDecimal;
    }

    return formattedNumber;
};

export const getTokenStrFromUTokenStr = (amount: string, decimals: string) => {
    const decimalsNumber = parseInt(decimals, 10);
    const pointIndex = amount.length - decimalsNumber;

    let result = '';
    if (pointIndex > 0) {
        result = amount.slice(0, pointIndex) + '.' + amount.slice(pointIndex);
    } else {
        result = '0.' + '0'.repeat(Math.abs(pointIndex)) + amount;
    }

    if (result.includes('.')) {
        result = result.replace(/\.?0+$/, '');
    }

    const [integerPart, decimalPart] = result.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    result = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return result;
};

export const shortenAddress = (address: string, startLength: number = 6, endLength: number = 6) => {
    if (address.length <= startLength + endLength) {
        return address;
    }

    const start = address.slice(0, startLength);
    const end = address.slice(-endLength);
    return `${start}...${end}`;
};

export const determineMsgTypeAndSpender = (messages: IMsg[]): { type: string; sender: string }[] => {
    return messages.map((item) => {
        const msgKey = Object.keys(item.msg)[0];
        const messageType =
            CW20_TRANSACTION_TYPES.find((type) => type.key === msgKey) || CW721_TRANSACTION_TYPES.find((type) => type.key === msgKey);
        const sender = item.sender;

        return {
            type: messageType ? messageType.value : 'Unknown',
            sender: sender
        };
    });
};

export const determineMsgType = (data: IMsg[]): string[] => {
    return data.map((item) => {
        const msgKey = Object.keys(item.msg)[0];
        const messageType = CW20_TRANSACTION_TYPES.find((type) => type.key === msgKey);
        return messageType ? messageType.value : 'Unknown';
    });
};

export const compareStringsAsNumbers = (str1: string, str2: string) => {
    const length = Math.max(str1.length, str2.length);
    const paddedStr1 = str1.padStart(length, '0');
    const paddedStr2 = str2.padStart(length, '0');

    if (paddedStr1 < paddedStr2) return -1;
    if (paddedStr1 > paddedStr2) return 1;

    return 0;
};

export const getTimeAgo = (timestampStr: string) => {
    const now = new Date();
    const timestamp = new Date(timestampStr);

    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;

    const localTimestamp = new Date(timestamp.getTime() - timezoneOffset);
    const delta = now.getTime() - localTimestamp.getTime();

    const seconds = Math.floor(delta / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return `${seconds} s ago`;
    } else if (minutes < 60) {
        return `${minutes} m ago`;
    } else if (hours < 24) {
        return `${hours} h ago`;
    } else if (days < 30) {
        return `${days} d ago`;
    } else if (months < 12) {
        return `${months} mo ago`;
    } else {
        return `${years} y ago`;
    }
};

export const addStringNumbers = (number1: string, number2: string) => {
    while (number1.length < number2.length) {
        number1 = '0' + number1;
    }
    while (number2.length < number1.length) {
        number2 = '0' + number2;
    }

    let carry = 0;
    let result = '';

    for (let i = number1.length - 1; i >= 0; i--) {
        let sum = parseInt(number1[i]) + parseInt(number2[i]) + carry;
        if (sum >= 10) {
            carry = 1;
            sum -= 10;
        } else {
            carry = 0;
        }
        result = sum.toString() + result;
    }

    if (carry > 0) {
        result = carry.toString() + result;
    }

    return result;
};

export const omitKey = <T extends object, K extends keyof T>(key: K, obj: T): Omit<T, K> => {
    const { [key]: omitted, ...rest } = obj;
    return rest;
};

export const copyToClipboard = async (text: string): Promise<void | string> => {
    if (!navigator.clipboard) {
        //? If clipboard api is not provided (http or some reasons)

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;

            //? Make hidden textarea to copy text
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy method failed. Try latest browser.', err);
            }

            document.body.removeChild(textArea);
        } catch (error) {
            return 'Failed to copy text to clipboard';
        }
    } else {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Failed to copy text to clipboard', error);
            return 'Failed to copy text to clipboard';
        }
    }
};

export const parseExpires = (data: string) => {
    const parsedData: Expires = JSON.parse(data);

    if ('at_time' in parsedData) {
        // Convert nanoseconds to milliseconds
        const date = new Date(Number(parsedData.at_time) / 1_000_000);
        return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul', hour12: true });
    }

    if ('never' in parsedData) {
        return 'No Expiration';
    }

    if ('at_height' in parsedData) {
        return `${parsedData.at_height.toLocaleString()} Block`;
    }

    return '';
};

export const parseAmountWithDecimal2 = (amount: string, decimals: string, isPreview?: boolean) => {
    const decimalsNumber = parseInt(decimals, 10);
    const pointIndex = amount.length - decimalsNumber;

    let result = '';
    if (pointIndex > 0) {
        result = amount.slice(0, pointIndex) + '.' + amount.slice(pointIndex);
    } else {
        result = '0.' + '0'.repeat(Math.abs(pointIndex)) + amount;
    }

    const [integerPart, decimalPart = ''] = result.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedDecimalPart = '';

    if (isPreview) {
        // If decimals <= 2, show all decimals, else show only 2 decimals
        formattedDecimalPart = decimalPart.slice(0, Math.min(decimalsNumber, 2)).padEnd(Math.min(decimalsNumber, 2), '0');
    } else {
        // Show all decimal places
        formattedDecimalPart = decimalPart.padEnd(decimalsNumber, '0');
    }

    // Only append decimal part if there are decimals
    result = decimalsNumber > 0 ? `${formattedIntegerPart}.${formattedDecimalPart}` : formattedIntegerPart;

    return result;
};

export const checkImageUrl = (url: string, onValid: () => void, onInvalid: () => void) => {
    if (url) {
        const img = new Image();
        img.src = url;
        img.onload = () => onValid();
        img.onerror = () => onInvalid();
    } else {
        onValid();
    }
};

export const openLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

export const getRandomTimeInMs = (startSecond: number, endSecond: number): number => {
    const startMs = startSecond * 1000;
    const endMs = endSecond * 1000;

    const randomMs = Math.random() * (endMs - startMs) + startMs;

    return Math.floor(randomMs);
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const scrollToTop = (behavior?: ScrollBehavior) => {
    const _behavior = (behavior || 'instant') as ScrollBehavior;

    const scrollbarContent = document.getElementsByClassName('main-scrollbar');

    if (scrollbarContent[0]) {
        scrollbarContent[0].scrollTo({ top: 0, left: 0, behavior: _behavior });
    }
};

export const checkMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobileUserAgent =
        /android|avantgo|blackberry|iemobile|ipad|iphone|ipod|minimo|mobile|opera mini|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|silk|symbian|tablet|up\.browser|up\.link|webos|wos/i.test(
            userAgent
        );

    return isMobileUserAgent;
};

export const stringifyUrl = ({ url, query }: { url: string; query: Record<string, any> }, options?: qs.IStringifyOptions) => {
    const q = qs.stringify(query, options);
    return url + (q ? '?' + q : '');
};
