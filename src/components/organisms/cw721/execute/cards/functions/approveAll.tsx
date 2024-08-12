import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput from '@/components/atoms/input/variableInput';
import useFormStore from '@/store/formStore';
import ExpirationModal from '@/components/organisms/modal/expirationModal';
import { useModalStore } from '@/hooks/useModal';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { isValidAddress } from '@/utils/address';

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

const ApproveAll = () => {
    const address = useSelector((v: rootState) => v.wallet.address);
    const approveRecipientAddress = useCW721ExecuteStore((state) => state.approveRecipientAddress);
    const approveType = useCW721ExecuteStore((state) => state.approveType);
    const approveValue = useCW721ExecuteStore((state) => state.approveValue);
    const setApproveRecipientAddress = useCW721ExecuteStore((state) => state.setApproveRecipientAddress);
    const setApproveType = useCW721ExecuteStore((state) => state.setApproveType);
    const setApproveValue = useCW721ExecuteStore((state) => state.setApproveValue);
    const clearApproveForm = useCW721ExecuteStore((state) => state.clearApproveForm);

    const { setFctBalance } = useCW721ExecuteAction();

    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'APPROVE_ALL';

    const handleChangeAddress = (value: string) => {
        if (isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
        }

        setApproveRecipientAddress(value);
    };

    useEffect(() => {
        clearApproveForm();
        Object.values(ExpirationType).map((type) => console.log(type));
    }, []);

    useEffect(() => {
        setFctBalance(address);
        clearApproveForm();

        return () => {
            clearFormError({ id: `${inputId}_ADDRESS` });
        };
    }, []);

    const handleChangeExpireType = (value: ExpirationType) => {
        if (value !== approveType) {
            setApproveValue('');
            setApproveType(value);

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
        }
    };

    const handleChangeExpireValue = (value: string) => {
        setApproveValue(value);
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
                    <HeaderTitleTypo>Approve All</HeaderTitleTypo>
                    <HeaderDescTypo>Give permission for another address to manage all NFTs</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Address / Amount Input */}

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                    <LabelInput
                        labelProps={{ label: 'Recipient Address' }}
                        inputProps={{
                            formId: `${inputId}_ADDRESS`,
                            value: approveRecipientAddress,
                            onChange: handleChangeAddress,
                            placeHolder: 'Input Wallet Address',
                            emptyErrorMessage: 'Please input firmachain wallet address.',
                            regex: WALLET_ADDRESS_REGEX
                        }}
                    />
                </div>

                {/* Expiration Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InputTitle>Expiration</InputTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        {Object.values(ExpirationType).map((type) => (
                            <ExpirationTypButton
                                key={`EXPIRATION_TYPE_${type}`}
                                $selected={approveType === type}
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
                        value={approveValue}
                        placeHolder={
                            approveType === ExpirationType.Height
                                ? 'ex) 7216240'
                                : approveType === ExpirationType.Time
                                  ? 'ex) MM-DD-YYYY  HH:MM:SS'
                                  : 'FOREVER'
                        }
                        type={approveType === ExpirationType.Time ? 'date' : 'number'}
                        onChange={handleChangeExpireValue}
                        readOnly={approveType === ExpirationType.Forever}
                        decimal={0}
                        onClickDate={handleAllowanceDate}
                        maxValue="999999999999999"
                    />
                </div>
            </div>
        </Container>
    );
};

export default ApproveAll;
