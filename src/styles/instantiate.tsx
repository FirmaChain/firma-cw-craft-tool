import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;

    width: 100%;
    overflow: hidden;
    box-sizing: border-box;

    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 22px;

    z-index: 1;
`;

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 32px;
    max-width: 1600px;
    position: relative;
`;
