import React from "react";
import { useSnackbar } from "notistack";

import { FirmaUtil } from "@firmachain/firma-js";

import Modal from "../../modal/modal";
import { ModalActions, WalletActions } from "../../../redux/actions";
import { ContactUsLeftTypo, ContactUsRightTypo, ContactUsWrapper, ModalContent, ModalSubTitle, ModalTitle, QRContainer } from "./style";
import RequestQR from "../requestQR";

const ConnectWalletModal = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const onCloseModal = () => {
    ModalActions.handleConnectWallet(false);
  };

  return (
    <Modal width={'500px'} visible={true} closable={true} maskClosable={true} onClose={onCloseModal}>
      <ModalTitle>Connect to Mobile</ModalTitle>
      <ModalContent>
        <ModalSubTitle>Securely connect your wallet with the firmastation app.</ModalSubTitle>
        <QRContainer>
          <RequestQR
            module='/login'
            onSuccess={(requestData: any) => {
              if (FirmaUtil.isValidAddress(requestData.signer)) {
                WalletActions.handleInit(true);
                WalletActions.handleAddress(requestData.signer);
                onCloseModal();
              } else {
                enqueueSnackbar('Successfully connected to wallet.', {
                  variant: 'success',
                  autoHideDuration: 2000,
                });
              }
            }}
            onFailed={() => {
              onCloseModal();
              enqueueSnackbar('failed connect to wallet.', {
                variant: 'error',
                autoHideDuration: 2000,
              });
            }}
          />
        </QRContainer>
        <ContactUsWrapper>
          <ContactUsLeftTypo>Can't connect to wallet?</ContactUsLeftTypo>
          <ContactUsRightTypo
            onClick={() => {
              window.location.href = 'mailto:contact@firmachain.org';
            }}
          >
            Contact us
          </ContactUsRightTypo>
        </ContactUsWrapper>
      </ModalContent>
    </Modal>
  )
};

export default React.memo(ConnectWalletModal);