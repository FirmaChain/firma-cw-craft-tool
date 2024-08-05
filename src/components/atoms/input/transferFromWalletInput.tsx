import React, { useEffect } from 'react';
import styled from 'styled-components';

import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';
import { compareStringNumbers, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

const AllowanceTypo = styled.div`
    color: var(--Gray-550, #444);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
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

    const fromAddressId = `${id}_FROM_ADDRESS`;
    const fromBalanceId = `${id}_FROM_BALANCE`;
    const toAddressId = `${id}_TO_ADDRESS`;
    const transferAmountId = `${id}_TO_AMOUNT`;

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
                setFormError({ id: fromAddressId, type: 'SAME_WITH_USER', message: 'Cannot use self address.' });
                return;
            }
        } else {
            //? clear other error except empty error
            clearFormError({ id: fromAddressId, type: 'INVALID_ADDRESS' });
            clearFormError({ id: fromAddressId, type: 'SAME_WITH_USER' });
        }
    };

    const checkRecipientAddress = (value: string) => {
        if (value !== '') {
            //! if address is invalid
            if (isValidAddress(value)) clearFormError({ id: toAddressId, type: 'INVALID_ADDRESS' });
            else {
                setFormError({ id: toAddressId, type: 'INVALID_ADDRESS', message: 'This is an invalid wallet address.' });
                return;
            }
        } else {
            clearFormError({ id: toAddressId, type: 'INVALID_ADDRESS' });
        }
    };

    const handleOnChange = (id: string, value: string) => {
        const _data = { ...transferFromInfo };

        switch (id) {
            case fromAddressId:
                checkOwnerAddress(value);
                _data.fromAddress = value;
                _data.fromAmount = '';
                break;

            case fromBalanceId:
                _data.fromAmount = value;
                break;

            case toAddressId:
                checkRecipientAddress(value);
                _data.toAddress = value;
                _data.allowanceAmount = '';
                _data.toAmount = '';
                break;

            case transferAmountId:
                if (isValidAddress(_data.toAddress)) {
                    const compare = compareStringNumbers(getUTokenAmountFromToken(value, decimals), _data.allowanceAmount);
                    if (compare === 1) {
                        _data.toAmount = getTokenAmountFromUToken(_data.allowanceAmount, decimals);
                    } else {
                        _data.toAmount = value;
                    }
                }
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

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '100%', height: '190px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                                    emptyErrorMessage: 'Please input wallet address.'
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
                                    value: getTokenAmountFromUToken(transferFromInfo.fromAmount, decimals),
                                    onChange: (v) => handleOnChange(fromBalanceId, v),
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: decimals ? Number(decimals) : 6,
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
                                    emptyErrorMessage: 'Please input wallet address.'
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
                                    emptyErrorMessage: 'Please input amount.',
                                    hideErrorMessage: true
                                }}
                            />
                            <AllowanceTypo className="clamp-single-line">{`Allowance : ${formatWithCommas(getTokenAmountFromUToken(transferFromInfo.allowanceAmount, decimals))}`}</AllowanceTypo>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '28px 0 16px'
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: '28px',
                        borderTopRightRadius: '8px',
                        borderTop: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
                <IconButton
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
                </IconButton>
                <div
                    style={{
                        width: '16px',
                        height: '28px',
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
