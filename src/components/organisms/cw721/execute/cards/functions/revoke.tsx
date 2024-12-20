import { useEffect } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';

import { isValidAddress } from '@/utils/address';
import { INT_NUMBERS, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const Revoke = () => {
    const address = useWalletStore((v) => v.address);
    // const address = useSelector((state: rootState) => state.wallet.address);

    const context = useCW721Execute();
    const contractAddress = context.contractAddress;
    const revokeAddress = context.revokeAddress;
    const revokeTokenId = context.revokeTokenId;

    const myNftList = context.myNftList;
    const nftApprovalInfo = context.nftApprovalInfo;

    const setRevokeAddress = context.setRevokeAddress;
    const setRevokeTokenId = context.setRevokeTokenId;
    const clearRevokeForm = context.clearRevokeForm;

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
        if (contractAddress === null) return;

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
            if (revokeTokenId === '0') {
                setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED', message: `Please enter a value other than 0.` });
            } else {
                if (myNftList.includes(revokeTokenId)) {
                    if (nftApprovalInfo.spender === '' && nftApprovalInfo.expires === null) {
                        setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED', message: 'This token ID is not approved.' });
                    } else {
                        if (nftApprovalInfo.spender === revokeAddress) {
                            clearFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED' });
                        }
                    }
                } else {
                    setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWNED', message: 'This token ID is not owned by the user.' });
                }
            }
        }
    }, [nftApprovalInfo, revokeTokenId]);

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

    const handleChangeNFTId = (value: string) => {
        if (value !== '') {
            const parsedId = BigInt(value).toString();

            if (!myNftList.includes(parsedId))
                setFormError({ id: `${inputId}_TOKEN_ID`, type: 'DOES_NOT_OWN', message: 'This token ID is not owned by the user.' });
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
                                    regex: INT_NUMBERS,
                                    emptyErrorMessage: 'Please input the token ID.',
                                    type: 'number',
                                    decimal: 0
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
