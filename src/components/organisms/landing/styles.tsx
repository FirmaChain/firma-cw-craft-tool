import IconButton from '@/components/atoms/buttons/iconButton';
import { IC_TOOLTIP_16_50D1E5, IC_TOOLTIP_16_GRAY, IMG_LANDING_BG, IMG_LANDING_CONTENT_BG } from '@/components/atoms/icons/pngIcons';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { Container } from '@/styles/instantiate';
import styled from 'styled-components';

export const ScreenWarpper = styled(Container)`
    background-image: url(${IMG_LANDING_BG});
    background-size: cover;
    background-position: center center;
    gap: 0;
    min-height: 100vh;
`;

export const ContentScreen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

    padding: 4rem 12rem 6rem;

    @media (max-width: 1200px) {
        padding: 6rem 2rem;
    }

    @media (max-width: 375px) {
        padding-bottom: 9.6rem;
    }
`;

export const ContentBorderBox = styled.div`
    display: flex;
    max-width: 124.8rem;
    width: 100%;
    padding: 0;
    flex-direction: column;
    align-items: center;
    gap: 5.2rem;

    // border-radius: 2.6rem;

    backdrop-filter: blur(0.3rem);

    &::after {
        position: absolute;
        top: -0.1rem;
        bottom: -0.1rem;
        left: -0.1rem;
        right: -0.1rem;
        background: conic-gradient(
            from 0deg,
            #02e19199,
            #02e191 60deg,
            #02e19133 165deg,
            #02e19133 180deg,
            #02e19133 220deg,
            #02e191cc 265deg,
            #02e1911a 310deg,
            #02e19199 360deg
        );
        content: '';
        z-index: -1;
        border-radius: 2.4rem;
    }

    margin-bottom: 3.6rem;
`;

export const ContentInnerBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    padding: 7.2rem 15.8rem 10.8rem;

    align-items: center;
    gap: 5.2rem;

    background: radial-gradient(
            69.19% 79.05% at 81.65% 15.86%,
            rgba(2, 225, 145, 0.16) 0%,
            rgba(18, 18, 18, 0.16) 51.51%,
            rgba(18, 18, 18, 0.8) 100%
        ),
        linear-gradient(237deg, #121212 20.65%, #121212 70.19%);

    border-radius: 2.4rem;

    @media (max-width: 1430px) {
        padding: 6rem 6rem 10.4rem 6rem;
    }

    @media (max-width: 1320px) {
        gap: 0;
        padding: 6rem 2rem 10.4rem;
    }

    @media (max-width: 1200px) {
        max-width: unset;
    }

    @media (max-width: 768px) {
        padding-bottom: 6rem;
        margin-bottom: 0;
    }
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
`;

export const Title = styled.div`
    // color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;

    /* Title/Title1 */
    font-family: 'General Sans Variable';
    font-size: 4.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 6.6rem; /* 140% */

    background: linear-gradient(96deg, rgba(255, 255, 255, 0.4) -19.21%, #fff 72.37%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 1000px) {
        white-space: break-spaces;
    }
`;

export const SubTitle = styled.div`
    color: var(--Gray-700, #807e7e);

    /* Heading/H4 - Rg */
    font-family: 'General Sans Variable';
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 3rem; /* 136.364% */

    text-align: center;

    @media (max-width: 840px) {
        white-space: pre-wrap;
    }
`;

export const CardBox = styled.div`
    display: grid;
    grid-template-areas: 'inst query execute';
    justify-content: center;
    gap: 2.4rem 5.2rem;

    @media (max-width: 1320px) {
        display: none;
    }
`;

export const MobileCardBox = styled.div`
    width: 100%;
    max-width: 64.6rem;

    @media (min-width: 1321px) {
        display: none;
    }
`;

export const CardWarp = styled.div`
    width: 27.6rem;

    display: flex;
    padding: 4rem 4.8rem;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    border-radius: 3rem;
    background: var(--Gray-400, #2c2c2c);
    box-shadow: 0 0.6rem 4rem 0 rgba(0, 0, 0, 0.1);

    transition: transform 0.3s;

    &:hover {
        transform: translate(0, -1.2rem);

        .card-title {
            opacity: 0;
        }

        .gray-tooltip {
            opacity: 0;
        }

        .color-tooltip {
            opacity: 1;
        }
    }
`;

