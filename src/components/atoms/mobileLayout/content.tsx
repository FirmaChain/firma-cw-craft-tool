import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    z-index: 1;
    padding: 50px 0 0;
    overflow-y: auto;
`

interface IProps {
    children: ReactNode;
}

const Content = ({ children }: IProps) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Content;