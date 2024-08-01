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

const UpdateOwnershipTransfer = () => {
    const modal = useModalStore();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'UPDATE_OWNERSHIP_TRANSFER';

    const [expirationType, setExpirationType] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    //? Switch to zustand
    const [walletAddress, setWalletAddress] = useState('');

    const handleChangeAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });
        }

        setWalletAddress(value);
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
        }
    };

    useEffect(() => {
        //? reset on success
        setExpirationType(ExpirationType.Height);
        setExpInputValue('');
        // setIsFetched(false);
    }, []);

    useEffect(() => {
        return () => {
            clearFormError({ id: `${inputId}_ADDRESS` });
        };
    }, []);

    const handleChangeExpireValue = (value: string) => {
        setExpInputValue(value);
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
                            value: walletAddress,
                            onChange: handleChangeAddress,
                            placeHolder: 'Input Wallet Address',
                            emptyErrorMessage: 'Please input firmachain wallet address.'
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

export default UpdateOwnershipTransfer;
