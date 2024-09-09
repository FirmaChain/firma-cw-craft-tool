import IconButton from '@/components/atoms/buttons/iconButton';
import { IMG_LANDING_BG } from '@/components/atoms/icons/pngIcons';
import { Container } from '@/styles/instantiate';
import styled from 'styled-components';

export const ScreenWarpper = styled(Container)`
    background: linear-gradient(180deg, rgba(33, 33, 33, 0.8) 0%, rgba(33, 33, 33, 0.8) 100%), url(${IMG_LANDING_BG});
    background-size: cover;
    background-position: center center;
`;

export const ContentScreen = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    padding: 60px 120px;

    @media (max-width: 1200px) {
        padding: 60px 20px;
    }
`;

export const ContentBox = styled.div`
    display: flex;
    max-width: 1248px;
    width: 100%;
    padding: 60px 120px 104px 120px;
    flex-direction: column;
    align-items: center;
    gap: 48px;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    background: rgba(18, 18, 18, 0.8);
    backdrop-filter: blur(3px);

    margin-bottom: 90px;

    @media (max-width: 1430px) {
        padding: 60px 60px 104px 60px;
    }

    @media (max-width: 1320px) {
        gap: 0;
        padding: 60px 20px 104px;
    }

    @media (max-width: 1200px) {
        max-width: 960px;
    }

    @media (max-width: 768px) {
        padding-bottom: 60px;
        margin-bottom: 0;
    }
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const Title = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;

    /* Title/Title1 */
    font-family: 'General Sans Variable';
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 56px; /* 140% */
`;

export const SubTitle = styled.div`
    color: var(--Gray-700, #807e7e);

    /* Heading/H4 - Rg */
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 136.364% */

    text-align: center;

    @media (max-width: 840px) {
        white-space: pre-wrap;
    }
`;

export const CardBox = styled.div`
    display: grid;
    // width: 100%;
    // grid-template-columns: repeat(auto-fit, minmax(276px, auto));
    grid-template-areas: 'inst query execute';
    justify-content: center;
    gap: 24px 56px;

    @media (max-width: 1320px) {
        display: none;
        // grid-template-rows: auto;
        // grid-template-columns: 1fr 1fr;
        // grid-template-areas:
        //     'inst query'
        //     'execute execute';
    }

    // @media (max-width: 1100px) {
    //     grid-template-rows: auto;
    //     grid-template-columns: auto;
    //     grid-template-areas:
    //         'inst'
    //         'query'
    //         'execute';
    // }
`;

export const MobileCardBox = styled.div`
    width: 100%;
    max-width: 646px;

    @media (min-width: 1321px) {
        display: none;
    }
`;

export const CardWarp = styled.div`
    width: 276px;

    display: flex;
    padding: 40px 48px;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    border-radius: 30px;
    background: var(--Gray-400, #2c2c2c);
    box-shadow: 0px 6px 40px 0px rgba(0, 0, 0, 0.3);

    transition: transform 0.3s;

    &:hover {
        transform: translate(0, -12px);

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
    gap: 10px;

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
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */

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
    width: 16px;
    height: 16px;
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
    gap: 56px;

    position: absolute;
    bottom: -39px;

    @media (max-width: 768px) {
        position: static;
        flex-direction: row;
        gap: 12px;
        margin-top: 48px;
    }

    @media (max-width: 520px) {
        flex-direction: column;

        width: 100%;
        max-width: 296px;
    }
`;

export const ContractBtnBase = styled(IconButton)<{ disabled?: boolean }>`
    width: 204px;
    display: flex;
    padding: 14px 40px 18px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    border-radius: 16px;
    background: var(--Green-500, #02e191);
    box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.3);

    .typo-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .variant {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-300, #222)')};
        font-family: Inter;
        font-size: 28px;
        font-style: normal;
        font-weight: 600;
        line-height: 40px; /* 142.857% */
    }

    .type {
        margin-top: -4px;
        color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-300, #222)')};
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 14px */
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
