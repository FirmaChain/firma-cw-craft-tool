import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';
import { useEffect, useState } from 'react';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';

import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const RevokeAll = () => {
    const address = useWalletStore((v) => v.address);
    // const address = useSelector((v: rootState) => v.wallet.address);

    const context = useCW721Execute();
    const revokeAddress = context.revokeAddress;
    const setRevokeAddress = context.setRevokeAddress;
    const clearRevokeForm = context.clearRevokeForm;

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'REVOKE_ALL';

    useEffect(() => {
        clearRevokeForm();
    }, []);

    useEffect(() => {
        return () => {
            clearRevokeForm();
            clearFormError({ id: `${inputId}_ADDRESS` });
        };
    }, []);

    const handleChangeAddress = (value: string) => {
        if (isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });
        }

        if (value.toLowerCase() === address.toLowerCase())
            setFormError({ id: `${inputId}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS', message: 'Self address is not allowed.' });
        else clearFormError({ id: `${inputId}_ADDRESS`, type: 'CANNOT_USE_SELF_ADDRESS' });

        setRevokeAddress(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Revoke All</HeaderTitleTypo>
                    <HeaderDescTypo>Remove all permissions previously given to an address</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Address / Amount Input */}
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                        <LabelInput
                            labelProps={{ label: 'Recipient Address' }}
                            inputProps={{
                                formId: `${inputId}_ADDRESS`,
                                value: revokeAddress,
                                onChange: handleChangeAddress,
                                placeHolder: 'Input Wallet Address',
                                emptyErrorMessage: 'Please input firmachain wallet address.',
                                regex: WALLET_ADDRESS_REGEX
                            }}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RevokeAll;
