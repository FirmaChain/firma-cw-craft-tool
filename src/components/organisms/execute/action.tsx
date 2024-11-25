import { useSnackbar } from 'notistack';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { Cw20Allowance, Cw20TokenInfo, Expires } from '@firmachain/firma-js';
import { sleep } from '@/utils/common';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';
import { isAfter } from 'date-fns';

const useExecuteActions = () => {
    const { firmaSDK } = useFirmaSDKContext();

    const { enqueueSnackbar } = useSnackbar();

    const {
        setContractInfo: _setContractInfo,
        setTokenInfo: _setTokenInfo,
        setMinterInfo: _setMinterInfo,
        setMarketingInfo: _setMarketingInfo,
        setCw20Balance: _setCw20Balance,
        setAllowanceInfo: _setAllowanceInfo,
        clearForm: _clearForm,
        setContractExist: _setContractExist
    } = useCW20Execute();

    const { handleGlobalLoading } = useGlobalStore();
    const { handleFCTBalance } = useWalletStore();

    const isExpired = async (expire: Expires) => {
        //! @DEV
        //! WASM codes used between Mannet/Testnet is diffreent, and Allowance logic is NOT SAME.
        //! Mainnet: after expiration, previous allowance used when update.
        //! Testnet: after expiration, previous allowance "WILL NOT" used. (considered as "0")
        //! so i added this line for mainnet:
        if (firmaSDK.Config.chainID.includes('colosseum')) return false;
        //! Once you've decided which WASM file to use, remove this line or modify the entire function!

        if (expire['never']) return false;
        else if (expire['at_height']) {
            const nowHeight = (await firmaSDK.BlockChain.getChainSyncInfo()).latest_block_height;

            if (expire['at_height'] > nowHeight) return false;
        } else if (expire['at_time']) {
            const expireTime = new Date(Number(expire['at_time']) / 1000000);
            const now = new Date();

            if (isAfter(expireTime, now)) return false;
        }

        return true;
    };

    const checkContractExist = async (contractAddress: string) => {
        try {
            const exist = await firmaSDK.CosmWasm.getContractState(contractAddress?.toLowerCase());
            return exist.length > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const setContractInfo = async (contractAddress: string) => {
        try {
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
            _setContractInfo(contractInfo);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setContractInfo'
            });
        }
    };

    const setTokenInfo = async (contractAddress: string) => {
        try {
            const tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
            _setTokenInfo(tokenInfo);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setTokenInfo'
            });
        }
    };

    const setMinterInfo = async (contractAddress: string) => {
        try {
            const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress?.toLowerCase());
            _setMinterInfo(minterInfo);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMinterInfo'
            });
        }
    };

    const setMarketingInfo = async (contractAddress: string) => {
        try {
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());
            _setMarketingInfo(marketingInfo);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setMarketingInfo'
            });
        }
    };

    const setCw20Balance = async (contractAddress: string, address: string) => {
        try {
            const cw20Balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
            _setCw20Balance(cw20Balance);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setCw20Balance'
            });
        }
    };

    const setFctBalance = async (address: string) => {
        try {
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            // _setFctBalance(fctBalance);
            handleFCTBalance(fctBalance);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching setFctBalance'
            });
        }
    };

    const setAllowanceInfo = async (contractAddress: string, owner: string, spender: string): Promise<Cw20Allowance> => {
        try {
            const allowanceInfo = await firmaSDK.Cw20.getAllowance(
                contractAddress?.toLowerCase(),
                owner?.toLowerCase(),
                spender?.toLowerCase()
            );

            const expired = await isExpired(allowanceInfo.expires);

            let result: Cw20Allowance = {
                allowance: '0',
                expires: { never: {} }
            };

            if (!expired) result = allowanceInfo;

            return result;
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                variant: 'error',
                message: 'Error occured while fetching getAllowanceInfo'
            });
        }
    };

    const checkCurrentHref = (base: string) => {
        if (base !== window.location.href) throw Error('NOT_SAME_ADDRESS');
    };

    const href = window.location.href;
    const searchCW20Contract = async (contractAddress: string, address: string) => {
        //? in case of searching cw721 contract in cw20 execute page

        try {
            handleGlobalLoading(true);

            await sleep(200);

            let tokenInfo: Cw20TokenInfo;

            checkCurrentHref(href);

            try {
                tokenInfo = await firmaSDK.Cw20.getTokenInfo(contractAddress?.toLowerCase());
            } catch (error) {
                enqueueSnackbar({ variant: 'error', message: 'This contract is not CW20 contract.' });
                _clearForm();
                _setContractExist(false);
                return;
            }

            checkCurrentHref(href);

            await sleep(200);
            const contractInfo = await firmaSDK.CosmWasm.getContractInfo(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const minterInfo = await firmaSDK.Cw20.getMinter(contractAddress?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const cw20Balance = await firmaSDK.Cw20.getBalance(contractAddress?.toLowerCase(), address?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            const fctBalance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
            checkCurrentHref(href);

            await sleep(200);
            _setContractInfo(contractInfo);
            _setMarketingInfo(marketingInfo);
            _setMinterInfo(minterInfo);
            _setCw20Balance(cw20Balance);
            // _setFctBalance(fctBalance);
            handleFCTBalance(fctBalance);
            _setTokenInfo(tokenInfo);

            checkCurrentHref(href);
        } catch (error: any) {
            if (error.message !== 'NOT_SAME_ADDRESS') {
                enqueueSnackbar({ variant: 'error', message: 'Error occured while fetching contract info' });
                console.log(error);
            } else {
                console.log('CW20 contract search aborted');
            }

            _clearForm();
        } finally {
            //? close global load
            handleGlobalLoading(false);
        }
    };

    return {
        checkContractExist,
        setContractInfo,
        setTokenInfo,
        setMinterInfo,
        setMarketingInfo,
        setCw20Balance,
        setFctBalance,
        setAllowanceInfo,
        searchCW20Contract
    };
};

export default useExecuteActions;
