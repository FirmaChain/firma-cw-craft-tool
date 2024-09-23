import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FirmaUtil } from '@firmachain/firma-js';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { parseAmountWithDecimal2 } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput from '@/components/atoms/input/variableInput';
import useFormStore from '@/store/formStore';
import {
    compareStringNumbers,
    getMaxMinterCap,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    isZeroStringValue
} from '@/utils/balance';
import { addNanoSeconds } from '@/utils/time';
import useExecuteStore from '../../hooks/useExecuteStore';
import ExpirationModal from '@/components/organisms/modal/expirationModal';
import { useModalStore } from '@/hooks/useModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { ONE_TO_MINE, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import useExecuteActions from '../../action';
import useExecuteHook from '../../hooks/useExecueteHook';
import { isValidAddress } from '@/utils/address';
import ExpirationTypeButton from '@/components/atoms/buttons/expirationTypeButton';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
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

const DecreaseAllowance = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const isFetched = useExecuteStore((state) => state.isFetched);
    const allowance = useExecuteStore((state) => state.allowance);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setAllowance = useExecuteStore((state) => state.setAllowance);
    const setIsFetched = useExecuteStore((state) => state.setIsFetched);

    const { getCw20AllowanceBalance } = useExecuteHook();

    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'DECREASE_ALLOWANCE';

    const [allowAmount, setAllowAmount] = useState<string>('');
    const [expirationType, setExpirationType] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    useEffect(() => {
        setAllowance({
            address: '',
            amount: '',
            type: 'at_height',
            expire: ''
        });
        setExpirationType(ExpirationType.Height);
        setExpInputValue('');
        setIsFetched(false);
        setAllowAmount('');
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
            useExecuteStore.getState().clearAllowanceInfo();
        };
    }, []);

    const checkAddressValid = (value: string) => {
        if (isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
            return false;
        }

        if (value.toLowerCase() === userAddress) {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'DO_NOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
            return false;
        } else clearFormError({ id: `${inputId}_ADDRESS`, type: 'DO_NOT_USE_SELF_ADDRESS' });

        return true;
    };

    const updateAllowance = async (searchAddress: string) => {
        const { success, blockHeight, data } = await getCw20AllowanceBalance(contractAddress, userAddress, searchAddress);

        useExecuteStore.getState().setAllowanceInfo({ ...data });

        if (success) {
            const { allowance, expires } = data;

            if (expires['never']) {
                setAllowAmount(allowance);
                return;
            }

            if (expires['at_time']) {
                const nowTimestamp = Number(new Date());
                const expiresTimestamp = Math.floor(Number(expires['at_time']) / 1000000);

                if (expiresTimestamp > nowTimestamp) {
                    setAllowAmount(allowance);
                    return;
                }
            }

            if (expires['at_height']) {
                //? at_height
                const expiresBlockHeight = expires['at_height'];

                if (expiresBlockHeight > blockHeight) {
                    setAllowAmount(allowance);
                    return;
                }
            }

            setAllowAmount('');
        }
    };

    const handleChangeAddress = (value: string) => {
        checkAddressValid(value);

        setAllowance({
            address: value,
            amount: '',
            type: !allowance?.type ? 'at_height' : allowance.type,
            expire: allowance?.expire
        });

        if (isValidAddress(value)) updateAllowance(value);
        else setAllowAmount('');
    };

    const handleChangeAmount = (value: string) => {
        if (!isZeroStringValue(value)) clearFormError({ id: `${inputId}_AMOUNT`, type: 'DECREASE_AMOUNT' });
        else setFormError({ id: `${inputId}_AMOUNT`, type: 'DECREASE_AMOUNT', message: 'Please enter a value other than 0.' });

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
                    <HeaderTitleTypo>Decrease Allowance</HeaderTitleTypo>
                    <HeaderDescTypo>Reduce the amount of tokens someone is allowed to use</HeaderDescTypo>
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
                                labelProps={{ label: 'Decrease Amount' }}
                                inputProps={{
                                    formId: `${inputId}_AMOUNT`,
                                    value: allowance === null || allowance === undefined || !allowance?.amount ? '' : allowance?.amount,
                                    onChange: handleChangeAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: tokenInfo.decimals ? tokenInfo.decimals : 6,
                                    emptyErrorMessage: 'Please input the amount.',
                                    textAlign: 'right',
                                    maxValue: getMaxMinterCap(tokenInfo.decimals.toString()),
                                    hideErrorMessage: true
                                }}
                            />

                            <UserBalanceTypo
                                className="clamp-single-line"
                                data-tooltip-content={parseAmountWithDecimal2(allowAmount, tokenInfo.decimals.toString())}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                Allowance: {parseAmountWithDecimal2(allowAmount, tokenInfo.decimals.toString(), true)}
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
        </Container>
    );
};

export default DecreaseAllowance;
