import styled from 'styled-components';

export const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 736px;
    min-width: 736px;

    height: 100%;

    // width: calc(100% - 96px);
    // max-width: calc(736px - 96px);
    padding: 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 72px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;
