import styled, { keyframes } from 'styled-components';

const opacityAnimation = keyframes`
  0%, 12%, 62.5%, 100% { opacity: 0.9; }
  25%, 50% { opacity: 0; }
`;

const LoadingWrap = styled.div`
    width: 100px;
    heigh: 100px;
    position: relative;

    img {
        opacity: 0.9;
        position: absolute;
        width: 100px;
        height: 100px;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    #loading-background {
        opacity: 0.4;
    }
`;

const AnimatedImg = styled.img<{ $delay: number }>`
    animation: ${opacityAnimation} 2.8s infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;

const FirmaLoading = () => {
    return (
        <LoadingWrap>
            <AnimatedImg $delay={0} src="/assets/icon/ic_firma_logo_piece_1.png" alt="" />
            <AnimatedImg $delay={0.4} src="/assets/icon/ic_firma_logo_piece_2.png" alt="" />
            <AnimatedImg $delay={0.8} src="/assets/icon/ic_firma_logo_piece_3.png" alt="" />
            <img src="/assets/icon/android-chrome-512x512.png" id="loading-background" alt="" />
        </LoadingWrap>
    );
};

export default FirmaLoading;
