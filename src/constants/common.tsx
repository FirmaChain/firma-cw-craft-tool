export const NETWORKS = ["MAINNET", "TESTNET"] as const;
export type NETWORK_TYPE = typeof NETWORKS[number];

export const CW = ["CW20", "CW721"] as const;
export type CW_TYPE = typeof CW[number];

export const MENUS = ["INSTANTAITE", "EXECUTE", "SEARCH", "MYTOKENS"] as const;
export type MENU_TYPE = typeof MENUS[number];

export const CW20_MODE = ["BASIC", "ADVANCED"] as const;
export type CW20_MODE_TYPE = typeof CW20_MODE[number];