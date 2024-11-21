import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Cw20Mytoken from '../pages/cw20/myToken';
import LandingPage from '@/pages/landing';

import { CW20Execute, CW20Instantiate, CW20SearchPage, CW20TokenDetail } from '@/pages/cw20';
import { CW721Instantiate, CW721Search, CW721Execute, CW721MyNFTContracts, CW721NFTContractDetail } from '@/pages/cw721';
import { checkMobileDevice, scrollToTop } from '@/utils/common';
import MobileLanding from '@/pages/mobileGuide';
import { CW721SearchProvider } from '@/context/cw721SearchContext';
import { CW20SearchProvider } from '@/context/cw20SearchContext';
import { CW721DetailProvider } from '@/context/cw721DetailStore';
import { CW20DetailProvider } from '@/context/cw20DetailStore';
import { CW721InstantiateProvider } from '@/context/cw721InstantiateContext';
import { CW20InstantiateProvider } from '@/context/cw20InstantiateContext';
import { CW721ExecuteProvider } from '@/context/cw721ExecuteContext';
import { CW20ExecuteProvider } from '@/context/cw20ExecuteContext';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
    path,
    element,
    auth
});

const routes: any[] = [
    // Landing
    routeByAuth('/', <LandingPage />, false),
    routeByAuth('/mobile-guide', <MobileLanding />, false),

    // CW20
    routeByAuth(
        '/instantiate',
        <CW20InstantiateProvider>
            <CW20Instantiate />
        </CW20InstantiateProvider>,
        false
    ),
    routeByAuth(
        '/execute',
        <CW20ExecuteProvider>
            <CW20Execute />
        </CW20ExecuteProvider>,
        false
    ),
    routeByAuth(
        '/search',
        <CW20SearchProvider>
            <CW20SearchPage />
        </CW20SearchProvider>,
        false
    ),
    routeByAuth('/mytoken', <Cw20Mytoken />, false),
    routeByAuth(
        '/mytoken/detail/:contractAddress',
        <CW20DetailProvider>
            <CW20TokenDetail />
        </CW20DetailProvider>,
        false
    ),

    // CW721
    routeByAuth(
        '/cw721/instantiate',
        <CW721InstantiateProvider>
            <CW721Instantiate />
        </CW721InstantiateProvider>,
        false
    ),
    routeByAuth(
        '/cw721/execute',
        <CW721ExecuteProvider>
            <CW721Execute />
        </CW721ExecuteProvider>,
        false
    ),
    routeByAuth(
        '/cw721/search',
        <CW721DetailProvider>
            <CW721SearchProvider>
                <CW721Search />
            </CW721SearchProvider>
        </CW721DetailProvider>,
        false
    ),
    routeByAuth('/cw721/mynft', <CW721MyNFTContracts />, false),
    routeByAuth(
        '/cw721/mynft/detail/:contractAddress',
        <CW721DetailProvider>
            <CW721NFTContractDetail />
        </CW721DetailProvider>,
        false
    )
];

const AppRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        scrollToTop();
    }, [location.pathname]);

    useEffect(() => {
        const isMobileDevice = checkMobileDevice();
        if (isMobileDevice) navigate('/mobile-guide');
    }, []);

    return (
        <Routes>
            {routes.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
            })}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
