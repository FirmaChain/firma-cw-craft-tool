import { useSnackbar } from 'notistack';

import { useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { storeWalletFromMnemonic, storeWalletFromPrivateKey } from '@/utils/wallet';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
import { useAuthContext } from '@/context/authContext';
import { sleep } from '@/utils/common';

const ModalContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 34px 24px;
`;

const ModalTitle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding-top: 20px;
    padding-bottom: 40px;
`;

const ModalTitleTypo = styled.div`
    color: var(--Primary-Base-White, #fff);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const RecoverTypeWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const RecoverTypeList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3d3b48;
    border-radius: 20px;
    padding: 3px;
`;

const RecoverTypeItem = styled.div<{ isActive: boolean }>`
    font-size: 1.6rem;
    padding: 7px 20px;
    border-radius: 20px;
    cursor: pointer;
    ${(props) => (props.isActive ? 'color: #222; background-color: #02E191; font-weight: 600' : 'color: #222')}
`;

const ModalInputWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ModalLabel = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #dcdcdc;
    white-space: pre;
`;

const MnemonicTextArea = styled.textarea<{ ref: any }>`
    width: 100%;
    height: 100px;
    padding: 10px 16px;
    resize: none;
    background-color: var(--Gray-400, #2c2c2c);
    border: 1px solid #383838;
    border-radius: 6px;
    outline: none;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    color: #ffffff;

    &::placeholder {
        color: var(--Gray-600, #707070);
        /* Body/Body2 - Md */
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }

    &:hover {
        border: 1px solid var(--Gray-550, #444);
    }

    &:focus {
        border: 1px solid #ffffff;
    }
`;

const PrivatekeyTextArea = styled.textarea<{ ref: any }>`
    width: 100%;
    height: 100px;
    padding: 10px 16px;
    resize: none;
    background-color: var(--Gray-400, #2c2c2c);
    border: 1px solid #383838;
    border-radius: 6px;
    outline: none;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    color: #ffffff;

    &::placeholder {
        color: var(--Gray-600, #707070);
        /* Body/Body2 - Md */
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }

    &:hover {
        border: 1px solid var(--Gray-550, #444);
    }

    &:focus {
        border: 1px solid #ffffff;
    }
`;

const InputBoxStyleDefault = styled.input`
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 10px;
    font-size: 1.6rem;
    border: 1px solid #ffffff00;
    background-color: #3d3b48;
    color: white;
    outline: none;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const InputBoxDefault = styled(InputBoxStyleDefault)<{ isInvalid?: boolean }>`
    border: 1px solid ${(props) => (props.isInvalid ? `${props.theme.colors.mainred}50` : '#ffffff00')};
`;

const ModalInput = styled.div`
    position: relative;
    font-size: 16px;
    color: #ccc;
    &:last-child {
        margin-bottom: 0;
    }
`;

const InputMessageText = styled.div<{ isActive: boolean }>`
    width: 100%;
    height: 10px;
    line-height: 10px;
    margin-top: 10px;
    padding: 0 5px;
    ${(props) => (props.isActive ? 'display:block;' : 'display:none;')}
`;

const ModalConfirmButtonWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`;

const InputWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface IProps {
    closeModal: () => void;
}

const Connect = ({ closeModal }: IProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { firmaSDK } = useFirmaSDKContext();
    const { refreshToken } = useAuthContext();
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const [recoverType, setRecoverType] = useState<number>(0);
    const [inputKetword, setInputKeyword] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const inputRefMnemonic = useRef<HTMLTextAreaElement>(null);
    const inputRefPrivateKey = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setInputKeyword('');
        setPassword('');
        setConfirmPassword('');
    }, [recoverType]);

    useEffect(() => {
        if (password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword) {
            setFormError({
                id: 'CONNECT_WALLET_PASSWORD_CONFIRM',
                type: 'PASSWORD_NOT_MATCH',
                message: 'Password is not match.'
            });
        } else clearFormError({ id: 'CONNECT_WALLET_PASSWORD_CONFIRM', type: 'PASSWORD_NOT_MATCH' });
    }, [password, confirmPassword]);

    const checkWords = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }

        e.target.value = e.target.value.replace(recoverType === 0 ? /[^A-Za-z\s]/gi : /[^A-Za-z0-9]/gi, '');

        const checkValue = e.target.value.replace(/ +/g, ' ').replace(/^\s+|\s+$/g, '');
        setInputKeyword(checkValue);
    };

    const isEnableButton = useMemo(() => {
        if (password.length < 8 || confirmPassword.length < 8 || password !== confirmPassword) return false;

        if (recoverType === 0) {
            if (inputKetword.split(' ').length !== 24) return false;
        } else {
            if (inputKetword.length !== 66) return false;
        }

        return true;
    }, [confirmPassword, inputKetword, password, recoverType]);

    const onChangePassword = (value: string) => {
        if (value.length < 8)
            setFormError({ id: 'CONNECT_WALLET_PASSWORD', type: 'INVALID_PASSWORD', message: 'Password must be at least 8 characters.' });
        else clearFormError({ id: 'CONNECT_WALLET_PASSWORD', type: 'INVALID_PASSWORD' });

        setPassword(value);
    };

    const onChangeConfirmPassword = (value: string) => {
        if (value.length < 8)
            setFormError({
                id: 'CONNECT_WALLET_PASSWORD_CONFIRM',
                type: 'INVALID_PASSWORD',
                message: 'Password must be at least 8 characters.'
            });
        else clearFormError({ id: 'CONNECT_WALLET_PASSWORD_CONFIRM', type: 'INVALID_PASSWORD' });

        setConfirmPassword(value);
    };

    const confirmWallet = async () => {
        if (isEnableButton) {
            storeWallet()
                .then(async () => {
                    await refreshToken();

                    enqueueSnackbar('Success Recovered Your Wallet', {
                        variant: 'success',
                        autoHideDuration: 2000
                    });
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                    enqueueSnackbar(`${recoverType === 0 ? 'Mnemonic' : 'Private key'} is invalid.`, {
                        variant: 'error',
                        autoHideDuration: 2000
                    });
                });
        } else {
            enqueueSnackbar('Invalid input fields', {
                variant: 'error',
                autoHideDuration: 2000
            });
        }
    };

    const storeWallet = async () => {
        if (recoverType === 1) {
            return storeWalletFromPrivateKey(firmaSDK, password, inputKetword);
        } else {
            return storeWalletFromMnemonic(firmaSDK, password, inputKetword);
        }
    };

    const handleEnterDown = (evt) => {
        if (isEnableButton && evt.key?.toLowerCase() === 'enter') confirmWallet();
    };

    return (
        <ModalContent>
            <ModalTitle>
                <ModalTitleTypo>{'Login Wallet'}</ModalTitleTypo>
            </ModalTitle>
            <InputWrap>
                <RecoverTypeWrap>
                    <RecoverTypeList>
                        <RecoverTypeItem isActive={recoverType === 0} onClick={() => setRecoverType(0)}>
                            {'Mnemonic'}
                        </RecoverTypeItem>
                        <RecoverTypeItem isActive={recoverType === 1} onClick={() => setRecoverType(1)}>
                            {'Private Key'}
                        </RecoverTypeItem>
                    </RecoverTypeList>
                </RecoverTypeWrap>

                <ModalInputWrap>
                    <ModalLabel>{recoverType === 0 ? 'Mnemonic' : 'Private Key'}</ModalLabel>
                    {recoverType === 0 ? (
                        <MnemonicTextArea onChange={checkWords} ref={inputRefMnemonic} placeholder="Enter Mnemonic" />
                    ) : (
                        <PrivatekeyTextArea onChange={checkWords} ref={inputRefPrivateKey} placeholder="Enter Private Key" />
                    )}
                </ModalInputWrap>
                <LabelInput
                    labelProps={{ label: 'Password' }}
                    inputProps={{
                        value: password,
                        type: 'password',
                        placeHolder: 'Enter Password',
                        formId: 'CONNECT_WALLET_PASSWORD',
                        onChange: onChangePassword
                    }}
                />

                <LabelInput
                    labelProps={{ label: 'Confirm Password' }}
                    inputProps={{
                        value: confirmPassword,
                        type: 'password',
                        placeHolder: 'Enter Password',
                        formId: 'CONNECT_WALLET_PASSWORD_CONFIRM',
                        onChange: onChangeConfirmPassword,
                        onKeyDown: handleEnterDown
                    }}
                />
            </InputWrap>
            <ModalConfirmButtonWrap>
                <GreenButton style={{ fontSize: '16px', fontWeight: 600 }} disabled={!isEnableButton} onClick={confirmWallet}>
                    Login
                </GreenButton>
            </ModalConfirmButtonWrap>
        </ModalContent>
    );
};

export default Connect;
