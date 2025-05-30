import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include", // Necessario per usare i cookie
  }),
  endpoints: (builder) => ({
    getMe: builder.query<string, void>({
      query: () => "auth/me",
    }),
  }),
});

export const { useGetMeQuery } = authApi;
