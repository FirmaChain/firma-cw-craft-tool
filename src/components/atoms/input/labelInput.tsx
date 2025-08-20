import { JSX, useEffect, useState } from 'react';
import VariableInput from './variableInput';
import useFormStore from '@/store/formStore';
import Icons from '../icons';
import styled from 'styled-components';
import commaNumber from 'comma-number';
import IconTooltip from '../tooltip';
import { checkImageUrl } from '@/utils/common';
import TokenLogo from '../icons/TokenLogo';

interface ILabelProps {
    index?: number;
    label: string;
    subText?: string;
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
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onBlur?: () => void;
    emptyErrorMessage?: string;
    imgPreview?: boolean; //? if require preive image
    regex?: RegExp;
    type?: 'string' | 'number' | 'date' | 'password';
    decimal?: number;
    maxValue?: string;
    textAlign?: 'left' | 'center' | 'right';
    readOnly?: boolean;
    disabled?: boolean;
    hideErrorMessage?: boolean;
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

const LabelSubText = styled.div`
    color: var(--Gray-600, #5a5a5a);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const LabelInput = ({ labelProps, inputProps }: { labelProps: ILabelProps; inputProps: IInputProps }) => {
    const { index, label, subText, tooltip = '', TooltipIcon = <Icons.Info width={'12px'} height={'12px'} />, labelHeight } = labelProps;
    const {
        value,
        formId,
        placeHolder,
        maxLength,
        onChange,
        onKeyDown,
        emptyErrorMessage,
        onBlur = () => {},
        imgPreview = false,
        regex, //? will not work in type 'number'
        type = 'string',
        decimal = 6,
        maxValue,
        textAlign = 'left',
        readOnly = false,
        disabled = false,
        hideErrorMessage = false
    } = inputProps;

    const errorMessage = Object.values(useFormStore((state) => state.formError[formId]) || {});
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        //? Img reset after cw20 instantiate | if value is empty -> clear validated img url
        if (!value && imgPreview) setValidTokenLogoUrl('');
    }, [value, imgPreview]);

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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: label === '' ? '0px' : '8px',
                width: '100%'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    gap: '8px',
                    height: labelHeight || '20px'
                }}
            >
                {typeof index === 'number' && index > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            minWidth: '24px',
                            maxWidth: '24px',
                            height: '18px',
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
                <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC', whiteSpace: 'pre' }}>{label}</div>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {typeof tooltip === 'string' && tooltip.length > 0 && <IconTooltip tooltip={tooltip} />}
                </div>

                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <LabelSubText>{subText}</LabelSubText>
                </div>
            </div>

            {imgPreview && <TokenLogo size="90px" src={validTokenLogoUrl} />}

            <VariableInput
                value={type === 'number' ? commaNumber(value) : value}
                type={type}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onBlur={handleBlur}
                maxLength={maxLength}
                placeHolder={placeHolder}
                textAlign={textAlign}
                errorMessage={errorMessage}
                readOnly={readOnly}
                decimal={decimal}
                maxValue={maxValue}
                regex={regex}
                disabled={disabled}
                hideErrorMessage={hideErrorMessage}
                inputId={formId}
            />
        </div>
    );
};

export default LabelInput;
