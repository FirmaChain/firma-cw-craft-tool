import { FirmaSDK } from '@firmachain/firma-js';
import { encryptWallet, getRandomKey } from './keystore';
import useWalletStore from '@/store/walletStore';

const storeWalletInternal = (password: string, mnemonic: string, privateKey: string, address: string, timeKey: string) => {
    const wallet: { mnemonic: string; privateKey: string; address: string } = {
        mnemonic,
        privateKey,
        address
    };

    useWalletStore.getState().handleInit(true);

    const encryptPasswordData = encryptWallet(password, wallet);
    const encryptTimeKeyData = encryptWallet(timeKey, wallet);

    useWalletStore.getState().handleTimeKey(timeKey);
    useWalletStore.getState().handlePasswordWallet(encryptPasswordData);
    useWalletStore.getState().handleTimeKeyWallet(encryptTimeKeyData);
    useWalletStore.getState().handleAddress(wallet.address);
};

export const storeWalletFromPrivateKey = async (firmaSDK: FirmaSDK, password: string, privateKey: string) => {
    const walletService = await firmaSDK.Wallet.fromPrivateKey(privateKey);
    const address = await walletService.getAddress();
    const timeKey = getRandomKey();
    useWalletStore.getState().handleTimeKey(timeKey);

    storeWalletInternal(password, '', privateKey, address, timeKey);
};

export const storeWalletFromMnemonic = async (firmaSDK: FirmaSDK, password: string, mnemonic: string) => {
    const walletService = await firmaSDK.Wallet.fromMnemonic(mnemonic);
    const privateKey = walletService.getPrivateKey();
    const address = await walletService.getAddress();

    const timeKey = getRandomKey();
    useWalletStore.getState().handleTimeKey(timeKey);

    storeWalletInternal(password, mnemonic, privateKey, address, timeKey);
};
