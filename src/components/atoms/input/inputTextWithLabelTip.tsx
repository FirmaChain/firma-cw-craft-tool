import React, { CSSProperties } from 'react';
import { Tooltip } from '@mui/material';
import { InputType } from '@/interfaces/input';
import Icons from '../icons';
import VariableInput from './variableInput';

interface IProps {
    placeHolderLeft: string;
    placeHolderRight?: string;
    label: string;
    tooltipText?: string;
    value: string | number | null;
    type?: InputType;
    sx?: CSSProperties;
    isValid?: boolean;
    decimals?: string;
    onChange: (value: string) => void;
}

const InputTextWithLabelTip = ({
    placeHolderLeft,
    placeHolderRight,
    label,
    tooltipText = '',
    value,
    type = 'text',
    sx = {},
    isValid = false,
    decimals,
    onChange
}: IProps) => {
    const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            let value = event.currentTarget.value;

            const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
            if (regex.test(value)) {
                onChange(value);
            }
        } else {
            onChange(event.currentTarget.value);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '20px', color: '#DCDCDC' }}>{label}</div>

                {tooltipText !== '' ? (
                    <Tooltip
                        // arrow
                        title={tooltipText}
                        PopperProps={{
                            sx: {
                                '& .MuiTooltip-tooltip': {
                                    width: 'calc(100% - 24px)',
                                    height: 'auto',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    lineHeight: '20px',
                                    backgroundColor: '#383838',
                                    color: '#FFFFFF',
                                    padding: '12px 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }
                            }
                        }}
                    >
                        <div style={{ display: 'flex', cursor: 'help', height: 'fit-content' }}>
                            <Icons.Info width={'12px'} height={'12px'} />
                        </div>
                    </Tooltip>
                ) : (
                    <></>
                )}
            </div>
            <VariableInput value={value} onChange={handleInputText} placeHolder={placeHolderLeft} />
        </div>
    );
};

export default InputTextWithLabelTip;
