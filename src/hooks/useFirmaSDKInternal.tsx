import { CRAFT_CONFIGS } from '@/config';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { rootState } from '@/redux/reducers';
import { getFeesFromGas } from '@/utils/balance';
import { decryptWallet } from '@/utils/keystore';
import { Cw721Expires, Expires, FirmaWalletService } from '@firmachain/firma-js';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const useFirmaSDKInternal = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { passwordWallet, timeKeyWallet, timeKey } = useSelector((state: rootState) => state.wallet);

    const getWallet = async (password: string) => {
        const walletData = password === '' ? decryptWallet(timeKeyWallet, timeKey) : decryptWallet(passwordWallet, password);
        return await firmaSDK.Wallet.fromPrivateKey(walletData.privateKey);
    };

    const getFctBalance = async (address: string) => {
        try {
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            return fctBalance;
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching FCT Balance'
            });
        }
    };

    // COMMON
    const getCW20MintTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { recipient: string; amount: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw20.getUnsignedTxMint(wallet, contractAddress, bulkTarget.recipient, bulkTarget.amount);
            txList.push(txData);
        }

        return txList;
    };

    const getCW20BurnFromTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { owner: string; amount: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw20.getUnsignedTxBurnFrom(wallet, contractAddress, bulkTarget.owner, bulkTarget.amount);
            txList.push(txData);
        }

        return txList;
    };

    const getCW20TransferTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { recipient: string; amount: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw20.getUnsignedTxTransfer(wallet, contractAddress, bulkTarget.recipient, bulkTarget.amount);
            txList.push(txData);
        }

        return txList;
    };

    const getCW20TransferFromTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { owner: string; recipient: string; amount: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw20.getUnsignedTxTransferFrom(
                wallet,
                contractAddress,
                bulkTarget.owner,
                bulkTarget.recipient,
                bulkTarget.amount
            );
            txList.push(txData);
        }

        return txList;
    };

    const getCW721MintTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { owner: string; token_id: string; extension: {}; token_uri: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw721.getUnsignedTxMint(
                wallet,
                contractAddress,
                bulkTarget.owner,
                bulkTarget.token_id,
                bulkTarget.token_uri
            );
            txList.push(txData);
        }

        return txList;
    };

    const getCW721BurnTxList = async (wallet: FirmaWalletService, contractAddress: string, bulkTargets: { token_id: string }[]) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw721.getUnsignedTxBurn(wallet, contractAddress, bulkTarget.token_id);
            txList.push(txData);
        }

        return txList;
    };

    const getCW721TransferTxList = async (
        wallet: FirmaWalletService,
        contractAddress: string,
        bulkTargets: { recipient: string; token_id: string }[]
    ) => {
        let txList = [];
        for (const bulkTarget of bulkTargets) {
            const txData = await firmaSDK.Cw721.getUnsignedTxTransfer(wallet, contractAddress, bulkTarget.recipient, bulkTarget.token_id);
            txList.push(txData);
        }

        return txList;
    };

    // ESTIMATE GAS
    const getFeesFromGas = (estimatedGas: number) => {
        const fee = Math.ceil(estimatedGas * 0.1);
        return Math.max(fee, CRAFT_CONFIGS.DEFAULT_FEE);
    };

    const getGasEstimationInstantiate = async (admin: string, codeId: string, label: string, msg: string, memo: string) => {
        try {
            const wallet = await getWallet('');
            const result = await firmaSDK.CosmWasm.getGasEstimationInstantiateContract(wallet, admin, codeId, label, msg, [], {
                memo
            });

            return result;
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching estimated gas for Instantiate'
            });
        }
    };

    const getGasEstimationCw20Mint = async (contractAddress: string, bulkTargets: { recipient: string; amount: string }[]) => {
        const wallet = await getWallet('');

        let txList = await getCW20MintTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw20Burn = async (contractAddress: string, amount: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationBurn(wallet, contractAddress, amount);
        return gas;
    };

    const getGasEstimationCw20BurnFrom = async (contractAddress: string, bulkTargets: { owner: string; amount: string }[]) => {
        const wallet = await getWallet('');
        let txList = await getCW20BurnFromTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw20IncreaseAllowance = async (contractAddress: string, spender: string, amount: string, expires: Expires) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationIncreaseAllowance(wallet, contractAddress, spender, amount, expires);
        return gas;
    };

    const getGasEstimationCw20DecreaseAllowance = async (contractAddress: string, spender: string, amount: string, expires: Expires) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationDecreaseAllowance(wallet, contractAddress, spender, amount, expires);
        return gas;
    };

    const getGasEstimationCw20Transfer = async (contractAddress: string, bulkTargets: { recipient: string; amount: string }[]) => {
        const wallet = await getWallet('');

        let txList = await getCW20TransferTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw20TransferFrom = async (
        contractAddress: string,
        bulkTargets: { owner: string; recipient: string; amount: string }[]
    ) => {
        const wallet = await getWallet('');

        let txList = await getCW20TransferFromTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw20UpdateLogo = async (contractAddress: string, logo: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationUploadLogo(wallet, contractAddress, logo);
        return gas;
    };

    const getGasEstimationCw20UpdateMarketing = async (
        contractAddress: string,
        description: string,
        marketing: string,
        project: string
    ) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationUpdateMarketing(wallet, contractAddress, description, marketing, project);
        return gas;
    };

    const getGasEstimationCw20UpdateMinter = async (contractAddress: string, newMinter: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw20.getGasEstimationUpdateMinter(wallet, contractAddress, newMinter);
        return gas;
    };

    const getGasEstimationCw721Mint = async (
        contractAddress: string,
        bulkTargets: { owner: string; token_id: string; extension: {}; token_uri: string }[]
    ) => {
        const wallet = await getWallet('');

        let txList = await getCW721MintTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw721Burn = async (contractAddress: string, bulkTargets: { token_id: string }[]) => {
        const wallet = await getWallet('');

        let txList = await getCW721BurnTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw721Transfer = async (contractAddress: string, bulkTargets: { recipient: string; token_id: string }[]) => {
        const wallet = await getWallet('');

        let txList = await getCW721TransferTxList(wallet, contractAddress, bulkTargets);
        const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList, { memo: CRAFT_CONFIGS.TRANSACTION_MEMO });
        return gas;
    };

    const getGasEstimationCw721Approve = async (contractAddress: string, spender: string, token_id: string, expires: Cw721Expires) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationApprove(wallet, contractAddress, spender, token_id, expires);
        return gas;
    };

    const getGasEstimationCw721ApproveAll = async (contractAddress: string, operator: string, expires: Cw721Expires) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationApproveAll(wallet, contractAddress, operator, expires);
        return gas;
    };

    const getGasEstimationCw721Revoke = async (contractAddress: string, spender: string, token_id: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationRevoke(wallet, contractAddress, spender, token_id);
        return gas;
    };

    const getGasEstimationCw721RevokeAll = async (contractAddress: string, operator: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationRevokeAll(wallet, contractAddress, operator);
        return gas;
    };

    const getGasEstimationCw721UpdateOwnershipTransfer = async (contractAddress: string, new_owner: string, expiry: Cw721Expires) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipTransfer(wallet, contractAddress, new_owner, expiry);
        return gas;
    };

    const getGasEstimationCw721UpdateOwnershipAccept = async (contractAddress: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipAccept(wallet, contractAddress);
        return gas;
    };

    const getGasEstimationCw721UpdateOwnershipRenounce = async (contractAddress: string) => {
        const wallet = await getWallet('');
        const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipRenounce(wallet, contractAddress);
        return gas;
    };

    // COSMWASM
    const instantiate = async (
        password: string,
        admin: string,
        codeId: string,
        label: string,
        msg: string,
        estimatedGas: number,
        memo: string
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.CosmWasm.instantiateContract(wallet, admin, codeId, label, msg, [], {
            memo,
            gas: estimatedGas,
            fee: getFeesFromGas(estimatedGas)
        });

        const { rawLog } = JSON.parse(JSON.stringify(result));
        const parsedLogs = JSON.parse(rawLog)[0];
        const contractAddress = parsedLogs.events[0].attributes[0].value;

        return {
            contractAddress,
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    // CW20
    const cw20Mint = async (
        password: string,
        contractAddress: string,
        bulkTargets: { recipient: string; amount: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW20MintTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw20.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20Burn = async (password: string, contractAddress: string, amount: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.burn(wallet, contractAddress, amount, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20BurnFrom = async (
        password: string,
        contractAddress: string,
        bulkTargets: { owner: string; amount: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW20BurnFromTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw20.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20IncreaseAllowance = async (
        password: string,
        contractAddress: string,
        spender: string,
        amount: string,
        expires: Expires,
        gas: number
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.increaseAllowance(wallet, contractAddress, spender, amount, expires, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20DecreaseAllowance = async (
        password: string,
        contractAddress: string,
        spender: string,
        amount: string,
        expires: Expires,
        gas: number
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.decreaseAllowance(wallet, contractAddress, spender, amount, expires, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20Trnasfer = async (
        password: string,
        contractAddress: string,
        bulkTargets: { recipient: string; amount: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW20TransferTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw20.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20TrnasferFrom = async (
        password: string,
        contractAddress: string,
        bulkTargets: { owner: string; recipient: string; amount: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW20TransferFromTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw20.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20UpdateLogo = async (password: string, contractAddress: string, logo: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.uploadLogo(wallet, contractAddress, logo, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20UpdateMarketing = async (
        password: string,
        contractAddress: string,
        description: string,
        marketing: string,
        project: string,
        gas: number
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.updateMarketing(wallet, contractAddress, description, marketing, project, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw20UpdateMinter = async (password: string, contractAddress: string, newMinter: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw20.updateMinter(wallet, contractAddress, newMinter, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    // CW721
    const cw721Mint = async (
        password: string,
        contractAddress: string,
        bulkTargets: { owner: string; token_id: string; extension: {}; token_uri: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW721MintTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw721.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721Burn = async (password: string, contractAddress: string, bulkTargets: { token_id: string }[], gas: number) => {
        const wallet = await getWallet(password);
        let txList = await getCW721BurnTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw721.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721Transfer = async (
        password: string,
        contractAddress: string,
        bulkTargets: { recipient: string; token_id: string }[],
        gas: number
    ) => {
        const wallet = await getWallet(password);
        let txList = await getCW721TransferTxList(wallet, contractAddress, bulkTargets);
        const result = await firmaSDK.Cw721.signAndBroadcast(wallet, txList, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721Approve = async (
        password: string,
        contractAddress: string,
        spender: string,
        token_id: string,
        expires: Cw721Expires,
        gas: number
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.approve(wallet, contractAddress, spender, token_id, expires, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });

        /// Fail = result.code === 5
        /// Success = result.code === 0

        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721ApproveAll = async (password: string, contractAddress: string, operator: string, expires: Cw721Expires, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.approveAll(wallet, contractAddress, operator, expires, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721Revoke = async (password: string, contractAddress: string, spender: string, token_id: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.revoke(wallet, contractAddress, spender, token_id, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721RevokeAll = async (password: string, contractAddress: string, operator: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.revokeAll(wallet, contractAddress, operator, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721UpdateOwnerShipTransfer = async (
        password: string,
        contractAddress: string,
        new_owner: string,
        expiry: Cw721Expires,
        gas: number
    ) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.updateOwnerShipTransfer(wallet, contractAddress, new_owner, expiry, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721UpdateOwnerShipAccept = async (password: string, contractAddress: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.updateOwnerShipAccept(wallet, contractAddress, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    const cw721UpdateOwnerShipRenounce = async (password: string, contractAddress: string, gas: number) => {
        const wallet = await getWallet(password);
        const result = await firmaSDK.Cw721.updateOwnerShipRenounce(wallet, contractAddress, {
            gas: gas,
            fee: getFeesFromGas(gas),
            memo: CRAFT_CONFIGS.TRANSACTION_MEMO
        });
        return {
            transactionHash: result.transactionHash,
            code: result.code
        };
    };

    return {
        getFctBalance,
        getGasEstimationInstantiate,
        getGasEstimationCw20Mint,
        getGasEstimationCw20Burn,
        getGasEstimationCw20BurnFrom,
        getGasEstimationCw20IncreaseAllowance,
        getGasEstimationCw20DecreaseAllowance,
        getGasEstimationCw20Transfer,
        getGasEstimationCw20TransferFrom,
        getGasEstimationCw20UpdateLogo,
        getGasEstimationCw20UpdateMarketing,
        getGasEstimationCw20UpdateMinter,
        getGasEstimationCw721Mint,
        getGasEstimationCw721Burn,
        getGasEstimationCw721Transfer,
        getGasEstimationCw721Approve,
        getGasEstimationCw721ApproveAll,
        getGasEstimationCw721Revoke,
        getGasEstimationCw721RevokeAll,
        getGasEstimationCw721UpdateOwnershipAccept,
        getGasEstimationCw721UpdateOwnershipRenounce,
        getGasEstimationCw721UpdateOwnershipTransfer,
        instantiate,
        cw20Mint,
        cw20Burn,
        cw20BurnFrom,
        cw20IncreaseAllowance,
        cw20DecreaseAllowance,
        cw20Trnasfer,
        cw20TrnasferFrom,
        cw20UpdateLogo,
        cw20UpdateMarketing,
        cw20UpdateMinter,
        cw721Mint,
        cw721Burn,
        cw721Transfer,
        cw721Approve,
        cw721ApproveAll,
        cw721Revoke,
        cw721RevokeAll,
        cw721UpdateOwnerShipAccept,
        cw721UpdateOwnerShipRenounce,
        cw721UpdateOwnerShipTransfer
    };
};

export default useFirmaSDKInternal;
