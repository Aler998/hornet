import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include", // Necessario per usare i cookie
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "auth/me",
      transformResponse: (response: User[]) => response[0],
    }),
  }),
});

export const { useGetMeQuery } = authApi;
