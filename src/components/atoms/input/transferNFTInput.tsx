import React, { useEffect } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
import { isValidAddress } from '@/utils/common';

interface IProps {
    index: number;
    leftValue: string;
    rightValue: string;
    onChangeLeft: (value: string) => void;
    onChangeRight: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    // decimals: string;
    leftTitle: string;
    leftPlaceholder: string;
    rightTitle: string;
    rightPlaceholder: string;
    inputId: string;
    disabled?: boolean;
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
    disabled
}: IProps) => {
    const id = inputId;
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const handleAddress = (value: string) => {
        const filtered = value.replace(/[^a-zA-Z0-9]/g, '');

        if (!filtered || isValidAddress(filtered)) clearFormError({ id: `${id}_${leftTitle}`, type: 'INVALID_ADDRESS' });
        else setFormError({ id: `${id}_${leftTitle}`, type: 'INVALID_ADDRESS', message: 'This is an invalid wallet address.' });

        onChangeLeft(filtered);
    };

    const handleTokenId = (value: string) => {
        onChangeRight(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    useEffect(() => {
        return () => {
            clearFormError({ id: `${id}_${leftTitle}` });
            clearFormError({ id: `${id}_${leftTitle}` });
        };
    }, []);

    const disableRemoveBtn = index === 1;

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
                            placeHolder: leftPlaceholder
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
                            placeHolder: rightPlaceholder
                        }}
                    />
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

export default React.memo(TransferNFTInput);
