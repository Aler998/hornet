import { JSX } from "react";
import { useGetMeQuery } from "../features/auth/authApi";
import Loader from "./Loader/Loader";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading, isError } = useGetMeQuery();
  const redirectTo = `/admin/login`;

  if (isLoading) {
    return <Loader isLoading={isLoading}/>;
  }

  if (isError || !user) {
    return window.location.href = redirectTo
  }

  return children;
};
