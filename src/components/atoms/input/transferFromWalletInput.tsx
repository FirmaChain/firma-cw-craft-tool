import React, { useEffect } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput2 from './labelInput2';
import useFormStore from '@/store/formStore';
import styled from 'styled-components';
import { ITransferFrom } from '@/components/organisms/execute/cards/functions/transferFrom';

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
    transfreFromInfo: ITransferFrom;
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
    transfreFromInfo,
    // address,
    // amount,
    onChange,
    // onChangeAddress,
    // onChangeAmount,
    onRemoveClick,
    isValid,
    decimals,
    // addressTitle,
    // addressPlaceholder,
    // amountTitle,
    inputId
}: IProps) => {
    const id = inputId;

    const fromAddressId = `${id}_FROM_ADDRESS`;
    const fromBalanceId = `${id}_FROM_BALANCE`;
    const toAddressId = `${id}_TO_ADDRESS`;
    const transferAmountId = `${id}_TO_AMOUNT`;

    // const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const handleOnChange = (id: string, value: string) => {
        const _data = { ...transfreFromInfo };

        switch (id) {
            case fromAddressId:
                _data.fromAddress = value;

                break;
            case toAddressId:
                _data.toAddress = value;

                break;
            case transferAmountId:
                _data.amount = value;
                break;
        }

        onChange(index - 1, _data);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    useEffect(() => {
        return () => {
            clearFormError({ id: fromAddressId });
            clearFormError({ id: fromBalanceId });
            clearFormError({ id: toAddressId });
            clearFormError({ id: transferAmountId });
        };
    }, []);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                        {/* Wallet Address */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '420px', gap: '8px' }}>
                            <LabelInput2
                                labelProps={{ index, label: 'Owner Address' }}
                                inputProps={{
                                    formId: fromAddressId,
                                    value: transfreFromInfo.fromAddress,
                                    onChange: (v) => handleOnChange(fromAddressId, v),
                                    placeHolder: 'Input address'
                                }}
                            />
                        </div>
                        {/* Wallet Amount */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '164px', gap: '8px' }}>
                            <LabelInput2
                                labelProps={{ label: 'Balance' }}
                                inputProps={{
                                    formId: fromBalanceId,
                                    value: '',

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
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                        {/* Wallet Address */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '420px', gap: '8px' }}>
                            <LabelInput2
                                labelProps={{ index, label: 'Recipient Address' }}
                                inputProps={{
                                    formId: toAddressId,
                                    value: transfreFromInfo.toAddress,
                                    onChange: (v) => handleOnChange(toAddressId, v),

                                    placeHolder: 'Input address'
                                }}
                            />
                        </div>
                        {/* Wallet Amount */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '164px', gap: '4px' }}>
                            <LabelInput2
                                labelProps={{ label: 'Amount' }}
                                inputProps={{
                                    formId: transferAmountId,
                                    value: transfreFromInfo.amount,
                                    onChange: (v) => handleOnChange(transferAmountId, v),
                                    //  handleAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: decimals ? Number(decimals) : 6,
                                    textAlign: 'right'
                                }}
                            />
                            <AllowanceTypo>Allowance : {0}</AllowanceTypo>
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
                    paddingTop: '28px'
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
                    style={{
                        width: '32px',
                        height: '32px',
                        padding: '0',
                        background: 'transparent',
                        border: 'unset',
                        cursor: 'pointer'
                    }}
                    onClick={handleRemoveWallet}
                >
                    <Icons.MinusCircle />
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
