import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApi";
import { JSX } from "react";
import Loader from "./Loader/Loader";

export const RedirectIfAuthenticated = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { data: user, isLoading } = useGetMeQuery();
  const redirectTo = `/`;

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
