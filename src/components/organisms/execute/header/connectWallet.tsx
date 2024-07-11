import styled from 'styled-components';
import ColorButton from '../../../atoms/buttons/colorButton';
import { ModalActions } from '../../../../redux/actions';

const Container = styled.div`
    width: calc(100% - 160px);
    display: flex;
    padding: 80px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

const ConnectWallet = () => {
    const onClickConnectWallet = () => {
        ModalActions.handleConnectWallet(true);
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
