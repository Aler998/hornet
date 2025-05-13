import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from './theme/layouts/auth';
import { DashboardLayout } from './theme/layouts/dashboard';
import { RedirectIfAuthenticated } from './components/RedirectIfAuthenticated';
import { RequireAuth } from './components/RequireAuth';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('./pages/Dashboard'));
export const CategoriesPage = lazy(() => import('./pages/categories/Index'));
export const CategoriesCreateEditPage = lazy(() => import('./pages/categories/CreateEdit'));
export const TripsPage = lazy(() => import('./pages/trips/Index'));
export const TripsShowPage = lazy(() => import('./pages/trips/Show'));
export const TripsCreateEditPage = lazy(() => import('./pages/trips/CreateEdit'));
// export const UserPage = lazy(() => import('./pages/user'));
export const SignInPage = lazy(() => import('./pages/Login'));
// export const ProductsPage = lazy(() => import('./pages/products'));
export const Page404 = lazy(() => import('./pages/NotFound'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

// eslint-disable-next-line react-refresh/only-export-components
export const routesSection: RouteObject[] = [
  {
    element: (
      <RequireAuth>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </RequireAuth>
    ),
    children: [
      { index: true, path: `${import.meta.env.VITE_SUBFOLDER}`, element: <DashboardPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/categories`, element: <CategoriesPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/categories/create`, element: <CategoriesCreateEditPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/categories/:slug`, element: <CategoriesCreateEditPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/trips`, element: <TripsPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/trips/create`, element: <TripsCreateEditPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/trips/:slug/show`, element: <TripsShowPage /> },
      { path: `${import.meta.env.VITE_SUBFOLDER}/trips/:slug/edit`, element: <TripsCreateEditPage /> },
    ],
  },
  {
    path: `${import.meta.env.VITE_SUBFOLDER}/login`,
    element: (
      <RedirectIfAuthenticated>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
