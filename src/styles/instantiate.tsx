import styled from 'styled-components';

export const Container = styled.div`
    min-width: 100%;
    min-height: 100vh;

    width: fit-content;
    box-sizing: border-box;

    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 22px;

    z-index: 1;
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
`;
