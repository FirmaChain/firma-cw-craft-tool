import styled, { keyframes } from 'styled-components';

const opacityAnimation1 = keyframes`
  0%, 10% { opacity: 0; } 
  23.33%, 36.66%, 50%, 63.33%, 76.66%, 90% { opacity: 0.9; }
  100% { opacity: 0; }
`;

const opacityAnimation2 = keyframes`
  0%, 23.33% { opacity: 0; }
  36.66%, 50%, 63.33%, 76.66% { opacity: 0.9; }
  90%, 100% { opacity: 0; }
`;

const opacityAnimation3 = keyframes`
  0%, 36.66% { opacity: 0; }
  50%, 63.33% { opacity: 0.9; }
  76.66%, 100% { opacity: 0; }
`;

const LoadingWrap = styled.div<{ $size: string }>`
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    position: relative;

    img {
        opacity: 0;
        position: absolute;
        width: ${({ $size }) => $size};
        height: ${({ $size }) => $size};

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    #loading-background {
        opacity: 0.4;
    }

    .img1 {
        animation: ${opacityAnimation1} 2.4s linear infinite;
    }

    .img2 {
        animation: ${opacityAnimation2} 2.4s linear infinite;
    }

    .img3 {
        animation: ${opacityAnimation3} 2.4s linear infinite;
    }
`;

interface IProps {
    size?: string;
}

const FirmaLoading = ({ size = '100px' }: IProps) => {
    return (
        <LoadingWrap $size={size}>
            <img className="img1" src="/assets/icon/ic_firma_logo_piece_1.png" alt="" />
            <img className="img2" src="/assets/icon/ic_firma_logo_piece_2.png" alt="" />
            <img className="img3" src="/assets/icon/ic_firma_logo_piece_3.png" alt="" />
            <img src="/assets/icon/android-chrome-512x512.png" id="loading-background" alt="" />
        </LoadingWrap>
    );
};

export default FirmaLoading;
