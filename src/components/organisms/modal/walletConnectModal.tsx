import React from 'react';
import { useSnackbar } from 'notistack';

import { FirmaUtil } from '@firmachain/firma-js';

import { WalletActions } from '@/redux/actions';
import { ModalBase, SignDesc, SignTitle, StepDesc, StepIcon } from './style';
import RequestQR from '../requestQR/index2';
import { IC_CLOSE, IC_FIRMA_LOGO, IC_ROUND_ARROW_UP, IC_SCAN } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';

const WalletConnectModal = ({ id }: { id: string }) => {
    const { enqueueSnackbar } = useSnackbar();
    const closeModal = useModalStore((state) => state.closeModal);

    const onCloseModal = () => {
        closeModal(id);
    };

    return (
        <ModalBase style={{ width: '544px', padding: '48px 0 0' }}>
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 12, top: 12, cursor: 'pointer' }}
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '40px'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        paddingBottom: '40px'
                    }}
                >
                    <SignTitle>Connect to Mobile</SignTitle>
                    <SignDesc>Securely connect your wallet with the firmastation app.</SignDesc>
                </div>

                <RequestQR
                    module="/login"
                    onSuccess={(requestData: any) => {
                        if (FirmaUtil.isValidAddress(requestData.signer)) {
                            WalletActions.handleInit(true);
                            WalletActions.handleAddress(requestData.signer);
                            onCloseModal();
                        } else {
                            enqueueSnackbar('Successfully connected to wallet.', {
                                variant: 'success',
                                autoHideDuration: 2000
                            });
                        }
                    }}
                    onFailed={() => {
                        onCloseModal();
                        enqueueSnackbar('failed connect to wallet.', {
                            variant: 'error',
                            autoHideDuration: 2000
                        });
                    }}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '104px',
                    padding: '32px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '20px',
                    background: 'var(--Gray-200, #1A1A1A)'
                }}
            >
                <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={IC_ROUND_ARROW_UP} alt="arrow" style={{ width: '16px', aspectRatio: '1/1', transform: 'rotate(90deg)' }} />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '40px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            width: '100px'
                        }}
                    >
                        <StepIcon>
                            <img src={IC_FIRMA_LOGO} alt="firma-logo" />
                        </StepIcon>
                        <StepDesc>{`1. Open station\napp`}</StepDesc>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            width: '100px'
                        }}
                    >
                        <StepIcon>
                            <img src={IC_SCAN} alt="firma-logo" />
                        </StepIcon>
                        <StepDesc>{`2. Log in after\nscanning the QR`}</StepDesc>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

export default React.memo(WalletConnectModal);
