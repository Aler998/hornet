import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApi";
import Loader from "./Loader/Loader";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading, isError } = useGetMeQuery();
  const location = useLocation();
  const redirectTo = `/admin/login`;

  if (isLoading) {
    return <Loader isLoading={isLoading}/>;
  }

  if (isError || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
