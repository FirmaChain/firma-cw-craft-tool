import React, { useEffect, useMemo, useState } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
import styled from 'styled-components';
import useExecuteHook from '@/components/organisms/execute/hooks/useExecueteHook';
// import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';

import { parseAmountWithDecimal2 } from '@/utils/common';
import { compareStringNumbers, getTokenAmountFromUToken, isZeroStringValue } from '@/utils/balance';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useSnackbar } from 'notistack';
import { isValidAddress } from '@/utils/address';
import WalletRemoveButton from '../buttons/walletRemoveButton';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';
import useExecuteActions from '@/components/organisms/execute/action';
import { isAfter } from 'date-fns';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
    width: fit-content;
`;

interface IProps {
    index: number;
    address: string;
    amount: string;
    onChangeAddress: (value: string) => void;
    onChangeAmount: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    decimals: string;
    addressTitle: string;
    addressPlaceholder: string;
    amountTitle: string;
    inputId: string;
}

const CW20BurnFromInput = ({
    index,
    address,
    amount,
    onChangeAddress,
    onChangeAmount,
    onRemoveClick,
    isLast,
    decimals,
    inputId
}: IProps) => {
    const id = inputId;

    const { firmaSDK } = useFirmaSDKContext();
    const context = useCW20Execute();
    const contractAddress = context.contractAddress;
    const allowanceByAddress = context.allowanceByAddress;
    const setAllowanceByAddress = context.setAllowanceByAddress;
    const setCW20BalanceByAddress = context.setCw20BalanceByAddress;

    const userAddress = useWalletStore((v) => v.address);
    // useSelector((v: rootState) => v.wallet.address);
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);
    const { /*getCw20AllowanceBalance,*/ getCw20Balance } = useExecuteHook();
    const { setAllowanceInfo } = useExecuteActions();

    const [addressCW20Balance, setAddressCW20Balance] = useState<string>('0');

    const availableAmount = useMemo(() => {
        if (address.toLowerCase() === '' || !isValidAddress(address)) return '0';

        if (allowanceByAddress[address.toLowerCase()] && addressCW20Balance) {
            const compareStatus = compareStringNumbers(allowanceByAddress[address.toLowerCase()], addressCW20Balance);

            if (compareStatus === 1) {
                return addressCW20Balance;
            } else if (compareStatus === 0) {
                return addressCW20Balance;
            } else if (compareStatus === -1) {
                return allowanceByAddress[address.toLowerCase()];
            }
        } else {
            return '0';
        }
    }, [addressCW20Balance, allowanceByAddress]);

    const checkValidAddress = (value: string) => {
        if (value === '') {
            clearFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
            return;
        }

        if (userAddress.toLowerCase() !== value.toLowerCase()) clearFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });
        else {
            setFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
            return;
        }

        if (isValidAddress(value)) clearFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
    };

    const handleAddress = async (value: string) => {
        checkValidAddress(value);

        onChangeAddress(value);
    };

    const handleAmount = (value: string) => {
        if (!isZeroStringValue(value) || value === '') clearFormError({ id: `${id}_AMOUNT`, type: 'INVALID_WALLET_AMOUNT' });
        else setFormError({ id: `${id}_AMOUNT`, type: 'INVALID_WALLET_AMOUNT', message: 'Please enter a value other than 0.' });

        onChangeAmount(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    const getAllownace = async () => {
        // return 0 if expired
        const { allowance, expires } = await setAllowanceInfo(contractAddress, address, userAddress);

        let result: string = '0';

        if (expires['never']) result = allowance;
        else if (expires['at_height']) {
            const nowHeight = (await firmaSDK.BlockChain.getChainSyncInfo()).latest_block_height;

            if (expires['at_height'] > nowHeight) result = allowance;
        } else if (expires['at_time']) {
            const expireTime = new Date(Number(expires['at_time']) / 1000000);
            const now = new Date();

            if (isAfter(expireTime, now)) result = allowance;
        }

        setAllowanceByAddress({ address: address.toLowerCase(), amount: result });
    };

    const getAddressCW20Balance = async () => {
        const { success, balance } = await getCw20Balance(contractAddress, address);
        if (success) {
            setAddressCW20Balance(balance);
        }
    };

    useEffect(() => {
        if (Number(availableAmount) > 0) handleAmount('');
        if (isValidAddress(address)) {
            getAllownace();
            getAddressCW20Balance();
        } else {
            setAddressCW20Balance('0');
        }
    }, [address]);

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '76px', gap: '12px' }}>
            <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                        <LabelInput
                            labelProps={{ index, label: 'Owner Address' }}
                            inputProps={{
                                formId: `${inputId}_ADDRESS`,
                                value: address,
                                onChange: handleAddress,
                                placeHolder: 'Input Wallet Address',
                                emptyErrorMessage: 'Please input firmachain wallet address.',
                                regex: WALLET_ADDRESS_REGEX
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            minWidth: '212px',
                            maxWidth: '212px',
                            gap: '8px'
                        }}
                    >
                        <LabelInput
                            labelProps={{ label: 'Burn Amount' }}
                            inputProps={{
                                formId: `${inputId}_AMOUNT`,
                                value: amount,
                                onChange: handleAmount,
                                placeHolder: '0',
                                type: 'number',
                                decimal: Number(decimals),
                                emptyErrorMessage: 'Please input the amount.',
                                textAlign: 'right',
                                maxValue: getTokenAmountFromUToken(availableAmount, decimals.toString()),
                                hideErrorMessage: true
                            }}
                        />

                        <UserBalanceTypo
                            className="clamp-single-line"
                            data-tooltip-content={parseAmountWithDecimal2(availableAmount, decimals.toString())}
                            data-tooltip-id={TOOLTIP_ID.COMMON}
                            data-tooltip-wrapper="span"
                            data-tooltip-place="bottom"
                        >
                            Available : {parseAmountWithDecimal2(availableAmount, decimals.toString(), true)}
                        </UserBalanceTypo>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32px',
                    height: '100%',
                    justifyContent: 'flex-start',
                    gap: '8px'
                }}
            >
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                    <WalletRemoveButton size="32px" onClick={handleRemoveWallet} disabled={index === 1 && isLast} />
                    {/* <IconButton
                        style={{
                            width: '32px',
                            height: '32px',
                            padding: '0',
                            background: 'transparent',
                            border: 'unset',
                            filter: 'unset !important'
                        }}
                        disabled={index === 1 && isLast}
                        onClick={handleRemoveWallet}
                    >
                        {index === 1 && isLast ? (
                            <img style={{ width: '32px', height: '32px' }} src={IC_MINUS_CIRCLE_DISABLE} />
                        ) : (
                            <Icons.MinusCircle />
                        )}
                    </IconButton> */}
                </div>
            </div>
        </div>
    );
};

export default React.memo(CW20BurnFromInput);
