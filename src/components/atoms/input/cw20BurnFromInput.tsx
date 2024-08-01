import React, { useEffect, useId, useState } from 'react';
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
import { isValidAddress } from '@/utils/common';
import { getTokenAmountFromUToken } from '@/utils/balance';
import commaNumber from 'comma-number';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
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
    isValid,
    isLast,
    decimals,
    addressTitle,
    addressPlaceholder,
    amountTitle,
    inputId
}: IProps) => {
    const id = inputId;

    const { firmaSDK } = useExecuteHook();
    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const userAddress = useSelector((v: rootState) => v.wallet.address);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFromError = useFormStore((state) => state.clearFormError);

    const [allowance, setAllowance] = useState('0');

    const handleAddress = async (value: string) => {
        const filtered = value.replace(/[^a-zA-Z0-9]/g, '');

        if (FirmaUtil.isValidAddress(filtered) || value === '') clearFromError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `${id}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });

        onChangeAddress(filtered);
    };

    const handleAmount = (value: string) => {
        onChangeAmount(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    const getAllownace = async () => {
        try {
            const allowance = await firmaSDK.Cw20.getAllowance(contractAddress, address, userAddress);

            setAllowance(allowance.allowance);
        } catch (error) {
            console.log(error);
            setAllowance('0');
        }
    };

    useEffect(() => {
        if (isValidAddress(address)) getAllownace();
        else setAllowance('');
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
                                emptyErrorMessage: 'Please input firmachain wallet address.'
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            minWidth: '212px',
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
                                // emptyErrorMessage: 'Please input mint amount',
                                textAlign: 'right',
                                maxValue: Number(getTokenAmountFromUToken(allowance, decimals.toString()))
                            }}
                        />

                        <UserBalanceTypo>
                            Allowance : {commaNumber(getTokenAmountFromUToken(allowance, decimals.toString()))}
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
