import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Cw20Mytoken from '../pages/cw20/myToken';
import LandingPage from '@/pages/landing';
import { CW20Execute, CW20Instantiate, CW20SearchPage, CW20TokenDetail } from '@/pages/cw20';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
    path,
    element,
    auth
});

const routes: any[] = [
    routeByAuth('/', <LandingPage />, false),
    
    routeByAuth('/instantiate', <CW20Instantiate />, false),
    routeByAuth('/execute', <CW20Execute />, false),
    routeByAuth('/execute/:contractAddress', <CW20Execute />, false),
    routeByAuth('/search', <CW20SearchPage />, false),
    routeByAuth('/mytoken', <Cw20Mytoken />, false),
    routeByAuth('/mytoken/detail/:contractAddress', <CW20TokenDetail />, false),

    routeByAuth('/cw721/instantiate', <></>, false),
    routeByAuth('/cw721/execute', <></>, false),
    routeByAuth('/cw721/execute/:contractAddress', <></>, false),
    routeByAuth('/cw721/search', <></>, false),
    routeByAuth('/cw721/mynft', <></>, false),
    routeByAuth('/cw721/mynft/detail/:contractAddress', <></>, false)
];

const AppRoutes = () => {
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
