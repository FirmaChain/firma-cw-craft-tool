import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { parseAmountWithDecimal2 } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput from '@/components/atoms/input/variableInput';
import { getMaxMinterCap, isZeroStringValue } from '@/utils/balance';
import useFormStore from '@/store/formStore';
import { addNanoSeconds } from '@/utils/time';
import ExpirationModal from '@/components/organisms/modal/expirationModal';
import useModalStore from '@/store/modalStore';
// import useExecuteStore from '../../hooks/useExecuteStore';

import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { isValidAddress } from '@/utils/address';
import useExecuteActions from '../../action';
import ExpirationTypeButton from '@/components/atoms/buttons/expirationTypeButton';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */

    white-space: pre;

    width: fit-content;
`;

const InputTitle = styled.div`
    color: var(--Gray-800, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

enum ExpirationType {
    Height = 'Height',
    Time = 'Time',
    Forever = 'Forever'
}

const IncreaseAllowance = () => {
    const { address: userAddress } = useWalletStore();
    // const userAddress = useSelector((v: rootState) => v.wallet.address);

    const context = useCW20Execute();
    const contractAddress = context.contractAddress;
    const isFetched = context.isFetched;
    const allowance = context.allowance;
    const tokenInfo = context.tokenInfo;
    const cw20Balance = context.cw20Balance;
    const setAllowance = context.setAllowance;
    const setIsFetched = context.setIsFetched;
    const clearAllowance = context.clearAllowance;
    const clearAllowanceInfo = context.clearAllowanceInfo;

    const modal = useModalStore();

    const { setCw20Balance } = useExecuteActions();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'INCREASE_ALLOWANCE';

    const [expirationType, setExpirationType] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    useEffect(() => {
        setCw20Balance(contractAddress, userAddress);

        setAllowance({
            address: '',
            amount: '',
            type: 'at_height',
            expire: ''
        });
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
            clearAllowance();
            clearAllowanceInfo();
        };
    }, []);

    const checkAddressValid = (value: string) => {
        if (isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
            return;
        }

        if (value.toLowerCase() === userAddress)
            setFormError({ id: `${inputId}_ADDRESS`, type: 'DO_NOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
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
        if (!isZeroStringValue(value)) clearFormError({ id: `${inputId}_AMOUNT`, type: 'INCREASE_AMOUNT' });
        else setFormError({ id: `${inputId}_AMOUNT`, type: 'INCREASE_AMOUNT', message: 'Please enter a value other than 0.' });

        setAllowance({
            address: allowance === null ? '' : allowance?.address,
            amount: value,
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
                                    emptyErrorMessage: 'Please input the amount.',
                                    textAlign: 'right',
                                    maxValue: getMaxMinterCap(tokenInfo?.decimals.toString()),
                                    hideErrorMessage: true
                                }}
                            />

                            <UserBalanceTypo
                                className="clamp-single-line"
                                data-tooltip-content={parseAmountWithDecimal2(cw20Balance, tokenInfo.decimals.toString())}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                Balance: {parseAmountWithDecimal2(cw20Balance, tokenInfo.decimals.toString(), true)}
                            </UserBalanceTypo>
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
                        maxValue="999999999999999"
                    />
                </div>
            </div>
        </Container>
    );
};

export default IncreaseAllowance;
