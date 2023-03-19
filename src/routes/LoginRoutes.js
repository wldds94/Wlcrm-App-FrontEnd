import { lazy } from 'react';

// project import
import Loadable from 'components/loadable/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const Login = Loadable(lazy(() => import('pages/authentication/Login')));
const ResetPassword = Loadable(lazy(() => import('pages/authentication/ResetPassword')));
const LogOut = Loadable(lazy(() => import('pages/authentication/LogOut')));

const NotFound = Loadable(lazy(() => import('pages/not-found')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'reset-password',
            element: <ResetPassword />
        },
        {
            path: 'logout',
            element: <LogOut />
        },
        // {/* 👇️ only match this when no other routes match */}
        {
            path: 'not-found',
            element: <NotFound />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default LoginRoutes;
