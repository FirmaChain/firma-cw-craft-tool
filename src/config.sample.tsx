import { FirmaConfig } from '@firmachain/firma-js';

export const CRAFT_CONFIGS = {
    FIRMACHAIN_CONFIG: FirmaConfig.MainNetConfig,
    DEFAULT_FEE: 30000,
    DEFAULT_GAS: 300000,
    INSTANTIATE_WALLET_FEE: 1100,
    INSTANTIATE_LENGTH_FEE: 1000,
    BULK_FEE: 15000,
    IS_DEFAULT_GAS: false,
    CRAFT_SERVER_URI: '',
    GRAPHQL_CONFIG: {
        URI: 'https://:8080/v1/graphql'
    },
    BLOCK_EXPLORER: 'https://explorer.firmachain.dev',
    CW20: {
        BASIC_CODE_ID: '',
        ADVANCED_CODE_ID: '',
        TYPE: 'cw20'
    },
    CW721: {
        BASIC_CODE_ID: '',
        ADVANCED_CODE_ID: '',
        TYPE: 'cw721'
    },
    STATION_DOWNLOAD_URL: {
        WEB: '',
        IOS: '',
        ANDROID: ''
    },
    TRANSACTION_MEMO: '',
    GUIDE_URL: ''
};
