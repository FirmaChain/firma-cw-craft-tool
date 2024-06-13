import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';

import { ModalHeader, ModalInner, ModalOverlay, ModalWrapper } from './style';
import Portal from './portal';
import Icons from '../atoms/icons';

interface IProps {
  width: string;
  visible: boolean;
  closable: boolean;
  onClose: () => void;
  maskClosable?: boolean;
  children?: React.ReactNode;
};

const Modal = ({ width, visible, closable, onClose, maskClosable = true, children }: IProps) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Portal elementId="modal-root">
      <ModalOverlay />
      <ModalWrapper tabIndex={-1} onClick={onMaskClick}>
        <ModalInner tabIndex={0} width={width}>
          {closable && (
            <ModalHeader>
              <IconButton sx={{ padding: 0 }} onClick={closeModal}>
                <Icons.Close width={'24px'} height={'24px'} />
              </IconButton>
              {/* <CloseButton onClick={closeModal} /> */}
            </ModalHeader>
          )}
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
};

export default React.memo(Modal);
