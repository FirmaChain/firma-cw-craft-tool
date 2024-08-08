import React, { useEffect, useMemo, useState } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
import styled from 'styled-components';
import useExecuteHook from '@/components/organisms/execute/hooks/useExecueteHook';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { isValidAddress, parseAmountWithDecimal2 } from '@/utils/common';
import { compareStringNumbers, getTokenAmountFromUToken } from '@/utils/balance';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';

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
    // isValid,
    isLast,
    decimals,
    // addressTitle,
    // addressPlaceholder,
    // amountTitle,
    inputId
}: IProps) => {
    const id = inputId;

    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const allowanceByAddress = useExecuteStore((v) => v.allowanceByAddress);
    const setAllowanceByAddress = useExecuteStore((v) => v.setAllowanceByAddress);

    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFromError = useFormStore((state) => state.clearFormError);
    const { getCw20AllowanceBalance, getCw20Balance } = useExecuteHook();

    const [addressCW20Balance, setAddressCW20Balance] = useState<string>("0");

    const availableAmount = useMemo(() => {
        if (address.toLowerCase() === "") return "0";

        if (allowanceByAddress[address.toLowerCase()] && addressCW20Balance) {
            console.log("allowanceByAddress[address.toLowerCase()]", allowanceByAddress[address.toLowerCase()]);
            console.log("addressCW20Balance", addressCW20Balance);
            const compareStatus = compareStringNumbers(allowanceByAddress[address.toLowerCase()], addressCW20Balance);
            
            if (compareStatus === 1) {
                return addressCW20Balance;
            } else if (compareStatus === 0) {
                return addressCW20Balance;
            } else if (compareStatus === -1) {
                return allowanceByAddress[address.toLowerCase()];
            }
        } else {
            return "0";
        }
    }, [addressCW20Balance, allowanceByAddress]);

    const checkValidAddress = (value: string) => {
        if (value === '') {
            clearFromError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
            clearFromError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
            return;
        }

        if (userAddress.toLowerCase() !== value.toLowerCase()) clearFromError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });
        else {
            setFormError({ id: `${id}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
            return;
        }

        if (FirmaUtil.isValidAddress(value)) clearFromError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
    };

    const handleAddress = async (value: string) => {
        checkValidAddress(value);

        onChangeAddress(value);
    };

    const handleAmount = (value: string) => {
        onChangeAmount(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    const getAllownace = async () => {
        try {
            const {
                success,
                blockHeight: nowBlockHeight,
                data: allowance
            } = await getCw20AllowanceBalance(contractAddress, address, userAddress);

            if (success) {
                if (allowance.expires['never']) {
                    // setAllowance(allowance.allowance);
                    setAllowanceByAddress({ address: address.toLowerCase(), amount: allowance.allowance });
                } else if (allowance.expires['at_time']) {
                    const nowTimestamp = Number(new Date());
                    const expiresTimestamp = Math.floor(Number(allowance.expires['at_time']) / 1000000);

                    if (expiresTimestamp > nowTimestamp) {
                        // setAllowance(allowance.allowance);
                        setAllowanceByAddress({ address: address.toLowerCase(), amount: allowance.allowance });
                    }
                } else {
                    //? at_height
                    const expiresBlockHeight = allowance.expires['at_height'];

                    if (expiresBlockHeight > nowBlockHeight) {
                        // setAllowance(allowance.allowance);
                        setAllowanceByAddress({ address: address.toLowerCase(), amount: allowance.allowance });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAddressCW20Balance = async () => {
        try {
            const { success, balance } = await getCw20Balance(contractAddress, address);

            if (success) {
                setAddressCW20Balance(balance);
            }
        } catch (error) {
            console.log(error);
            setAddressCW20Balance("0");
        }
    };

    useEffect(() => {
        if (Number(availableAmount) > 0) handleAmount('');
        if (isValidAddress(address)) {
            getAllownace();
            getAddressCW20Balance();
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
                                emptyErrorMessage: 'Please input mint amount',
                                textAlign: 'right',
                                maxValue: getTokenAmountFromUToken(availableAmount, decimals.toString())
                                // hideErrorMessage: true
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
                    <IconButton
                        style={{
                            width: '32px',
                            height: '32px',
                            padding: '0',
                            background: 'transparent',
                            border: 'unset'
                        }}
                        disabled={index === 1 && isLast}
                        onClick={handleRemoveWallet}
                    >
                        {index === 1 && isLast ? (
                            <img style={{ width: '32px', height: '32px' }} src={IC_MINUS_CIRCLE_DISABLE} />
                        ) : (
                            <Icons.MinusCircle />
                        )}
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CW20BurnFromInput);
