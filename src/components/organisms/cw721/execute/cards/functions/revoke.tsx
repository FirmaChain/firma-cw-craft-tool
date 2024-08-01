import { useEffect } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';

const Revoke = () => {
    const revokeAddress = useCW721ExecuteStore((state) => state.revokeAddress);
    const revokeTokenId = useCW721ExecuteStore((state) => state.revokeTokenId);
    const setRevokeAddress = useCW721ExecuteStore((state) => state.setRevokeAddress);
    const setRevokeTokenId = useCW721ExecuteStore((state) => state.setRevokeTokenId);
    const clearRevokeForm = useCW721ExecuteStore((state) => state.clearRevokeForm);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'REVOKE';

    useEffect(() => {
        clearRevokeForm();
    }, []);

    useEffect(() => {
        return () => {
            clearFormError({ id: `${inputId}_TOKEN_ID` });
            clearFormError({ id: `${inputId}_ADDRESS` });
        };
    }, []);

    const handleChangeAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });
        }

        setRevokeAddress(value);
    };

    const handleChangeNFTId = (value: string) => {
        setRevokeTokenId(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Revoke</HeaderTitleTypo>
                    <HeaderDescTypo>Remove the previously given permission for a specific NFT</HeaderDescTypo>
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
                                    value: revokeAddress,
                                    onChange: handleChangeAddress,
                                    placeHolder: 'Input Wallet Address',
                                    emptyErrorMessage: 'Please input firmachain wallet address.'
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
                            <LabelInput
                                labelProps={{ label: 'Token ID' }}
                                inputProps={{
                                    formId: `${inputId}_TOKEN_ID`,
                                    value: revokeTokenId,
                                    onChange: handleChangeNFTId,
                                    placeHolder: '0',
                                    textAlign: 'right',
                                    regex: /[^0-9]/g,
                                    emptyErrorMessage: 'Please input token ID'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Revoke;
