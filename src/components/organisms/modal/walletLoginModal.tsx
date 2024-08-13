import { useSnackbar } from 'notistack';

import { IC_CLOSE } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';

import { ModalBase } from './style';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import SimpleSwitch from '@/components/atoms/switch/simpleSwitch';
import ModeSwitch from '@/components/atoms/switch/modeSwitch';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { storeWalletFromMnemonic, storeWalletFromPrivateKey } from '@/utils/wallet';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const CloseButton = styled.img`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 24px;
    top: 24px;
    cursor: pointer;
`;

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
`;

const ModalLabel = styled.div`
    position: relative;
    width: 100%;
    margin-top: 24px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 400;
    color: #b4b4b4;
`;

const MnemonicTextArea = styled.textarea<{ ref: any }>`
    width: 100%;
    height: 100px;
    padding: 10px;
    resize: none;
    font-size: 16px;
    background-color: #3d3b48;
    color: white;
    border: 0;
    outline: none;
    &:focus {
        border: 0;
        outline-color: #ffffff30;
        text-shadow: none;
    }
`;

const PrivatekeyTextArea = styled.textarea<{ ref: any }>`
    width: 100%;
    height: 100px;
    padding: 10px;
    resize: none;
    outline: none;
    font-size: 16px;
    background-color: #3d3b48;
    color: white;
    border: 0;
    &:focus {
        border: 0;
        outline-color: #ffffff30;
        text-shadow: none;
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

const WalletLoginModal = ({ id }: { id: string }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { firmaSDK } = useFirmaSDKContext();

    const closeModal = useModalStore((state) => state.closeModal);

    const [recoverType, setRecoverType] = useState<number>(0);
    const [inputKetword, setInputKeyword] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState<boolean>(false);

    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);

    const inputRefMnemonic = useRef<HTMLTextAreaElement>();
    const inputRefPrivateKey = useRef<HTMLTextAreaElement>();

    useEffect(() => {
        setIsEnableButton(false);
        setInputKeyword('');
        setPassword('');
        setConfirmPassword('');
    }, [recoverType]);

    useEffect(() => {
        let validPassword = false;
        let validConfirmPassword = false;

        if (password.length >= 8) {
            validPassword = true;
        }
        if (password === confirmPassword) {
            validConfirmPassword = true;
        }

        setInvalidPassword(!validPassword && password.length > 0);
        setInvalidConfirmPassword(!validConfirmPassword && confirmPassword.length > 0);

        if (validPassword && validConfirmPassword) {
            setIsEnableButton(true);
        } else {
            setIsEnableButton(false);
        }
    }, [password, confirmPassword]);

    const onCloseModal = () => {
        closeModal(id);
    };

    const checkWords = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }

        e.target.value = e.target.value.replace(recoverType === 0 ? /[^A-Za-z\s]/gi : /[^A-Za-z0-9]/gi, '');

        const checkValue = e.target.value.replace(/ +/g, ' ').replace(/^\s+|\s+$/g, '');
        setIsEnableButton(recoverType === 0 ? checkValue.split(' ').length === 24 : checkValue.length === 66);
        setInputKeyword(checkValue);
    };

    const onChangePassword = (event: any) => {
        if (event === null) return;
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event: any) => {
        if (event === null) return;
        setConfirmPassword(event.target.value);
    };

    const confirmWallet = () => {
        if (isEnableButton) {
            storeWallet()
                .then(() => {
                    enqueueSnackbar('Success Recovered Your Wallet', {
                        variant: 'success',
                        autoHideDuration: 2000
                    });
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                    enqueueSnackbar('Invalidate Mnemonic Words', {
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

    return (
        <ModalBase style={{ width: '544px', padding: '0', userSelect: 'none', gap: 0, overflow: 'hidden' }}>
            <CloseButton src={IC_CLOSE} alt="close" onClick={onCloseModal} />
            <ModalContent>
                <ModalTitle>
                    <ModalTitleTypo>{'Login Wallet'}</ModalTitleTypo>
                </ModalTitle>
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
                <ModalInputWrap>
                    <ModalLabel>Password</ModalLabel>
                    <ModalInput>
                        <InputBoxDefault
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                            isInvalid={invalidPassword}
                            placeholder="Enter Password"
                        />
                        <InputMessageText isActive={invalidPassword}>
                            {invalidPassword && `Your password must be at least 8 characters.`}
                        </InputMessageText>
                    </ModalInput>
                </ModalInputWrap>
                <ModalInputWrap>
                    <ModalLabel>Confirm Password</ModalLabel>
                    <ModalInput>
                        <InputBoxDefault
                            type="password"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            isInvalid={invalidConfirmPassword}
                            placeholder="Enter Password"
                        />
                        <InputMessageText isActive={invalidConfirmPassword}>
                            {invalidConfirmPassword && `Your password must be at least 8 characters.`}
                        </InputMessageText>
                    </ModalInput>
                </ModalInputWrap>
                <ModalConfirmButtonWrap>
                    <GreenButton style={{ fontSize: '16px', fontWeight: 600 }} disabled={!isEnableButton} onClick={confirmWallet}>
                        Login
                    </GreenButton>
                </ModalConfirmButtonWrap>
            </ModalContent>
        </ModalBase>
    );
};

export default WalletLoginModal;
