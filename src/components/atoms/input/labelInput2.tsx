import React, { useState } from 'react';
import VariableInput2 from './variableInput2';
import useFormStore from '@/store/formStore';
import Icons from '../icons';
import styled from 'styled-components';
import commaNumber from 'comma-number';
import IconTooltip from '../tooltip';

interface ILabelProps {
    index?: number;
    label: string;
    tooltip?: string; //? tooltip message | if not provided, tooltip icon will be visible if provided.
    TooltipIcon?: string | JSX.Element; //? custom tooltip img url or react element;
    labelHeight?: string;
}

interface IInputProps {
    value: string;
    formId: string;
    placeHolder: string;
    maxLength?: number;
    onChange: (value: string) => void;
    onBlur?: () => void;
    emptyErrorMessage?: string;
    imgPreview?: boolean; //? if require preive image
    regex?: RegExp;
    type?: 'string' | 'number' | 'date';
    decimal?: number;
    maxValue?: number;
    textAlign?: 'left' | 'center' | 'right';
    readOnly?: boolean;
}

const IconBackground = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

const checkImageUrl = (url: string, onValid: () => void, onInvalid: () => void) => {
    if (url) {
        const img = new Image();
        img.src = url;
        img.onload = () => onValid();
        img.onerror = () => onInvalid();
    } else {
        onValid();
    }
};

const LabelInput2 = ({ labelProps, inputProps }: { labelProps: ILabelProps; inputProps: IInputProps }) => {
    const { index, label, tooltip = '', TooltipIcon = <Icons.Info width={'12px'} height={'12px'} />, labelHeight } = labelProps;
    const {
        value,
        formId,
        placeHolder,
        maxLength,
        onChange,
        emptyErrorMessage,
        onBlur = () => {},
        imgPreview = false,
        regex, //? will not work in type 'number'
        type = 'string',
        decimal = 6,
        maxValue,
        textAlign = 'left',
        readOnly = false
    } = inputProps;

    const errorMessage = Object.values(useFormStore((state) => state.formError[formId]) || {});
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    const handleChange = (value: string) => {
        let inputValue = value;

        if (imgPreview) {
            checkImageUrl(
                inputValue,
                () => {
                    setValidTokenLogoUrl(inputValue);
                },
                () => {
                    setValidTokenLogoUrl('');
                }
            );
        }

        //? if final string is empty and error message is provided, show it.
        if (emptyErrorMessage) {
            if (inputValue.length === 0) setFormError({ id: formId, type: 'INPUT_IS_EMPTY', message: emptyErrorMessage });
            else clearFormError({ id: formId, type: 'INPUT_IS_EMPTY' });
        } else {
            //? if empty error message is not provided
            if (inputValue.length === 0) clearFormError({ id: formId, type: 'INPUT_IS_EMPTY' });
        }

        onChange(inputValue);
    };

    const handleBlur = () => {
        if (emptyErrorMessage) {
            if (value.length === 0) setFormError({ id: formId, type: 'INPUT_IS_EMPTY', message: emptyErrorMessage });
            else clearFormError({ id: formId, type: 'INPUT_IS_EMPTY' });
        } else {
            if (value.length === 0) clearFormError({ id: formId, type: 'INPUT_IS_EMPTY' });
        }

        onBlur();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '8px', width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '8px',
                    height: labelHeight || '20px'
                }}
            >
                {typeof index === 'number' && index > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: '#313131',
                            fontSize: '12px',
                            color: '#999',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {index}
                    </div>
                )}
                <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</div>
                {typeof tooltip === 'string' && tooltip.length > 0 && <IconTooltip tooltip={tooltip} TooltipIcon={TooltipIcon} />}
            </div>

            {imgPreview && (
                <div
                    style={{
                        display: 'flex',
                        width: '90px',
                        height: '90px',
                        backgroundColor: '#262626',
                        borderRadius: '153.409px',
                        border: '1px solid #383838',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {validTokenLogoUrl === '' ? (
                        <IconBackground>
                            <Icons.Picture width={'34px'} height={'34px'} />
                        </IconBackground>
                    ) : (
                        <img
                            src={validTokenLogoUrl}
                            alt="token-logo"
                            style={{ width: '90px', height: '90px', maxHeight: '100%', maxWidth: '100%' }}
                        />
                    )}
                </div>
            )}

            <VariableInput2
                value={type === 'number' ? commaNumber(value) : value}
                type={type}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={maxLength}
                placeHolder={placeHolder}
                textAlign={textAlign}
                errorMessage={errorMessage}
                readOnly={readOnly}
                decimal={decimal}
                maxValue={maxValue}
                regex={regex}
            />
        </div>
    );
};

export default LabelInput2;
