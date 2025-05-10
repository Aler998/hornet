import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApi";
import Loader from "./Loader";


export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading, isError } = useGetMeQuery();
  const location = useLocation();
  const redirectTo = `/${import.meta.env.VITE_SUBFOLDER}/login`

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
