import { styled } from 'styled-components';

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 68px 96px 36px;
    gap: 44px;
    border-bottom: 1px solid #222;
`;

export const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;
