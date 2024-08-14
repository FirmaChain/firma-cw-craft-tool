import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(-20%);
  }
 
  100% {
    transform: translateX(110%);
  }
`;

const ShimmerBox = styled.div<{ $bgColor?: string; $highlight?: string; $width: string; $height: string; $radius: string }>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    position: relative;
    overflow: hidden;
    background: ${({ $bgColor }) => $bgColor};
    border-radius: ${({ $radius }) => $radius};

    .shimmer-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        animation: ${loading} 0.8s infinite;
    }

    .shimmer {
        width: 50%;
        height: 100%;
        background: ${({ $highlight }) =>
            `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, ${$highlight} 50%, rgba(255, 255, 255, 0) 100%)`};
        transform: skewX(-20deg);
    }
`;

const Skeleton = ({
    bgColor = 'rgba(68, 68, 68, 0.3)',
    highlightColor = '#444',
    width = '100px',
    height = '24px',
    borderRadius = '8px'
}) => {
    return (
        <ShimmerBox $bgColor={bgColor} $highlight={highlightColor} $width={width} $height={height} $radius={borderRadius}>
            <div className="shimmer-wrapper">
                <div className="shimmer"></div>
            </div>
        </ShimmerBox>
    );
};

export default Skeleton;
