import React, { useEffect } from 'react';
import styled from 'styled-components';

import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';
import {
    compareStringNumbers,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    isZeroStringValue
} from '@/utils/balance';
import { isValidAddress } from '@/utils/address';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { parseAmountWithDecimal2 } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import useExecuteHook from '@/components/organisms/execute/hooks/useExecueteHook';
import commaNumber from 'comma-number';
import WalletRemoveButton from '../buttons/walletRemoveButton';

const AllowanceTypo = styled.div`
    color: var(--Gray-550, #444);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */

    width: fit-content;
`;

interface IProps {
    index: number;
    transferFromInfo: ITransferFrom;
    // address: string;
    // amount: string;
    onChange: (index, value: ITransferFrom) => void;
    // onChangeAddress: (value: string) => void;
    // onChangeAmount: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    decimals: string;
    // addressTitle: string;
    // addressPlaceholder: string;
    // amountTitle: string;
    inputId: string;
}

const TransferFromWalletInput = ({
    index,
    transferFromInfo,
    // address,
    // amount,
    onChange,
    // onChangeAddress,
    // onChangeAmount,
    onRemoveClick,
    isValid,
    decimals,
    isLast,
    // addressTitle,
    // addressPlaceholder,
    // amountTitle,
    inputId
}: IProps) => {
    const id = inputId;
    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useExecuteStore((v) => v.contractAddress);

    const { getCw20Balance, getCw20AllowanceBalance } = useExecuteHook();

    const fromAddressId = `${id}_FROM_ADDRESS`;
    const fromBalanceId = `${id}_FROM_BALANCE`;
    const toAddressId = `${id}_TO_ADDRESS`;
    const transferAmountId = `${id}_TO_AMOUNT`;

    const balance = useExecuteStore((v) => v.balanceByAddress[transferFromInfo.fromAddress.toLowerCase()]) || '';
    const allowance = useExecuteStore((v) => v.allowanceByAddress[transferFromInfo.fromAddress.toLowerCase()]) || '';

    const disableRemoveBtn = isLast;

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const checkOwnerAddress = (value: string) => {
        //! value is empty
        if (value !== '') {
            //! if address is invalid
            if (isValidAddress(value)) clearFormError({ id: fromAddressId, type: 'INVALID_ADDRESS' });
            else {
                setFormError({ id: fromAddressId, type: 'INVALID_ADDRESS', message: 'This is an invalid wallet address.' });
                return;
            }

            //! if address is same with connected address
            if (value.toLowerCase() !== userAddress.toLowerCase()) clearFormError({ id: fromAddressId, type: 'SAME_WITH_USER' });
            else {
                setFormError({ id: fromAddressId, type: 'SAME_WITH_USER', message: 'Self address is not allowed.' });
                return;
            }
        } else {
            //? clear other error except empty error
            clearFormError({ id: fromAddressId, type: 'INVALID_ADDRESS' });
            clearFormError({ id: fromAddressId, type: 'SAME_WITH_USER' });
        }
    };

    const checkRecipientAddress = (value: string) => {
        if (value !== '' && isValidAddress(value)) clearFormError({ id: toAddressId, type: 'INVALID_ADDRESS' });
        else setFormError({ id: toAddressId, type: 'INVALID_ADDRESS', message: 'This is an invalid wallet address.' });
    };

    const getOwnerBalance = async (ownerAddress: string) => {
        const { success, balance } = await getCw20Balance(contractAddress, ownerAddress);

        useExecuteStore
            .getState()
            .setBalanceByAddress({ address: ownerAddress.toLowerCase(), amount: getTokenAmountFromUToken(balance, decimals) });
    };

    const getUserAllowance = async (ownerAddress: string) => {
        const {
            success,
            blockHeight,
            data: { allowance, expires }
        } = await getCw20AllowanceBalance(contractAddress, ownerAddress, userAddress);

        if (success) {
            if (expires['never']) {
                useExecuteStore.getState().setAllowanceByAddress({
                    address: ownerAddress.toLowerCase(),
                    amount: allowance // getTokenAmountFromUToken(allowance, decimals)
                });
                return;
            }

            if (expires['at_height']) {
                if (BigInt(expires['at_height']) > BigInt(blockHeight)) {
                    useExecuteStore.getState().setAllowanceByAddress({
                        address: ownerAddress.toLowerCase(),
                        amount: allowance // getTokenAmountFromUToken(allowance, decimals)
                    });
                    return;
                }
            }

            if (expires['at_time']) {
                //? approved to certain time. need to check
                const expirationTimestamp = BigInt(expires['at_time']) / BigInt(1_000_000);

                if (expirationTimestamp > BigInt(Number(new Date()))) {
                    useExecuteStore.getState().setAllowanceByAddress({
                        address: ownerAddress.toLowerCase(),
                        amount: allowance //getTokenAmountFromUToken(allowance, decimals)
                    });
                    return;
                }
            }
        }

        useExecuteStore.getState().setAllowanceByAddress({ address: ownerAddress.toLowerCase(), amount: '' });
    };

    const handleOnChange = (id: string, value: string) => {
        const _data = { ...transferFromInfo };

        switch (id) {
            case fromAddressId:
                checkOwnerAddress(value);
                _data.fromAddress = value;
                _data.fromAmount = '';
                _data.allowanceAmount = '';
                _data.toAmount = '';
                if (isValidAddress(value)) {
                    getOwnerBalance(value);
                    getUserAllowance(value);
                }
                break;

            case fromBalanceId:
                _data.fromAmount = value;
                break;

            case toAddressId:
                checkRecipientAddress(value);
                _data.toAddress = value;
                // _data.allowanceAmount = '';
                // _data.toAmount = '';
                break;

            case transferAmountId:
                if (!isZeroStringValue(value)) clearFormError({ id: transferAmountId, type: 'INVALID_TRANSFER_FROM_AMOUNT' });
                else
                    setFormError({
                        id: transferAmountId,
                        type: 'INVALID_TRANSFER_FROM_AMOUNT',
                        message: 'Please enter a value other than 0.'
                    });

                _data.toAmount = value;
                // if (isValidAddress(_data.toAddress)) {
                //     const compare = compareStringNumbers(getUTokenAmountFromToken(value, decimals), _data.allowanceAmount);
                //     if (compare === 1) {
                //         _data.toAmount = getTokenAmountFromUToken(_data.allowanceAmount, decimals);
                //     } else {
                //         _data.toAmount = value;
                //     }
                // }
                break;
        }

        onChange(index - 1, _data);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    // useEffect(() => {
    //     return () => {
    //         clearFormError({ id: fromAddressId });
    //         clearFormError({ id: fromBalanceId });
    //         clearFormError({ id: toAddressId });
    //         clearFormError({ id: transferAmountId });
    //     };
    // }, []);

    const addressError = useFormStore((state) => state.formError[`${id}_FROM_ADDRESS`]) || {};
    const amountError = useFormStore((state) => state.formError[`${id}_TO_AMOUNT`]) || {};

    const hasAddrErr = Object.keys(addressError).length > 0;
    const hasAmountErr = Object.keys(amountError).length > 0;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                {/*  height: '190px', */}
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '12px' }}>
                        {/* Wallet Address */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                            <LabelInput
                                labelProps={{ index, label: 'Owner Address' }}
                                inputProps={{
                                    formId: fromAddressId,
                                    value: transferFromInfo.fromAddress,
                                    onChange: (v) => handleOnChange(fromAddressId, v),
                                    placeHolder: 'Input address',
                                    regex: WALLET_ADDRESS_REGEX,
                                    emptyErrorMessage: 'Please input firmachain wallet address.'
                                }}
                            />
                        </div>
                        {/* Wallet Amount */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                width: '100%',
                                maxWidth: '164px',
                                gap: '8px'
                            }}
                        >
                            <LabelInput
                                labelProps={{ label: 'Balance' }}
                                inputProps={{
                                    formId: fromBalanceId,
                                    value: commaNumber(balance),
                                    onChange: (v) => handleOnChange(fromBalanceId, v),
                                    placeHolder: '0',
                                    type: 'string',
                                    // decimal: decimals ? Number(decimals) : 6,
                                    textAlign: 'right',
                                    readOnly: true
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '12px' }}>
                        {/* Wallet Address */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                width: '100%',
                                gap: '8px'
                            }}
                        >
                            <LabelInput
                                labelProps={{ index, label: 'Recipient Address' }}
                                inputProps={{
                                    formId: toAddressId,
                                    value: transferFromInfo.toAddress,
                                    onChange: (v) => handleOnChange(toAddressId, v),
                                    placeHolder: 'Input address',
                                    regex: WALLET_ADDRESS_REGEX,
                                    emptyErrorMessage: 'Please input firmachain wallet address.'
                                }}
                            />
                        </div>
                        {/* Wallet Amount */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                width: '100%',
                                maxWidth: '164px',
                                gap: '4px'
                            }}
                        >
                            <LabelInput
                                labelProps={{ label: 'Amount' }}
                                inputProps={{
                                    formId: transferAmountId,
                                    value: transferFromInfo.toAmount,
                                    onChange: (v) => handleOnChange(transferAmountId, v),
                                    //  handleAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: decimals ? Number(decimals) : 6,
                                    textAlign: 'right',
                                    emptyErrorMessage: 'Please input the amount.',
                                    hideErrorMessage: true,
                                    maxValue: getTokenAmountFromUToken(allowance, decimals)
                                }}
                            />
                            <AllowanceTypo
                                className="clamp-single-line"
                                data-tooltip-content={parseAmountWithDecimal2(allowance, decimals)}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >{`Allowance : ${parseAmountWithDecimal2(allowance, decimals, true)}`}</AllowanceTypo>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    // height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '4px',
                    paddingTop: hasAddrErr && amountError ? 0 : '8px'
                    // padding: '28px 0 16px'
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: hasAddrErr && !hasAmountErr ? '28px' : hasAddrErr && amountError ? '40px' : '28px',
                        borderTopRightRadius: '8px',
                        borderTop: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
                <WalletRemoveButton size={'32px'} disabled={disableRemoveBtn} onClick={handleRemoveWallet} />
                {/* <IconButton
                    disabled={disableRemoveBtn}
                    style={{
                        width: '32px',
                        height: '32px',
                        padding: '0',
                        background: 'transparent',
                        border: 'unset'
                    }}
                    onClick={handleRemoveWallet}
                >
                    <Icons.MinusCircle fill={disableRemoveBtn ? '#313131' : undefined} stroke={disableRemoveBtn ? '#1E1E1E' : undefined} />
                </IconButton> */}
                <div
                    style={{
                        width: '16px',
                        height: !hasAddrErr && hasAmountErr ? '46px' : hasAddrErr && amountError ? '40px' : '28px',
                        borderBottomRightRadius: '8px',
                        borderBottom: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(TransferFromWalletInput);
