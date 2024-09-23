export const WALLET_ADDRESS_REGEX = /[^a-zA-Z0-9]/g;

export const NUMBERS_WITH_COMMA = /[^0-9,]/g;

export const INT_NUMBERS = /[^0-9]/g;

export const FLOAT_NUMBER = /[^0-9.]/g;

export const ONLY_ENGLISH = /[^a-zA-Z]/g;

export const DEFAULT_INPUT_REGEX = /[^\p{L}\p{N}\p{P}\p{S}\s]|[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gu;

export const ONE_TO_MINE = /[^1-9]/g;
