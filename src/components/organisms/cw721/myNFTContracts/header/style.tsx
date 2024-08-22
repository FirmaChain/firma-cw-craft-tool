import { styled } from 'styled-components';

export const HeaderBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 96px;
`;

export const HeaderWrap = styled.div`
    width: 100%;
    max-width: 1600px;
    display: flex;
    flex-direction: row;
`;
export const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;
