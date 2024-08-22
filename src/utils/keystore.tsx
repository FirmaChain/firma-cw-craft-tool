import { WalletActions } from '@/redux/actions';
import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

export const encrypt = (originalMessage: string, pass: string): string => {
    try {
        const salt = CryptoJS.lib.WordArray.random(128 / 8);

        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations
        });

        const iv = CryptoJS.lib.WordArray.random(128 / 8);

        const encrypted = CryptoJS.AES.encrypt(originalMessage, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        return salt.toString() + iv.toString() + encrypted.toString();
    } catch (error) {
        return '';
    }
};

export const decrypt = (encryptMessage: string, pass: string): string => {
    try {
        const salt = CryptoJS.enc.Hex.parse(encryptMessage.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(encryptMessage.substr(32, 32));
        const encrypted = encryptMessage.substring(64);

        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations
        });

        console.log('key', key);
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString(CryptoJS.enc.Utf8);

        return decrypted;
    } catch (error) {
        return '';
    }
};

export const getRandomKey = () => {
    return new Date().getTime().toString();
};

export const decryptWallet = (wallet: string, password: string) => {
    try {
        console.log('wallet', wallet);
        console.log('password', password);
        const decrypted = decrypt(wallet, password);
        return JSON.parse(decrypted);
    } catch (err) {
        throw new Error('Incorrect password');
    }
};

export const encryptWallet = (password: string, wallet: { mnemonic: string; privateKey: string; address: string }) => {
    const encrypted = encrypt(JSON.stringify(wallet), password);

    if (!encrypted) throw new Error('Encryption error occurred');

    return encrypted;
};
