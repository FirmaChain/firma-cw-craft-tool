import { FirmaConfig } from '@firmachain/firma-js';

export const CRAFT_CONFIGS = {
    USE_WALLET_CONNECT: true,
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
        TYPE: 'cw20',
        MEMO: 'This is a token (CW20) contract instantiated by FIRMA CRAFT.'
    },
    CW721: {
        BASIC_CODE_ID: '',
        ADVANCED_CODE_ID: '',
        TYPE: 'cw721',
        MEMO: 'This is a NFT (CW721) contract instantiated by FIRMA CRAFT.'
    },
    STATION_DOWNLOAD_URL: {
        WEB: '',
        IOS: '',
        ANDROID: ''
    }
};
