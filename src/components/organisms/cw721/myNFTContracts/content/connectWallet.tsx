import { useModalStore } from '@/hooks/useModal';
import ColorButton from '@/components/atoms/buttons/colorButton';
import { ContentBodyWrapper } from './style';

const ConnectWallet = () => {
    const modal = useModalStore();

    const onClickConnectWallet = () => {
        modal.openModal({ modalType: 'connectWallet' });
    };

    return (
        <ContentBodyWrapper>
            <ColorButton
                width={'168px'}
                height={'40px'}
                color={'#02E191'}
                text={'Connect Wallet'}
                sx={{
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '20px',
                    color: '#121212'
                }}
                onClick={onClickConnectWallet}
            />
        </ContentBodyWrapper>
    );
};

export default ConnectWallet;
