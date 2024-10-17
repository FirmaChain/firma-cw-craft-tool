import React from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { IExecuteTransfer } from '@/interfaces/cw721';
import { NUMBERS_WITH_COMMA, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

interface IProps {
    index: number;
    leftValue: string;
    rightValue: string;
    onChangeLeft: (value: string) => void;
    onChangeRight: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    leftTitle: string;
    leftPlaceholder: string;
    rightTitle: string;
    rightPlaceholder: string;
    inputId: string;
    disabled?: boolean;
    allList: IExecuteTransfer[];
}

const TransferNFTInput = ({
    index,
    leftValue,
    rightValue,
    onChangeLeft,
    onChangeRight,
    onRemoveClick,
    isValid,
    isLast,
    leftTitle,
    leftPlaceholder,
    rightTitle,
    rightPlaceholder,
    inputId,
    disabled,
    allList
}: IProps) => {
    const id = inputId;
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const address = useSelector((v: rootState) => v.wallet.address);
    const addressError = useFormStore((state) => state.formError[`${id}_${leftTitle}`]) || {};
    const idError = useFormStore((state) => state.formError[`${id}_${rightTitle}`]) || {};

    const hasAddrErr = Object.keys(addressError).length > 0;
    const hasIdErr = Object.keys(idError).length > 0;

    const handleAddress = (value: string) => {
        if (value.toLowerCase() === address.toLowerCase()) {
            setFormError({ id: `${id}_${leftTitle}`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
        } else {
            clearFormError({ id: `${id}_${leftTitle}`, type: 'CANNOT_USE_SELF_ADDRESS' });
        }

        onChangeLeft(value);
    };

    const handleTokenId = (value: string) => {
        const cleanedText = value.replace(/,+/g, ',').replace(/^,/, '');

        if (cleanedText.endsWith(','))
            setFormError({ id: `${id}_${rightTitle}`, type: 'ENDS_WITH_COMMA', message: 'Token ID list must end with number.' });
        else clearFormError({ id: `${id}_${rightTitle}`, type: 'ENDS_WITH_COMMA' });

        onChangeRight(cleanedText);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    const disableRemoveBtn = allList.length <= 1;

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '12px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '12px' }}>
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
                        labelProps={{ index, label: leftTitle }}
                        inputProps={{
                            formId: `${id}_${leftTitle}`,
                            value: leftValue,
                            onChange: handleAddress,
                            placeHolder: leftPlaceholder,
                            regex: WALLET_ADDRESS_REGEX,
                            emptyErrorMessage: 'Please input firmachain wallet address.'
                        }}
                    />
                </div>

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
                        labelProps={{ label: rightTitle }}
                        inputProps={{
                            formId: `${id}_${rightTitle}`,
                            value: rightValue,
                            onChange: handleTokenId,
                            placeHolder: rightPlaceholder,
                            regex: NUMBERS_WITH_COMMA,
                            emptyErrorMessage: 'Please input the token ID.'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '4px',
                    paddingTop: '48px'
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: hasAddrErr && hasIdErr ? '37px' : '28px',
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
                        height: hasAddrErr && !hasIdErr ? '46px' : hasAddrErr && hasIdErr ? '37px' : '28px',
                        borderBottomRightRadius: '8px',
                        borderBottom: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(TransferNFTInput);
