# firma-cw-craft-tool

![firma-craft-title](https://github.com/user-attachments/assets/4f437b58-d129-47bd-83d5-f2ddf447f2d6)

<br/>

## Project Overview
Firma CW craft tool is a desktop application designed to help manage tokens based on the CW20 and CW721 standards, allowing users to easily issue their own tokens and NFTs. With an intuitive interface, it allows users to create and manage tokens and NFTs without a deep understanding of complex blockchain technology.

<br/>

## Features
### CW20
CW20 is a token standard used in the CosmWasm smart contract platform, providing specifications for issuing, transferring, and managing tokens on blockchain networks based on the Cosmos SDK. Similar to Ethereum's ERC20 standard, CW20 offers the following key functions and interfaces:

- Instantiate
  - Deploy tokens by setting the name, symbol, initial issuance amount, and issuer of the token.

- Mint
  - Issue additional tokens to a specific address.

- Burn
  - Burn tokens to reduce the total supply.

- Allowance
  - Increase or decrease the amount another address is allowed to use on your behalf.

- Transfer
  - Transfer tokens to another address.

<br/>

### CW721
Coming Soon

<br/>

## Getting Started
This section explains how to set up and run the project locally.

### Installation
Clone the project repository and install the required dependencies.

```bash
git clone https://github.com/FirmaChain/firma-cw-craft-tool.git
cd firma-cw-craft-tool
npm install
```

### Set Config
1. Create the config.tsx file using the following command:
    ```bash
    cp config.sample.tsx config.tsx
    ```

2. Fill in the empty environment variable information:

### Running
To run the project after installing the packages, execute the following command:

```bash
npm run start
```

<br/>

## URL
For more information, please refer to the following URLs:
- CW20 Standard: [CW20 Standard](https://github.com/CosmWasm/cosmwasm-plus/blob/main/packages/cw20/README.md)
- CW20 Spec: [CW20 Spec](https://github.com/CosmWasm/cosmwasm-plus/blob/main/packages/cw20/schema/cw20.json)
