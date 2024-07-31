import styled from 'styled-components';
import Sidebar from './components/organisms/sidebar';
import AppRoutes from './routes';
import { ModalRenderer } from './hooks/useModal';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import GlobalLoader from './components/atoms/globalLoader';

const MainContainer = styled.div`
    display: flex;
`;

const RightContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const MainScrollbar = styled(OverlayScrollbarsComponent)`
    z-index: 1;

    .os-scrollbar {
        --os-size: 16px;
        --os-padding-perpendicular: 5px;
        --os-padding-axis: 5px;
        --os-track-border-radius: 50%;
        --os-handle-bg: var(--Gray-550, #444);
        --os-handle-bg-hover: var(--Gray-550, #444);
        --os-handle-bg-active: var(--Gray-550, #444);
    }
`;

// const LogoBackground = styled.div`
//     position: fixed;
//     width: -webkit-fill-available;
//     height: -webkit-fill-available;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     .logo {
//         width: 480px;
//     }
// `;

const Main = () => {
    return (
        <MainContainer>
            <ModalRenderer />
            <Sidebar />
            <RightContainer>
                <MainScrollbar defer>
                    <AppRoutes />
                </MainScrollbar>
                {/* <LogoBackground>
                    <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                </LogoBackground> */}
                <GlobalLoader />
            </RightContainer>
        </MainContainer>
    );
};

export default Main;
