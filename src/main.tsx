import styled from 'styled-components';
import Sidebar from './components/organisms/sidebar';
import AppRoutes from './routes';
import { ModalRenderer } from './hooks/useModal';
import GlobalLoader from './components/atoms/globalLoader';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useScrollContext } from './context/scrollContext';
import { useLocation } from 'react-router-dom';

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

const ScrollableContainer = styled.div<{ $gutter?: boolean }>`
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1;
    scrollbar-gutter: ${({ $gutter }) => ($gutter ? 'stable' : 'unset')};

    > div {
        min-width: 800px;
    }
`;

const Main = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { setScroll } = useScrollContext();
    const { pathname } = useLocation();

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

    const needGutter = useMemo(() => {
        //? mytoken, mynft page requires different scroll view
        return !(pathname.includes('mytoken') || pathname.includes('mynft') || pathname === '/');
    }, [pathname]);

    return (
        <MainContainer>
            <ModalRenderer />
            <Sidebar />
            <RightContainer>
                <ScrollableContainer className="main-scrollbar" ref={scrollRef} $gutter={needGutter}>
                    <AppRoutes />
                </ScrollableContainer>
                <GlobalLoader />
            </RightContainer>
        </MainContainer>
    );
};

export default Main;
