import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput from '@/components/atoms/input/variableInput';
import useFormStore from '@/store/formStore';
import ExpirationModal from '@/components/organisms/modal/expirationModal';
import useModalStore from '@/store/modalStore';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';
import ExpirationTypeButton from '@/components/atoms/buttons/expirationTypeButton';

import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const InputTitle = styled.div`
    color: var(--Gray-800, #dcdcdc);

    /* Body/Body2 - Rg */
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

const UpdateOwnershipTransfer = () => {
    const address = useWalletStore((v) => v.address);
    // const address = useSelector((v: rootState) => v.wallet.address);

    const context = useCW721Execute();
    const approveRecipientAddress = context.approveRecipientAddress;
    const approveType = context.approveType;
    const approveValue = context.approveValue;
    const setApproveRecipientAddress = context.setApproveRecipientAddress;
    const setApproveType = context.setApproveType;
    const setApproveValue = context.setApproveValue;
    const clearApproveForm = context.clearApproveForm;

    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'UPDATE_OWNERSHIP_TRANSFER';

    const handleChangeAddress = (value: string) => {
        if (isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
        }

        if (value.toLowerCase() === address.toLowerCase())
            setFormError({ id: `${inputId}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
        else clearFormError({ id: `${inputId}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });

        setApproveRecipientAddress(value);
    };

    useEffect(() => {
        clearApproveForm();

        return () => {
            clearApproveForm();
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
                    <HeaderTitleTypo>Update Ownership Transfer</HeaderTitleTypo>
                    <HeaderDescTypo>Transfer ownership of the NFT contract to another address</HeaderDescTypo>
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
                            <ExpirationTypeButton
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
                            </ExpirationTypeButton>
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
                                  ? 'ex) MMMM-dd-yyyy HH:mm:ss a'
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

export default UpdateOwnershipTransfer;
