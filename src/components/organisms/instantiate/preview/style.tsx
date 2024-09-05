import styled from 'styled-components';

export const PreviewWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    max-height: 742px;
    overflow: hidden;
    height: fit-content;
    padding: 48px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
    position: static;
    transition: top 0.2s ease;

    margin-bottom: 0px;

    @media (min-width: 1654px) {
        position: sticky;
        margin-bottom: 72px;
        max-height: calc(100vh - 200px);
    }
`;
