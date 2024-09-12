import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    position: relative;
`;

interface IProps {
    children: ReactNode;
}

const Layout = ({ children }: IProps) => {
    return <Container>{children}</Container>;
};

export default Layout;
