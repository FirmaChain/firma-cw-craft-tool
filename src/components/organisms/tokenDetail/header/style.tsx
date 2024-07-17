import { styled } from 'styled-components';

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

export const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
`;
