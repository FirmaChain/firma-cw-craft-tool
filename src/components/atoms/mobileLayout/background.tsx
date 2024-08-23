import styled from 'styled-components';
import { IMG_BACKGROUND } from '@/components/atoms/icons/pngIcons';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
`;

const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Background = () => {
    return (
        <Container>
            <BackgroundImg src={IMG_BACKGROUND} alt={'Firma Craft'} />
        </Container>
    );
};

export default Background;
