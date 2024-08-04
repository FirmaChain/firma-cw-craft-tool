//? fix invliad typo case of returning 0.0000-1 (expected -0.000001)
export const getTokenAmountFromUToken = (amount: string, decimals: string) => {
    // Check if the amount is negative
    const isNegative = amount.startsWith('-');
    // Remove the negative sign for processing
    const cleanAmount = isNegative ? amount.slice(1) : amount;

    const amountLength = cleanAmount.length;
    const decimalIndex = amountLength - parseInt(decimals);

    let result = '0';
    if (decimalIndex <= 0) {
        result = '0.' + '0'.repeat(Math.abs(decimalIndex)) + cleanAmount;
    } else {
        result = cleanAmount.slice(0, decimalIndex) + '.' + cleanAmount.slice(decimalIndex);
    }

    if (result.includes('.')) {
        // Update regular expression to handle trailing zeroes after the decimal
        result = result.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    }

    // Add the negative sign back if it was negative
    if (isNegative) {
        result = '-' + result;
    }

    return result;
};

// export const getTokenAmountFromUToken = (amount: string, decimals: string) => {
//     const amountLength = amount.length;
//     const decimalIndex = amountLength - parseInt(decimals);

//     let result = '0';
//     if (decimalIndex <= 0) {
//         result = '0.' + '0'.repeat(Math.abs(decimalIndex)) + amount;
//     } else {
//         result = amount.slice(0, decimalIndex) + '.' + amount.slice(decimalIndex);
//     }

//     if (result.includes('.')) {
//         result = result.replace(/\.?0+$/, '');
//     }

//     return result;
// };

export const getUTokenAmountFromToken = (amount: string, decimals: string) => {
    const [integerPart, decimalPart] = amount.split('.');
    const decimalZeros = parseInt(decimals) - (decimalPart ? decimalPart.length : 0);

    let result = integerPart + (decimalPart || '');
    if (decimalZeros > 0) {
        result = result + '0'.repeat(decimalZeros);
    }

    result = result.replace(/^0+/, '');

    return result || '0';
};

export const formatWithCommas = (amount: string) => {
    const [integerPart, decimalPart] = amount.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (decimalPart !== undefined) {
        return `${formattedIntegerPart}.${decimalPart}`;
    } else {
        return formattedIntegerPart;
    }
};

export const addStringAmount = (amount1: string, amount2: string) => {
    const [intPart1, decPart1] = amount1.split('.');
    const [intPart2, decPart2] = amount2.split('.');

    const decLength = Math.max(decPart1?.length || 0, decPart2?.length || 0);
    const dec1 = (decPart1 || '').padEnd(decLength, '0');
    const dec2 = (decPart2 || '').padEnd(decLength, '0');

    let carry = 0;
    let decResult = '';
    for (let i = decLength - 1; i >= 0; i--) {
        let sum = parseInt(dec1[i]) + parseInt(dec2[i]) + carry;
        carry = Math.floor(sum / 10);
        decResult = (sum % 10) + decResult;
    }

    const maxLength = Math.max(intPart1.length, intPart2.length);
    const int1 = intPart1.padStart(maxLength, '0');
    const int2 = intPart2.padStart(maxLength, '0');
    let intResult = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = parseInt(int1[i]) + parseInt(int2[i]) + carry;
        carry = Math.floor(sum / 10);
        intResult = (sum % 10) + intResult;
    }
    if (carry) {
        intResult = carry + intResult;
    }

    return decResult ? `${intResult}.${decResult}` : intResult;
};

export const subtractStringAmount = (amount1: string, amount2: string) => {
    const compareStrings = (str1: string, str2: string): boolean => {
        const [intPart1, decPart1 = ''] = str1.split('.');
        const [intPart2, decPart2 = ''] = str2.split('.');

        if (intPart1.length !== intPart2.length) {
            return intPart1.length < intPart2.length;
        }

        if (intPart1 !== intPart2) {
            return intPart1 < intPart2;
        }

        return decPart1 < decPart2;
    };

    const [intPart1, decPart1] = amount1.split('.');
    const [intPart2, decPart2] = amount2.split('.');

    const decLength = Math.max(decPart1?.length || 0, decPart2?.length || 0);
    const dec1 = (decPart1 || '').padEnd(decLength, '0');
    const dec2 = (decPart2 || '').padEnd(decLength, '0');

    let isNegative = compareStrings(amount1, amount2);
    if (isNegative) {
        [amount1, amount2] = [amount2, amount1];
    }

    const [newIntPart1, newDecPart1] = amount1.split('.');
    const [newIntPart2, newDecPart2] = amount2.split('.');

    const newDec1 = (newDecPart1 || '').padEnd(decLength, '0');
    const newDec2 = (newDecPart2 || '').padEnd(decLength, '0');

    let borrow = 0;
    let decResult = '';
    for (let i = decLength - 1; i >= 0; i--) {
        let sub = parseInt(newDec1[i]) - parseInt(newDec2[i]) - borrow;
        if (sub < 0) {
            sub += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        decResult = sub + decResult;
    }

    const maxLength = Math.max(newIntPart1.length, newIntPart2.length);
    const int1 = newIntPart1.padStart(maxLength, '0');
    const int2 = newIntPart2.padStart(maxLength, '0');
    let intResult = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        let sub = parseInt(int1[i]) - parseInt(int2[i]) - borrow;
        if (sub < 0) {
            sub += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        intResult = sub + intResult;
    }

    let result = intResult.replace(/^0+/, '') || '0';
    if (decResult) {
        decResult = decResult.replace(/0+$/, '');
        if (decResult) {
            result += '.' + decResult;
        }
    }

    if (isNegative && result !== '0') {
        result = '-' + result;
    }

    return result;
};

export const compareStringNumbers = (amount1: string, amount2: string) => {
    const isNegative1 = amount1[0] === '-';
    const isNegative2 = amount2[0] === '-';

    if (isNegative1 && !isNegative2) return -1;
    if (!isNegative1 && isNegative2) return 1;

    if (isNegative1 && isNegative2) {
        amount1 = amount1.slice(1);
        amount2 = amount2.slice(1);
        return -compareStringNumbers(amount1, amount2);
    }

    const [intPart1, decPart1 = ''] = amount1.split('.');
    const [intPart2, decPart2 = ''] = amount2.split('.');

    if (intPart1.length > intPart2.length) return 1;
    if (intPart1.length < intPart2.length) return -1;
    if (intPart1 > intPart2) return 1;
    if (intPart1 < intPart2) return -1;

    const maxLength = Math.max(decPart1.length, decPart2.length);
    const paddedDecPart1 = decPart1.padEnd(maxLength, '0');
    const paddedDecPart2 = decPart2.padEnd(maxLength, '0');

    if (paddedDecPart1 > paddedDecPart2) return 1;
    if (paddedDecPart1 < paddedDecPart2) return -1;

    return 0;
};
