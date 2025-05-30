import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApi";

export const IsAdmin = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useGetMeQuery();
  const location = useLocation();
  const redirectTo = `/${import.meta.env.VITE_SUBFOLDER}/`;
    
  if (!user?.isAdmin) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
