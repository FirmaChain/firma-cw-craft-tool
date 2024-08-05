import { FirmaConfig } from '@firmachain/firma-js';

export const CRAFT_CONFIGS = {
    MAINNET: {
        FIRMACHAIN_CONFIG: FirmaConfig.MainNetConfig,
        DEFAULT_FEE: 30000,
        DEFAULT_GAS: 300000,
        INSTANTIATE_FEE: 12000,
        BULK_FEE: 15000,
        IS_DEFAULT_GAS: false,
        CRAFT_SERVER_URI: '',
        GRAPHQL_CONFIG: {
            URI: 'https://:8080/v1/graphql'
        },
        GRAPHQL_API_KEY: '',
        BLOCK_EXPLORER: 'https://explorer.firmachain.dev',
        CW20: {
            BASIC_CODE_ID: '',
            ADVANCED_CODE_ID: ''
        },
        CW721: {
            BASIC_CODE_ID: '',
            ADVANCED_CODE_ID: ''
        }
    },
    TESTNET: {
        FIRMACHAIN_CONFIG: FirmaConfig.TestNetConfig,
        DEFAULT_FEE: 30000,
        DEFAULT_GAS: 300000,
        INSTANTIATE_FEE: 12000,
        BULK_FEE: 15000,
        IS_DEFAULT_GAS: false,
        CRAFT_SERVER_URI: '',
        GRAPHQL_CONFIG: {
            URI: 'https://:8080/v1/graphql'
        },
        GRAPHQL_API_KEY: '',
        BLOCK_EXPLORER: 'https://explorer-testnet.firmachain.dev',
        CW20: {
            BASIC_CODE_ID: '',
            ADVANCED_CODE_ID: ''
        },
        CW721: {
            BASIC_CODE_ID: '',
            ADVANCED_CODE_ID: ''
        }
    },
    COMMON: {
        STATION_DOWNLOAD_URL: {
            WEB: '',
            IOS: '',
            ANDROID: ''
        }
    }
};
