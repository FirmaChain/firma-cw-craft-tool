import styled from 'styled-components';
import Sidebar from './components/organisms/sidebar';
import AppRoutes from './routes';
import { ModalRenderer } from './hooks/useModal';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const MainContainer = styled.div`
    display: flex;
`;

const RightContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const MainScrollbar = styled(OverlayScrollbarsComponent)`
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

const Main = () => {
    return (
        <MainContainer>
            <ModalRenderer />
            <Sidebar />
            <RightContainer className="hide-scrollbar">
                <MainScrollbar defer>
                    <AppRoutes />
                </MainScrollbar>
            </RightContainer>
        </MainContainer>
    );
};

export default Main;