export const CardTitleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    position: relative;
`;

export const CardTitle = styled.div`
    background: var(--Gray-850, #e6e6e6);
    background-clip: text !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;

    opacity: 1;

    /* Heading/H4 - Bd */
    font-family: 'General Sans Variable';
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem; /* 109.091% */

    transition: opacity 0.3s;
    z-index: 1;
`;

export const BgColoredTitle = styled(CardTitle)`
    position: absolute;
    left: 0;
    background: linear-gradient(90deg, #02e191 0%, #50d1e5 116.09%);
    z-index: 0;
`;

export const TooltipIconBox = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    position: relative;

    cursor: help;

    will-change: opacity;

    .gray-tooltip {
        position: absolute;
        transition: opacity 0.3s;
        display: flex;
    }

    .color-tooltip {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;

export const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    gap: 4.8rem;

    position: absolute;
    bottom: -3.6rem;

    @media (max-width: 768px) {
        position: static;
        flex-direction: row;
        gap: 1.2rem;
        margin-top: 4.8rem;
    }

    @media (max-width: 520px) {
        flex-direction: column;

        width: 100%;
        max-width: 29.6rem;
    }
`;

export const ContractBtnBase = styled(IconButton)<{ $isConnected?: boolean; disabled?: boolean }>`
    width: ${({ $isConnected }) => ($isConnected ? '25.4rem' : '20.4rem')};
    min-height: 7.8rem;
    display: flex;
    padding: 1.2rem 4rem 1.6rem 3.2rem;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;

    border-radius: 1.6rem;
    background: var(--Green-500, #02e191);
    box-shadow: 0 0.4rem 3.2rem 0 rgba(0, 0, 0, 0.3);

    .typo-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .variant {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-300, #222)')};
        font-family: Inter;
        font-size: 2.8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 4rem; /* 142.857% */
    }

    .type {
        margin-top: -0.4rem;
        color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-300, #222)')};
        font-family: Inter;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
    }

    ${({ disabled }) =>
        !disabled
            ? `
		&:hover {
        filter: brightness(80%);
    }

    &:active {
        filter: brightness(60%);
    }
	`
            : `
			background: var(--Gray-575, #474747);
			svg {
				stroke: var(--Gray-575, #474747);
				* {
					stroke: var(--Gray-575, #474747);
				}
			}
			`}

    @media (max-width: 520px) {
        width: 100%;
    }
`;

export const GradientTooltipIcon = ({ tooltip }: { tooltip?: string }) => {
    return (
        <TooltipIconBox
            data-tooltip-content={tooltip}
            data-tooltip-id={TOOLTIP_ID.LIGHT}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            <img src={IC_TOOLTIP_16_GRAY} alt="" className="gray-tooltip" style={{ width: '1.6rem', height: '1.6rem' }} />

            <img src={IC_TOOLTIP_16_50D1E5} alt="" className="color-tooltip" style={{ width: '1.6rem', height: '1.6rem' }} />
        </TooltipIconBox>
    );
};

const ConnectionBox = styled.div`
    width: fit-content;
    display: flex;
    padding: 0.4rem 1.6rem;
    justify-content: flex-end;
    align-items: center;
    gap: 0.8rem;

    border-radius: 3.2rem;
    background: var(--Gray-450, #313131);

    user-select: none;

    .dot {
        width: 0.6rem;
        height: 0.6rem;
        background: var(--Green-600, #01c18e);
        border-radius: 100%;
    }

    .typo {
        color: var(--Green-600, #01c18e);
        text-align: right;

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 1.3rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.8rem; /* 138.462% */
    }
`;

export const HeaderBox = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2.6rem 4.6rem 1rem;

    gap: 0.8rem;

    @media (max-width: 1200px) {
        padding: 2.6rem 2rem 1rem;
    }

    @media (max-width: 420px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const WalletConnectionIndicator = () => {
    return (
        <ConnectionBox>
            <div className="dot" />
            <div className="typo">Wallet Connected</div>
        </ConnectionBox>
    );
};
