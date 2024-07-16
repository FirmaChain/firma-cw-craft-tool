import styled from 'styled-components';

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
    color: var(--Green-300, #63f6a5);
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 100% */
`;

export const HeaderDescTypo = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

export const SummeryCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 24px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;
