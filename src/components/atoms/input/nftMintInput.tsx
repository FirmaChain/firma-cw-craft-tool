import React, { useEffect } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';

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

const NFTMintInput = ({
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
    const clearFromError = useFormStore((state) => state.clearFormError);

    const handleAddress = (value: string) => {
        const filtered = value.replace(/[^a-zA-Z0-9]/g, '');

        onChangeLeft(filtered);
    };

    const handleAmount = (value: string) => {
        onChangeRight(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    // useEffect(() => {
    //     return () => {
    //         clearFromError({ id: `${id}_ADDRESS` });
    //         clearFromError({ id: `${id}_AMOUNT` });
    //     };
    // }, []);

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '12px' }}>
                {/* Wallet Address */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        maxWidth: '133px',
                        width: '100%',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ label: leftTitle }}
                        inputProps={{
                            formId: `${id}_${leftTitle}`,
                            value: leftValue,
                            onChange: handleAddress,
                            placeHolder: leftPlaceholder,
                            type: 'number',
                            decimal: 0,
                            readOnly: disabled
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

                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ label: rightTitle }}
                        inputProps={{
                            formId: `${id}_${rightTitle}`,
                            value: rightValue,
                            onChange: handleAmount,
                            placeHolder: rightPlaceholder
                        }}
                    />
                </div>
                {/* Button */}
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
        </div>
    );
};

export default React.memo(NFTMintInput);
