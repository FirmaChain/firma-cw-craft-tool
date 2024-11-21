import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useKeyPress } from 'react-use';
import { ModalOverlay } from '@/components/modal/style';
import WalletConnectModal from '@/components/organisms/modal/walletConnectModal';
import useModalStore from '@/store/modalStore';

export const ModalRenderer = () => {
    const { modals } = useModalStore();

    return (
        <AnimatePresence>
            {modals.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)' /* Black with 30% opacity */,
                        zIndex: 999,
                        backdropFilter: 'blur(2px)' /* Equivalent to Tailwind's `backdrop-blur-xs` */
                    }}
                >
                    <Modal id={item.id} content={item} />
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

interface ModalProps {
    id: string;
    content: ModalContent;
}

export interface ModalContent {
    _component?: React.ComponentType<{ id: string } & Record<string, any>>;
    allowBackdropClick?: boolean;
    handleBackdropClick?: () => void;
    closeOnRouteChange?: boolean;
    closeOnWalletChange?: boolean;
    closeFirstOnPop?: boolean;
    allowEsc?: boolean;
    close?: boolean;
    props?: Record<string, any> & {
        title?: React.ReactNode;
        content?: React.ReactNode;
        hideCloseButton?: boolean;
        onClose?: (id?: string) => void;
        onConfirm?: (id?: string) => void;
    };
    modalType?: 'connectWallet' | 'loginWallet' | 'qrConfirm' | 'txConfirm' | 'custom'; // You can define more types if needed
}

const Modal: React.FC<ModalProps> = ({
    id,
    content: {
        _component = () => <></>,
        allowBackdropClick = false,
        handleBackdropClick = () => {},
        modalType = 'custom',
        closeOnRouteChange = true,
        closeOnWalletChange = true,
        closeFirstOnPop = false,
        allowEsc,
        props
    }
}) => {
    const { closeModal, modals } = useModalStore();
    const location = useLocation();

    const handleClickBackdrop = () => {
        handleBackdropClick();
        if (allowBackdropClick) {
            closeModal(id);
        }
    };

    useEffect(() => {
        return () => {
            if (closeOnRouteChange) {
                closeModal(id);
            }
        };
    }, [location.pathname, location.search, location.hash]);

    useKeyPress((k) => {
        if (k.key === 'Escape') {
            if (allowEsc) {
                if (modals.findIndex((modal) => modal.id === id) === modals.length - 1) {
                    closeModal(id);
                }
            }
        }
        return true;
    });

    return (
        <div style={{ position: 'fixed', width: '100vw', height: '100vh', left: 0, top: 0 }}>
            <ModalOverlay />
            <div
                onClick={handleClickBackdrop}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
            >
                {modalType === 'custom' ? (
                    <_component id={id} {...props} />
                ) : modalType === 'connectWallet' ? (
                    <WalletConnectModal id={id} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
