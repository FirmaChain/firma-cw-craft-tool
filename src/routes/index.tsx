import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Cw20Instantiate from '../pages/cw20Instantiate';
import Cw20Mytoken from '../pages/cw20MyToken';
import Cw20TokenDetail from '../pages/cw20TokenDetail';
import Execute from '../pages/execute';
import { SearchPage } from '@/pages';
import LandingPage from '@/pages/landing';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
    path,
    element,
    auth
});

const routes: any[] = [
    routeByAuth('/', <LandingPage />, false),
    routeByAuth('/instantiate', <Cw20Instantiate />, false),
    routeByAuth('/execute', <Execute />, false),
    routeByAuth('/search', <SearchPage />, false),
    routeByAuth('/mytoken', <Cw20Mytoken />, false),
    routeByAuth('/mytoken/detail/:contractAddress', <Cw20TokenDetail />, false)
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
