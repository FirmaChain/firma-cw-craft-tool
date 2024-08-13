import styled from 'styled-components';
import ColorButton from '@/components/atoms/buttons/colorButton';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';

const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 80px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

const ConnectWallet = () => {
    const modal = useModalStore();

    const onClickConnectWallet = () => {
        // ModalActions.handleConnectWallet(true);
        modal.openModal({ modalType: 'connectWallet' });
    };

    return (
        <Container>
            <ColorButton
                width={'168px'}
                height={'40px'}
                color={'#02E191'}
                text={'Connect Wallet'}
                sx={{ color: '#121212', fontStyle: 'normal', fontSize: '14px', fontWeight: 600 }}
                onClick={onClickConnectWallet}
            />
        </Container>
    );
};

export default ConnectWallet;
