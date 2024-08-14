import styled from 'styled-components';

export const ContentBox = styled.div<{ $isPreview?: boolean }>`
    width: 100%;
    height: ${({ $isPreview }) => ($isPreview ? '100%' : 'fit-content')};
`;

export const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 72px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const ScrollButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
`;
