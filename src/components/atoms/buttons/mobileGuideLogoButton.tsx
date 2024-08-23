import styled from 'styled-components';
import { IMG_LOGO } from '@/components/atoms/icons/pngIcons';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 32px;
`;

const LogoImg = styled.img`
    cursor: pointer;
    max-width: 200px;
    width: 100%;
    object-fit: contain;
`;

const LogoButton = () => {
    return (
        <Container>
            <LogoImg src={IMG_LOGO} alt={'Firma Craft'} />
        </Container>
    );
};

export default LogoButton;
