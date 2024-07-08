import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    height: auto;
    padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    background: var(--200, #1e1e1e);
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: "General Sans Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const Preview = () => {
    return (
        <Container>
            <TitleTypo>{"EXECUTION PREVIEW"}</TitleTypo>
        </Container>
    );
};

export default Preview;
