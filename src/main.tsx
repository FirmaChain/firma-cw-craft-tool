import styled from 'styled-components';
import Sidebar from './components/organisms/sidebar';
import AppRoutes from './routes';

const MainContainer = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
`;

const RightContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #121212;
`;

const Main = () => {
    return (
        <MainContainer>
            <Sidebar />
            <RightContainer>
                <AppRoutes />
            </RightContainer>
        </MainContainer>
    );
};

export default Main;
