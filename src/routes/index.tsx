import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Cw20Instantiate from '../pages/cw20Instantiate';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
  path,
  element,
  auth,
});

const routes: any[] = [
  routeByAuth('/instantiate', <Cw20Instantiate />, false),
  routeByAuth('/execute', <></>, false),
  routeByAuth('/search', <></>, false),
  routeByAuth('/mytoken', <></>, false),
  routeByAuth('/mytoken/detail/:contractAddress', <></>, false),
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
