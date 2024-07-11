import { FirmaConfig } from '@firmachain/firma-js';

export const CRAFT_CONFIGS = {
    MAINNET: {
        FIRMACHAIN_CONFIG: FirmaConfig.MainNetConfig,
        LEDGER_FEE: 30000,
        LEDGER_GAS: 300000,
        IS_DEFAULT_GAS: false,
        CRAFT_SERVER_CONFIG: {
            URI: 'https://:3005/api'
        }
    },
    TESTNET: {
        FIRMACHAIN_CONFIG: FirmaConfig.TestNetConfig,
        LEDGER_FEE: 30000,
        LEDGER_GAS: 300000,
        IS_DEFAULT_GAS: false,
        CRAFT_SERVER_CONFIG: {
            URI: 'https://:3005/api'
        }
    }
};
