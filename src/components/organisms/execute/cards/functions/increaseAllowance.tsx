import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import { getTokenStrFromUTokenStr } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput from '@/components/atoms/input/variableInput';
import { compareStringNumbers, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import useFormStore from '@/store/formStore';
import { addNanoSeconds } from '@/utils/time';
import ExpirationModal from '@/components/organisms/modal/expirationModal';
import { useModalStore } from '@/hooks/useModal';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { ONE_TO_MINE, WALLET_ADDRESS_REGEX } from '@/constants/regex';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */

    white-space: pre;
`;

const InputTitle = styled.div`
    color: var(--Gray-800, #dcdcdc);

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationTypButton = styled(IconButton)<{ $selected?: boolean }>`
    width: 152px;
    height: 36px;
    border-radius: 8px;
    // padding: 8px 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Gray-500, #383838);
    background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'transparent')};

    span {
        color: ${({ $selected }) =>
            $selected ? 'var(--Gray-250, var(--200, #1e1e1e))' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))'};

        /* Body/Body2 - Bd */
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

const IncreaseAllowance = () => {
    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const isFetched = useExecuteStore((state) => state.isFetched);
    const allowance = useExecuteStore((state) => state.allowance);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const cw20Balance = useExecuteStore((state) => state.cw20Balance);
    const setAllowance = useExecuteStore((state) => state.setAllowance);
    const setIsFetched = useExecuteStore((state) => state.setIsFetched);

    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'INCREASE_ALLOWANCE';

    const [expirationType, setExpirationType] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    useEffect(() => {
        setExpirationType(ExpirationType.Height);
        setExpInputValue('');
        setIsFetched(false);
    }, [isFetched]);

    useEffect(() => {
        setAllowance({
            address: '',
            amount: '',
            type: 'at_height',
            expire: ''
        });

        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearAllowance();
        };
    }, []);

    const checkAddressValid = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });
            return;
        }

        if (value.toLowerCase() === userAddress)
            setFormError({ id: `${inputId}_ADDRESS`, type: 'DO_NOT_USE_SELF_ADDRESS', message: 'Cannot use self address.' });
        else clearFormError({ id: `${inputId}_ADDRESS`, type: 'DO_NOT_USE_SELF_ADDRESS' });
    };

    const handleChangeAddress = (value: string) => {
        checkAddressValid(value);

        setAllowance({
            address: value,
            amount: allowance?.amount,
            type: !allowance?.type ? 'at_height' : allowance.type,
            expire: allowance?.expire
        });
    };

    const handleChangeAmount = (value: string) => {
        const onlyNumbers = value.replace(ONE_TO_MINE, '');
        if (onlyNumbers === '') setFormError({ id: `${inputId}_AMOUNT`, type: 'VALUE_IS_ZERO', message: 'Please input amount' });
        else clearFormError({ id: `${inputId}_AMOUNT`, type: 'VALUE_IS_ZERO' });

        const truncateDecimals = (value: string) => {
            const decimalPlaces = parseInt(tokenInfo.decimals.toString(), 10);
            const fractionalPart = value.split('.')[1];

            if (!fractionalPart || fractionalPart.length <= decimalPlaces) {
                return value;
            }
            return cw20Balance;
        };

        const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
        if (!isValidFormat) {
            return;
        }

        const truncatedValue = truncateDecimals(value);
        const convertIncreaseAmount = getUTokenAmountFromToken(truncatedValue, tokenInfo.decimals.toString());
        const increaseAmount =
            compareStringNumbers(cw20Balance, convertIncreaseAmount) === 1
                ? truncatedValue
                : getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString());

        setAllowance({
            address: allowance === null ? '' : allowance?.address,
            amount: increaseAmount,
            type: allowance === null ? '' : !allowance.type ? 'at_height' : allowance.type,
            expire: allowance === null ? '' : allowance.expire
        });
    };

    const handleChangeExpireType = (value: ExpirationType) => {
        if (value !== expirationType) {
            setExpInputValue('');
            setExpirationType(value);

            let expireType = '';
            switch (value) {
                case 'Time':
                    expireType = 'at_time';
                    break;
                case 'Height':
                    expireType = 'at_height';
                    break;
                case 'Forever':
                    expireType = 'never';
                    break;
            }

            setAllowance({
                address: allowance === null ? '' : !allowance.address ? '' : allowance.address,
                amount: allowance === null ? '' : !allowance.amount ? '' : allowance.amount,
                type: expireType,
                expire: ''
            });
        }
    };

    const handleChangeExpireValue = (value: string) => {
        setExpInputValue(value);

        let expireValue = '';
        if (allowance.type === 'at_time') {
            expireValue = addNanoSeconds(value);
        } else if (allowance.type === 'at_height') {
            expireValue = value;
        }

        setAllowance({
            address: allowance === null ? '' : allowance?.address,
            amount: allowance === null ? '' : allowance?.amount,
            type: allowance === null ? '' : allowance?.type,
            expire: expireValue
        });
    };

    const handleAllowanceDate = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <ExpirationModal id={id} setExpirationDate={(value) => handleChangeExpireValue(value)} />
        });
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Increase Allowance</HeaderTitleTypo>
                    <HeaderDescTypo>Give Someone permission to use my token</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Address / Amount Input */}
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                            <LabelInput
                                labelProps={{ label: 'Recipient Address' }}
                                inputProps={{
                                    formId: `${inputId}_ADDRESS`,
                                    value:
                                        allowance === null || allowance === undefined ? '' : !allowance?.address ? '' : allowance?.address,
                                    onChange: handleChangeAddress,
                                    placeHolder: 'Input Wallet Address',
                                    emptyErrorMessage: 'Please input firmachain wallet address.',
                                    regex: WALLET_ADDRESS_REGEX
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                minWidth: '212px',
                                maxWidth: '212px',
                                gap: '8px'
                            }}
                        >
                            <LabelInput
                                labelProps={{ label: 'Increase Amount' }}
                                inputProps={{
                                    formId: `${inputId}_AMOUNT`,
                                    value: allowance === null || allowance === undefined || !allowance?.amount ? '' : allowance?.amount,
                                    onChange: handleChangeAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: tokenInfo?.decimals,
                                    emptyErrorMessage: 'Please input amount',
                                    textAlign: 'right',
                                    // maxValue: Number(getTokenStrFromUTokenStr(cw20Balance, tokenInfo.decimals.toString())),
                                    hideErrorMessage: true
                                }}
                            />

                            <UserBalanceTypo className="clamp-single-line">
                                Balance: {getTokenStrFromUTokenStr(cw20Balance, tokenInfo.decimals.toString())}
                            </UserBalanceTypo>
                        </div>
                    </div>
                </div>
                {/* Expiration Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InputTitle>Expiration</InputTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        {Object.values(ExpirationType).map((type) => (
                            <ExpirationTypButton
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
                            </ExpirationTypButton>
                        ))}
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <VariableInput
                        value={expInputValue}
                        placeHolder={
                            expirationType === ExpirationType.Height
                                ? 'ex) 7216240'
                                : expirationType === ExpirationType.Time
                                  ? 'ex) MM-DD-YYYY  HH:MM:SS'
                                  : 'FOREVER'
                        }
                        type={expirationType === ExpirationType.Time ? 'date' : 'number'}
                        onChange={handleChangeExpireValue}
                        readOnly={expirationType === ExpirationType.Forever}
                        decimal={0}
                        onClickDate={handleAllowanceDate}
                    />
                </div>
            </div>
        </Container>
    );
};

export default IncreaseAllowance;
