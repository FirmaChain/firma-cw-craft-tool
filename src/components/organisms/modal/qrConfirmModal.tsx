import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { ModalActions } from '../../../redux/actions';

import Modal from '../../modal/modal';
import RequestQR from '../requestQR';
import { ModalContent, ModalSubTitle, ModalTitle, QRContainer } from './style';
import { rootState } from '../../../redux/reducers';

const QrConfirmModal = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data } = useSelector((state: rootState) => state.modal);
    const { address } = useSelector((state: rootState) => state.wallet);

    const onCloseModal = () => {
        ModalActions.handleData({});
        ModalActions.handleQrConfirm(false);
    };

    return (
        <Modal width={'500px'} visible={true} closable={true} maskClosable={true} onClose={onCloseModal}>
            <ModalTitle>Instantiate</ModalTitle>
            <ModalContent>
                <ModalSubTitle>Securely connect your wallet with the firmastation app.</ModalSubTitle>
                <QRContainer>
                    <RequestQR
                        // module={"/cosmwasm/instantiateContract"}
                        module={data.module}
                        params={data.params}
                        signer={address}
                        onSuccess={(requestData: any) => {
                            onCloseModal();
                            // on tx success modal
                        }}
                        onFailed={() => {
                            onCloseModal();
                            enqueueSnackbar('failed connect to wallet.', {
                                variant: 'error',
                                autoHideDuration: 2000
                            });
                        }}
                    />
                </QRContainer>
            </ModalContent>
        </Modal>
    );
};

export default React.memo(QrConfirmModal);
