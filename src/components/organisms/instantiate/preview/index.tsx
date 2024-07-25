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
import { BASIC_LABEL } from '@/constants/cw20Types';
import useFormStore from '@/store/formStore';
import { useModalStore } from '@/hooks/useModal';
import InstantitateModal from '../../modal/instantitateModal';
import useInstantiateStore from '../instaniateStore';

interface IProps {
    isBasic: boolean;
}

const Preview = ({ isBasic }: IProps) => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);
    const cw20Mode = useSelector((state: rootState) => state.global.cw20Mode);

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
        const cw20CodeId = cw20Mode === 'BASIC' ? craftConfig.CW20.BASIC_CODE_ID : craftConfig.CW20.ADVANCED_CODE_ID;

        return cw20CodeId;
    }, [network, cw20Mode]);

    const handleInstantiate = () => {
        if (isInit) {
            const newDecimals = isBasic ? 6 : Number(decimals);

            let decimalsTotalSupply = getApplyDecimalsAmount(totalSupply, newDecimals.toString());
            let decimalsMinterCap = getApplyDecimalsAmount(minterCap, newDecimals.toString());

            let convertWalletList = [];

            for (const wallet of walletList) {
                convertWalletList.push({
                    address: wallet.recipient,
                    amount: getApplyDecimalsAmount(wallet.amount, newDecimals.toString())
                });
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
                        description: tokenDescription === '' ? 'null' : tokenDescription,
                        logo: { url: tokenLogoUrl === '' ? 'null' : tokenLogoUrl },
                        marketing: isBasic ? address : marketingAddress === '' ? address : marketingAddress,
                        project: isBasic ? `null` : marketingProject === '' ? `null` : marketingProject
                    }
                };

                const params = {
                    admin: address,
                    codeId: codeId,
                    label: label === '' ? BASIC_LABEL : label,
                    msg: JSON.stringify(messageData)
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
        const addresses = walletList.map((item) => item.recipient);
        const uniqueAddresses = new Set(addresses);

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

        if (walletList.length >= 1 && addresses.length !== uniqueAddresses.size) return 'Duplicated address';

        if (!isBasic && minterble && minterAddress === '') return 'Empty minter address';

        if (minterble && minterCap === '') return 'Empty minter cap amount';

        if (minterble && compareStringsAsNumbers(minterCap, totalSupply) === -1) return 'Initial supply greater than cap';

        return '';
    };

    const disableButton = useMemo(() => {
        if (isInit) {
            const addresses = walletList.map((item) => item.recipient);
            const uniqueAddresses = new Set(addresses);

            if (tokenName === '') return true;

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

            if (walletList.length >= 1 && addresses.length !== uniqueAddresses.size) return true;

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
