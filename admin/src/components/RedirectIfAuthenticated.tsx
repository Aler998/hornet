import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../features/auth/authApi';
import { JSX } from 'react';
import Loader from './Loader';

export const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading } = useGetMeQuery();
  const redirectTo = `/${import.meta.env.VITE_SUBFOLDER}`

  if (isLoading) {
    return <Loader />
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
