const { defineConfig } = require("cypress");

// .env 파일 로드
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 환경변수를 config에 추가
      config.env = {
        ...config.env,
        "MNEMONIC_5": process.env.MNEMONIC_5,
        "PASSWORD": process.env.PASSWORD,
        "ADDRESS_5": process.env.ADDRESS_5,
        "ADDRESS_6": process.env.ADDRESS_6,
        "ADDRESS_7": process.env.ADDRESS_7,
        "ADDRESS_20": process.env.ADDRESS_20,
        "MNEMONIC_6": process.env.MNEMONIC_6,
        "MNEMONIC_20": process.env.MNEMONIC_20,
        "MNEMONIC_7": process.env.MNEMONIC_7,
      };
      return config;
    },
  },

});
