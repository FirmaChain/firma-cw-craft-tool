import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IWallet } from '@/interfaces/wallet';
import { PreviewWrapper } from './style';

import Dashboard from './dashboard';
import Submit from './submit';
import { ModalActions } from '@/redux/actions';
import { rootState } from '@/redux/reducers';
import { compareStringsAsNumbers, getApplyDecimalsAmount, validateSymbol } from '@/utils/common';
import { CRAFT_CONFIGS } from '@/config';
import useFormStore from '@/store/formStore';
import { useModalStore } from '@/hooks/useModal';
import useInstantiateStore from '../instaniateStore';
import { addStringAmount, compareStringNumbers, isZeroStringValue } from '@/utils/balance';
import { useScrollContext } from '@/context/scrollContext';
import { isValidAddress } from '@/utils/address';
import styled from 'styled-components';
import { ContentBox } from '../content/style';
import SectionScrollToTopButton from '@/components/atoms/buttons/sectionScrolltoTopButton';
import TxModal from '../../modal/txModal';
import QRModal2, { ModalType } from '../../modal/qrModal2';

interface IProps {
    isBasic: boolean;
}

const ScrollButtonBox = styled.div`
    width: 100%;

    @media (min-width: 1654px) {
        display: none;
    }
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const Preview = ({ isBasic }: IProps) => {
    const { scroll } = useScrollContext();

    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
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
    const clearForm = useFormStore((state) => state.clearForm);

    const codeId = useMemo(() => {
        const cw20CodeId = contractMode === 'BASIC' ? CRAFT_CONFIGS.CW20.BASIC_CODE_ID : CRAFT_CONFIGS.CW20.ADVANCED_CODE_ID;

        return cw20CodeId;
    }, [contractMode]);

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
                    modalType: 'INSTANTIATE' as ModalType,
                    header: {
                        title: 'CW20 Instantiation'
                    },
                    txParams: {
                        admin: address,
                        codeId: codeId,
                        label: label,
                        type: 'cw20',
                        msg: messageData,
                        walletLength: walletList.length,
                        totalLength: JSON.stringify(messageData).length
                    },
                    contentParams: {
                        decimals: newDecimals.toString(),
                        symbol: tokenSymbol,
                        list: [
                            {
                                label: 'Token Name',
                                value: tokenName,
                                type: 'default',
                                initColor: '#FFF',
                                resultColor: '#FFF'
                            },
                            {
                                label: 'Token Symbol',
                                value: tokenSymbol,
                                type: 'default',
                                initColor: '#FFF',
                                resultColor: '#FFF'
                            },
                            {
                                label: 'Decimal',
                                value: decimals === '' ? '6' : decimals,
                                type: 'default',
                                initColor: '#FFF',
                                resultColor: '#FFF'
                            }
                        ],
                        extraList: minterble && [
                            {
                                label: 'Supply Amount',
                                value: decimalsTotalSupply,
                                type: 'instantiate-amount',
                                initColor: '#02E191',
                                resultColor: '#FFF'
                            },
                            {
                                label: 'Minter Cap',
                                value: decimalsMinterCap,
                                type: 'instantiate-amount',
                                initColor: '#999',
                                resultColor: '#FFF'
                            }
                        ]
                    }
                };

                modal.openModal({
                    modalType: 'custom',
                    _component: ({ id }) => {
                        return !USE_WALLET_CONNECT ? (
                            <TxModal
                                module="/cw20/instantiateContract"
                                id={id}
                                params={params}
                                onClickConfirm={() => {
                                    clearForm();
                                }}
                            />
                        ) : (
                            <QRModal2
                                module="/cw20/instantiateContract"
                                id={id}
                                params={params}
                                onClickConfirm={() => {
                                    useInstantiateStore.getState().clearForm();
                                    useFormStore.getState().clearForm();
                                    clearForm();
                                }}
                            />
                        );
                    }
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

        if (label === '' && label.trim() === '') return 'Empty Label';

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

            if (tokenSymbol.length < 3) return true;

            if (!validateSymbol(tokenSymbol)) return true;

            if (!isBasic && decimals === '') return true;

            if (label === '' || label.trim().length <= 1) return true;

            if (walletList.length === 0) return true;

            for (const wallet of walletList) {
                if (!isValidAddress(wallet.recipient)) return true;
                if (wallet.recipient === '') return true;

                if (isZeroStringValue(wallet.amount)) return true;
                if (wallet.amount === '0') return true;
                if (wallet.amount === '') return true;
            }

            if (!isBasic && minterble && minterAddress === '') return true;

            if (minterble && minterCap === '') return true;

            if (minterble && compareStringNumbers(minterCap, totalSupply) < 0) return true;

            return false;
        } else {
            return false;
        }
    }, [decimals, isBasic, isInit, label, minterAddress, minterCap, minterble, tokenName, tokenSymbol, totalSupply, walletList]);

    useEffect(() => {
        if (minterCap !== '' && Number(totalSupply) > 0 && compareStringNumbers(minterCap, totalSupply) <= -1) {
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
    }, [minterCap, totalSupply]);

    return (
        <ContentBox $isPreview>
            <PreviewWrapper style={{ top: `${scroll.y > 0 ? 100 : 0}px` }}>
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

            <ScrollButtonBox>
                <SectionScrollToTopButton />
            </ScrollButtonBox>
        </ContentBox>
    );
};

export default Preview;
