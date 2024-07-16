import { FirmaUtil } from '@firmachain/firma-js';
import { CW20_TRANSACTION_TYPES } from '../constants/cw20Types';
import { IMsg } from '../interfaces/cw20';

export const addCommasToNumberString = (numberString: string): string => {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const validateSymbol = (symbol: string): boolean => {
    const symbolRegex = /^[a-zA-Z\-]{3,12}$/;
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

// getUTokenStrFromTokenStr
export const getUTokenStrFromTokenStr = (numberString: string, decimals: string): string => {
    const convertDecimals = Number(decimals);
    const number = parseFloat(numberString);

    if (isNaN(number)) {
        return numberString;
    }

    const [integerPart, decimalPart] = numberString.split('.');
    const formattedInteger = parseInt(integerPart, 10).toLocaleString('en-US');

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
        const messageType = CW20_TRANSACTION_TYPES.find((type) => type.key === msgKey);
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

export const isValidAddress = (address: string) => {
    return FirmaUtil.isValidAddress(address);
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

export function addDecimals(...decimalStrings: string[]): string {
    let integerSum = 0;
    let decimalSum = 0;
    let maxDecimalLength = 0;

    for (let decimalStr of decimalStrings) {
        let integerPart = '0';
        let decimalPart = '0';

        const [_integerPart, _decimalPart] = decimalStr.split('.');

        if (!isNaN(Number(_integerPart))) integerPart = _integerPart;
        if (!isNaN(Number(_decimalPart))) decimalPart = _decimalPart;

        const parsedInt = parseInt(integerPart, 10);

        integerSum += isNaN(parsedInt) ? 0 : parsedInt;

        if (decimalPart) {
            maxDecimalLength = Math.max(maxDecimalLength, decimalPart.length);
            decimalSum += parseInt(decimalPart, 10) * Math.pow(10, -decimalPart.length);
        }
    }

    if (decimalSum === 0) return String(integerSum);

    const total = (integerSum + decimalSum).toFixed(maxDecimalLength);
    return Number(total) === 0 ? '0' : total;
}

export function compareAmounts(maxAmount: string, totalAmount: string): boolean {
    // Return false if maxAmount is an empty string
    // if (maxAmount === '') {
    //     return false;
    // }

    // Helper function to split a number into integer and decimal parts
    const splitNumber = (num: string) => {
        let [integerPart, decimalPart] = num.split('.');
        decimalPart = decimalPart || ''; // Default to an empty string if there's no decimal part
        return [integerPart, decimalPart];
    };

    const [maxInteger, maxDecimal] = splitNumber(maxAmount);
    const [totalInteger, totalDecimal] = splitNumber(totalAmount);

    // Compare integer parts first
    if (maxInteger.length > totalInteger.length) {
        return false;
    } else if (maxInteger.length < totalInteger.length) {
        return true;
    }

    // If integer parts are of the same length, compare digit by digit
    for (let i = 0; i < maxInteger.length; i++) {
        if (maxInteger[i] > totalInteger[i]) {
            return false;
        } else if (maxInteger[i] < totalInteger[i]) {
            return true;
        }
    }

    // If integer parts are the same, compare decimal parts
    const maxDecimalLength = maxDecimal.length;
    const totalDecimalLength = totalDecimal.length;
    const maxLength = Math.max(maxDecimalLength, totalDecimalLength);

    for (let i = 0; i < maxLength; i++) {
        const maxDigit = i < maxDecimalLength ? maxDecimal[i] : '0';
        const totalDigit = i < totalDecimalLength ? totalDecimal[i] : '0';

        if (maxDigit > totalDigit) {
            return false;
        } else if (maxDigit < totalDigit) {
            return true;
        }
    }

    // If all digits are the same, return false
    return false;
}

export const copyToClipboard = async (text: string): Promise<void | string> => {
    if (!navigator.clipboard) {
        //   console.error('Clipboard API is not available');
        return 'Clipboard API is not available';
    }

    try {
        await navigator.clipboard.writeText(text);
        // console.log('Text copied to clipboard');
    } catch (error) {
        console.error('Failed to copy text to clipboard', error);
        return 'Failed to copy text to clipboard';
    }
};
