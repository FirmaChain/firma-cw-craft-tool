import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FirmaUtil } from '@firmachain/firma-js';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput2 from '@/components/atoms/input/labelInput2';
import { getTokenStrFromUTokenStr } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput2 from '@/components/atoms/input/variableInput2';
import useFormStore from '@/store/formStore';
import { useContractContext } from '../../context/contractContext';
import { compareStringNumbers, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import { addNanoSeconds } from '@/utils/time';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const InputTitle = styled.div`
    color: var(--Gray-800, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationTypeButton = styled(IconButton)<{ $selected?: boolean }>`
    width: 152px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Gray-500, #383838);
    background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'transparent')};

    span {
        color: ${({ $selected }) =>
            $selected ? 'var(--Gray-250, var(--200, #1e1e1e))' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))'};

        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
        line-height: 20px; /* 142.857% */
    }
`;

enum ExpirationType {
    Height = 'Height',
    Time = 'Time',
    Forever = 'Forever'
}

interface IProps {
    decimals: string;
    userBalance: string;
}

const DecreaseAllowance = ({ decimals, userBalance }: IProps) => {
    const { _allowanceInfo, _isFetched, _setAllowanceInfo } = useContractContext();
    
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFromError = useFormStore((state) => state.clearFormError);
    
    const inputId = 'DECREASE_ALLOWANCE';

    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [expirationType, setExpirationType] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    useEffect(() => {
        setAddress('');
        setAmount('');
        setExpirationType(ExpirationType.Height);
        setExpInputValue('');
    }, [_isFetched]);

    const handleChangeAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') clearFromError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });

        setAddress(value);
        _setAllowanceInfo({ address: value, amount: _allowanceInfo.amount, type: _allowanceInfo.type, expire: _allowanceInfo.expire });
    };

    const handleChangeAmount = (value: string) => {
        const truncateDecimals = (value: string) => {
            const decimalPlaces = parseInt(decimals, 10);
            const fractionalPart = value.split('.')[1];

            if (!fractionalPart || fractionalPart.length <= decimalPlaces) {
                return value;
            }
            return userBalance;
        };

        const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
        if (!isValidFormat) {
            return;
        }
    
        const truncatedValue = truncateDecimals(value);
        const convertDecreaseAmount = getUTokenAmountFromToken(truncatedValue, decimals);
        const decreaseAmount = compareStringNumbers(userBalance, convertDecreaseAmount) === 1 ? truncatedValue : getTokenAmountFromUToken(userBalance, decimals);

        setAmount(decreaseAmount);
        _setAllowanceInfo({ address: _allowanceInfo.address, amount: getUTokenAmountFromToken(value, decimals), type: _allowanceInfo.type, expire: _allowanceInfo.expire });
    };

    const handleChangeExpireType = (value: ExpirationType) => {
        if (value !== expirationType) {
            setExpInputValue('');
            setExpirationType(value);
    
            let expireType = "";
            switch (value) {
                case "Time":    expireType = "at_time";     break;
                case "Height":  expireType = "at_height";   break;
                case "Forever": expireType = "never";       break;
            }
    
            _setAllowanceInfo({ address: _allowanceInfo.address, amount: _allowanceInfo.amount, type: expireType, expire: "" });
        }
    };
    
    const handleChangeExpireValue = (value: string) => {
        setExpInputValue(value);
        let expireValue = "";
        if (_allowanceInfo.type === "at_hieght") {
            expireValue = addNanoSeconds(value);
        } else if (_allowanceInfo.type === "at_height") {
            expireValue = value;
        }

        _setAllowanceInfo({ address: _allowanceInfo.address, amount: _allowanceInfo.amount, type: _allowanceInfo.type, expire: expireValue });
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Decrease Allowance</HeaderTitleTypo>
                    <HeaderDescTypo>Reduce the amount of tokens someone is allowed to use</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Address / Amount Input */}
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                            <LabelInput2
                                labelProps={{ label: 'Recipient Address' }}
                                inputProps={{
                                    formId: `${inputId}_ADDRESS`,
                                    value: address,
                                    onChange: handleChangeAddress,
                                    placeHolder: 'Input Wallet Address'
                                    // emptyErrorMessage: 'Please input firmachain wallet address'
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
                            <LabelInput2
                                labelProps={{ label: 'Decrease Amount' }}
                                inputProps={{
                                    formId: `${inputId}_AMOUNT`,
                                    value: amount,
                                    onChange: handleChangeAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: decimals ? Number(decimals) : 6,
                                    // emptyErrorMessage: 'Please input mint amount',
                                    textAlign: 'right',
                                    maxValue: Number(getTokenStrFromUTokenStr(userBalance, decimals))
                                }}
                            />

                            <UserBalanceTypo>Balance: {getTokenStrFromUTokenStr(userBalance, decimals)}</UserBalanceTypo>
                        </div>
                    </div>
                </div>
                {/* Expiration Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InputTitle>Expiration</InputTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        {Object.values(ExpirationType).map((type) => (
                            <ExpirationTypeButton
                                key={`EXPIRATION_TYPE_${type}`}
                                $selected={expirationType === type}
                                onClick={() => {
                                    handleChangeExpireType(ExpirationType[type]);
                                }}
                            >
                                <span>
                                    {type !== ExpirationType.Forever && 'At '}
                                    {type}
                                </span>
                            </ExpirationTypeButton>
                        ))}
                    </div>
                </div>
                <VariableInput2
                    value={expInputValue}
                    placeHolder={
                        expirationType === ExpirationType.Height
                            ? 'ex) 7216240'
                            : expirationType === ExpirationType.Time
                              ? 'ex) MM-DD-YYYY  HH:MM:SS'
                              : 'Forever'
                    }
                    type={expirationType === ExpirationType.Time ? 'date' : 'number'}
                    onChange={handleChangeExpireValue}
                    readOnly={expirationType === ExpirationType.Forever}
                    decimal={0}
                />
            </div>
        </Container>
    );
};

export default DecreaseAllowance;