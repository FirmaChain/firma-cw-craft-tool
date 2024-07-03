import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Cw20Instantiate, Cw20MyToken, Cw20TokenDetail } from '../pages';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
  path,
  element,
  auth,
});

const routes: any[] = [
  routeByAuth('/instantiate', <Cw20Instantiate />, false),
  routeByAuth('/execute', <></>, false),
  routeByAuth('/search', <></>, false),
  routeByAuth('/mytoken', <Cw20MyToken />, false),
  routeByAuth('/mytoken/detail/:contractAddress', <Cw20TokenDetail />, false),
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        )
      })}
      <Route path="*" element={<Navigate to="/instantiate" />} />
    </Routes>
  )
};

export default AppRoutes;
