import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const routeByAuth = (path: string, element: React.ReactElement, auth: boolean) => ({
  path,
  element,
  auth,
});

const routes: any[] = [
  routeByAuth('/instantiate', <></>, false),
  routeByAuth('/execute', <></>, false),
  routeByAuth('/search', <></>, false),
  routeByAuth('/mytoken', <></>, false),
  routeByAuth('/mytoken/detail', <></>, false),
];

const AppRoutes: React.FC = () => (
  <Routes>
    {routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={route.element}
      />
    ))}
    <Route path="*" element={<Navigate to="/instantiate" />} />
  </Routes>
);

export default AppRoutes;
