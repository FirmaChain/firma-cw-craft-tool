import styled from 'styled-components';

export const HeaderWrap = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;

    padding: 68px 96px 36px;
`;

export const HeaderBox = styled.div`
    width: 100%;
    max-width: 1504px;
    display: flex;
    flex-direction: column;
    gap: 44px;
`;

export const Title = styled.div`
    color: var(--Primary-Base-White, #fff);

    /* Heading/H3 - Bd */
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 100% */
`;
