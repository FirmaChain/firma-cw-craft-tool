import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IWallet } from '@/interfaces/wallet';
import { PreviewWrapper } from './style';

import Dashboard from './dashboard';
import Submit from './submit';
import { ModalActions } from '@/redux/actions';
import { rootState } from '@/redux/reducers';
import { compareAmounts, compareStringsAsNumbers, getApplyDecimalsAmount, isValidAddress, validateSymbol } from '@/utils/common';
import { CRAFT_CONFIGS } from '@/config';
import useFormStore from '@/store/formStore';
import { useModalStore } from '@/hooks/useModal';
import useInstantiateStore from '../instaniateStore';
import InstantitateModal from '../../modal/instantitateModal';
import { addStringAmount } from '@/utils/balance';

interface IProps {
    isBasic: boolean;
}

const Preview = ({ isBasic }: IProps) => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);
    const contractMode = useSelector((state: rootState) => state.global.contractMode);

    const tokenName = useInstantiateStore((v) => v.tokenName);
    const tokenSymbol = useInstantiateStore((v) => v.tokenSymbol);
    const tokenLogoUrl = useInstantiateStore((v) => v.tokenLogoUrl);
    const tokenDescription = useInstantiateStore((v) => v.tokenDescription);
    const decimals = useInstantiateStore((v) => v.decimals);
    const label = useInstantiateStore((v) => v.label);
    const marketingAddress = useInstantiateStore((v) => v.marketingAddress);
    const marketingProject = useInstantiateStore((v) => v.marketingProject);
    const minterble = useInstantiateStore((v) => v.minterble);
    const minterCap = useInstantiateStore((v) => v.minterCap);
    const minterAddress = useInstantiateStore((v) => v.minterAddress);
    const walletList = useInstantiateStore((v) => v.walletList);
    const totalSupply = useInstantiateStore((v) => v.totalSupply);

    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const codeId = useMemo(() => {
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        const cw20CodeId = contractMode === 'BASIC' ? craftConfig.CW20.BASIC_CODE_ID : craftConfig.CW20.ADVANCED_CODE_ID;

        return cw20CodeId;
    }, [network, contractMode]);

    const craftConfig = useMemo(() => {
        return network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    }, [network]);

    const handleInstantiate = () => {
        if (isInit) {
            const newDecimals = isBasic ? 6 : Number(decimals);

            let decimalsTotalSupply = getApplyDecimalsAmount(totalSupply, newDecimals.toString());
            let decimalsMinterCap = getApplyDecimalsAmount(minterCap, newDecimals.toString());

            let convertWalletList = [];

            const walletObj: { [key: string]: string } = {};

            for (const wallet of walletList) {
                const recipient: string = wallet.recipient;
                const convertedAmount = getApplyDecimalsAmount(wallet.amount, newDecimals.toString());

                if (walletObj[recipient]) {
                    walletObj[recipient] = addStringAmount(walletObj[recipient], convertedAmount);
                } else {
                    walletObj[recipient] = convertedAmount;
                }
            }

            for (const address in walletObj) {
                if (walletObj.hasOwnProperty(address)) {
                    convertWalletList.push({ address, amount: walletObj[address] });
                }
            }

            const invalidMessageType = checkInstantiate(isBasic, walletList, decimalsTotalSupply, decimalsMinterCap);

            if (invalidMessageType === '') {
                const messageData = {
                    decimals: newDecimals,
                    name: tokenName,
                    symbol: tokenSymbol,
                    initial_balances: convertWalletList,
                    ...(minterble && {
                        mint: {
                            minter: isBasic ? address : minterAddress,
                            cap: decimalsMinterCap
                        }
                    }),
                    marketing: {
                        description: tokenDescription || '',
                        logo: { url: tokenLogoUrl || '' },
                        marketing: isBasic ? address : marketingAddress || address,
                        project: marketingProject || ''
                    }
                };

                const params = {
                    admin: address,
                    codeId: codeId,
                    label: isBasic ? 'CW20' : label,
                    msg: JSON.stringify(messageData),
                    type: craftConfig.CW20.TYPE,
                    length: convertWalletList.length
                };

                modal.openModal({
                    modalType: 'custom',
                    _component: ({ id }) => <InstantitateModal module="/cosmwasm/instantiateContract" id={id} params={params} />
                });
            } else {
                ModalActions.handleData({
                    module: 'Instantiation',
                    result: false,
                    message: invalidMessageType
                });

                ModalActions.handleTxConfirm(true);
            }
        } else {
            modal.openModal({ modalType: 'connectWallet' });
        }
    };

    const checkInstantiate = (isBasic: boolean, walletList: IWallet[], totalSupply: string, minterCap: string) => {
        if (tokenName === '') return 'Empty Token Name';

        if (tokenSymbol === '') return 'Empty Token Symbol';

        if (!validateSymbol(tokenSymbol)) return 'Symbol is not in expected format [a-zA-Z0-9\\-]{3,12}';

        if (!isBasic && decimals === '') return 'Empty Decimals';

        if (!isBasic && label === '') return 'Empty Label';

        if (walletList.length === 0) return 'Not add a wallet';

        for (const wallet of walletList) {
            if (wallet.recipient === '') return 'Empty initial wallet address';
            if (wallet.amount === '0') return 'Wallet amount must be greater than 0';
            if (wallet.amount === '') return 'Empty initial wallet amount';
            if (!isValidAddress(wallet.recipient)) return 'Is valid address in wallet list';
        }

        if (!isBasic && minterble && minterAddress === '') return 'Empty minter address';

        if (minterble && minterCap === '') return 'Empty minter cap amount';

        if (minterble && compareStringsAsNumbers(minterCap, totalSupply) === -1) return 'Initial supply greater than cap';

        return '';
    };

    const disableButton = useMemo(() => {
        if (isInit) {
            if (tokenName.length < 3) return true;

            if (tokenSymbol === '') return true;

            if (!validateSymbol(tokenSymbol)) return true;

            if (!isBasic && decimals === '') return true;

            if (!isBasic && label === '') return true;

            if (walletList.length === 0) return true;

            for (const wallet of walletList) {
                if (wallet.recipient === '') return true;
                if (wallet.amount === '0') return true;
                if (wallet.amount === '') return true;
                if (!isValidAddress(wallet.recipient)) return true;
            }

            if (!isBasic && minterble && minterAddress === '') return true;

            if (minterble && minterCap === '') return true;

            if (minterble && compareAmounts(minterCap, totalSupply)) return true;

            return false;
        } else {
            return false;
        }
    }, [decimals, isBasic, isInit, label, minterAddress, minterCap, minterble, tokenName, tokenSymbol, totalSupply, walletList]);

    useEffect(() => {
        if (minterCap !== '' && Number(totalSupply) > 0 && compareAmounts(minterCap, totalSupply)) {
            setFormError({
                id: 'minterCap',
                type: 'INSUFFICIENT_MINTER_CAP',
                message: 'Minter cap must always be equal to or greater than Total supply.'
            });
        } else {
            clearFormError({
                id: 'minterCap',
                type: 'INSUFFICIENT_MINTER_CAP'
            });
        }
    }, [minterCap]);

    return (
        <PreviewWrapper>
            <Dashboard
                isBasic={isBasic}
                tokenLogoUrl={tokenLogoUrl}
                tokenName={tokenName}
                tokenSymbol={tokenSymbol}
                tokenDescription={tokenDescription}
                minterble={minterble}
                minterCap={minterCap}
                minterAddress={minterAddress}
                totalSupply={totalSupply}
                walletList={walletList}
                decimals={decimals}
                label={label}
                marketingAddress={marketingAddress}
                marketingProject={marketingProject}
            />
            <Submit onClickInstantiate={handleInstantiate} disableButton={disableButton} />
        </PreviewWrapper>
    );
};

export default Preview;
