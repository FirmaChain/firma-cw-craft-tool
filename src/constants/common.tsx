export const CW_MODES = ['CW20', 'CW721'] as const;
export type CW_MODE_TYPE = (typeof CW_MODES)[number];

export const CONTRACT_MODES = ['BASIC', 'ADVANCED'] as const;
export type CONTRACT_MODE_TYPE = (typeof CONTRACT_MODES)[number];

export const MENUS = ['INSTANTAITE', 'EXECUTE', 'SEARCH', 'MYTOKENS'] as const;
export type MENU_TYPE = (typeof MENUS)[number];

export const TRANSACTION = ['ALL', 'MY'] as const;
export type TRANSACTION_TYPE = (typeof TRANSACTION)[number];
