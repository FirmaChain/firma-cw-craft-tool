import { FirmaUtil } from "@firmachain/firma-js";

// Add commas to integers
export const addCommasToNumberString = (numberString: string): string => {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  if (address.length <= (startLength + endLength)) {
    return address;
  }

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}

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