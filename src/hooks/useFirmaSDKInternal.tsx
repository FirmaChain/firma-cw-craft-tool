import { useFirmaSDKContext } from "@/context/firmaSDKContext";
import { rootState } from "@/redux/reducers";
import { getFeesFromGas } from "@/utils/balance";
import { decryptWallet } from "@/utils/keystore";
import { useSelector } from "react-redux";

const useFirmaSDKInternal = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { userKey, timeKey } = useSelector((state: rootState) => state.wallet);

    const getDecryptPrivateKey = () => {
        const wallet = decryptWallet(userKey, "12341234");
        return wallet.privateKey;
    };

    const getWallet = async () => {
        const privateKey = getDecryptPrivateKey();

        return await firmaSDK.Wallet.fromPrivateKey(privateKey);
    };

    // COSMWASM
    const instantiate = async (admin: string, codeId: string, label: string, msg: string, estimatedGas: number, memo: string) => {
        const wallet = await getWallet();
        const result = await firmaSDK.CosmWasm.instantiateContract(wallet, admin, codeId, label, msg, [], {
            memo,
            gas: estimatedGas,
            fee: getFeesFromGas(estimatedGas)
        });

        return result;
    };

    const getGasEstimationInstantiate = async (admin: string, codeId: string, label: string, msg: string, memo: string) => {
        const wallet = await getWallet();
        const result = await firmaSDK.CosmWasm.getGasEstimationInstantiateContract(wallet, admin, codeId, label, msg, [], {
            memo
        });

        return result;
    };

    // CW20

    return {
        instantiate,
        getGasEstimationInstantiate,

        // cw20Mint,
        // cw20Burn,
        // cw20BurnFrom,
        // cw20IncreaseAllowance,
        // cw20DecreaseAllowance,
        // cw20Transfer,
        // cw20TransferFrom,
        // cw20UpdateLogo,
        // cw20UpdateMarketing,
        // cw20UpdateMinter,

        // getGasEstimationCw20Mint,
        // getGasEstimationCw20Burn,
        // getGasEstimationCw20BurnFrom,
        // getGasEstimationCw20IncreaseAllowance,
        // getGasEstimationCw20DecreaseAllowance,
        // getGasEstimationCw20Transfer,
        // getGasEstimationCw20TransferFrom,
        // getGasEstimationCw20UpdateLogo,
        // getGasEstimationCw20UpdateMarketing,
        // getGasEstimationCw20UpdateMinter,

        // cw721Mint,
        // cw721Burn,
        // cw721Transfer,
        // cw721Approve,
        // cw721Revoke,
        // cw721ApproveAll,
        // cw721RevokeAll,
        // cw721UpdateOwnershipTransfer,
        // cw721UpdateOwnershipAccept,
        // cw721UpdateOwnershipRenounce,

        // getGasEstimationCw721Mint,
        // getGasEstimationCw721Burn,
        // getGasEstimationCw721Transfer,
        // getGasEstimationCw721Approve,
        // getGasEstimationCw721Revoke,
        // getGasEstimationCw721ApproveAll,
        // getGasEstimationCw721RevokeAll,
        // getGasEstimationCw721UpdateOwnershipTransfer,
        // getGasEstimationCw721UpdateOwnershipAccept,
        // getGasEstimationCw721UpdateOwnershipRenounce,
    }
};

export default useFirmaSDKInternal;