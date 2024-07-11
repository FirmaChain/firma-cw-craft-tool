import styled from "styled-components";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const HeaderWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const HeaderTitleTypo = styled.div`
    color: var(--Green-300, #63F6A5);
    font-family: "General Sans Variable";
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 100% */
`;

export const HeaderDescTypo = styled.div`
    color: var(--Gray-650, #807E7E);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

export const SummeryCard = styled.div`
    display: flex;
    padding: 16px 24px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;border-radius: 12px;
    background: var(--Gray-150, #141414);
`;