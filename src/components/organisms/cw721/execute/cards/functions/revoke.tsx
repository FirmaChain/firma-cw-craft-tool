import { useEffect } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { isValidAddress } from '@/utils/address';

const Revoke = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const revokeAddress = useCW721ExecuteStore((state) => state.revokeAddress);
    const revokeTokenId = useCW721ExecuteStore((state) => state.revokeTokenId);

    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const nftApprovalInfo = useCW721ExecuteStore((state) => state.nftApprovalInfo);

    const setRevokeAddress = useCW721ExecuteStore((state) => state.setRevokeAddress);
    const setRevokeTokenId = useCW721ExecuteStore((state) => state.setRevokeTokenId);
    const clearRevokeForm = useCW721ExecuteStore((state) => state.clearRevokeForm);

    const { setMyNftList, setNftApprovalInfo } = useCW721ExecuteAction();

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const inputId = 'REVOKE';

    useEffect(() => {
        return () => {
            clearRevokeForm();

            clearFormError({ id: `${inputId}_TOKEN_ID` });
            clearFormError({ id: `${inputId}_ADDRESS` });
        };
    }, []);

    useEffect(() => {
        setMyNftList(contractAddress, address);
    }, [contractAddress, address]);

    useEffect(() => {
        if (revokeAddress !== '' && isValidAddress(revokeAddress) && revokeTokenId !== '') {
            setNftApprovalInfo(contractAddress, revokeAddress, revokeTokenId);
        }
    }, [revokeAddress, revokeTokenId]);

    useEffect(() => {
        clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED' });

        if (revokeTokenId === '') {
            clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED' });
        } else {
            if (myNftList.includes(revokeTokenId)) {
                if (nftApprovalInfo.spender === '' && nftApprovalInfo.expires === null) {
                    setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED', message: 'This ID is not approved' });
                } else {
                    if (nftApprovalInfo.spender === revokeAddress) {
                        clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED' });
                    }
                }
            } else {
                setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED', message: 'NFT ID not owned' });
            }
        }
    }, [nftApprovalInfo, revokeTokenId]);

    const handleChangeAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS' });
        } else {
            setFormError({ id: `${inputId}_ADDRESS`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });
        }

        setRevokeAddress(value);
    };

    const handleChangeNFTId = (value: string) => {
        if (value !== '') {
            const parsedId = parseInt(value).toString();

            if (!myNftList.includes(parsedId))
                setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWN', message: `NFT ID that you don't own.` });
            else clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWN' });
        } else {
            clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWN' });
        }

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
