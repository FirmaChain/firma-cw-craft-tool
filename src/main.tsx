import styled from 'styled-components';
import Sidebar from './components/organisms/sidebar';
import AppRoutes from './routes';
import { ModalRenderer } from './hooks/useModal';
import GlobalLoader from './components/atoms/globalLoader';
import { useEffect, useRef, useState } from 'react';
import { useScrollContext } from './context/scrollContext';

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


const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1;
`;

const Main = () => {

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { setScroll } = useScrollContext();

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollTop } = scrollRef.current;
            setScroll({ x: scrollLeft, y: scrollTop });
        }
    };

    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <MainContainer>
            <ModalRenderer />
            <Sidebar />
            <RightContainer>
                <ScrollableContainer ref={scrollRef}>
                    <AppRoutes />
                </ScrollableContainer>
                <GlobalLoader />
            </RightContainer>
        </MainContainer>
    );
};

export default Main;
