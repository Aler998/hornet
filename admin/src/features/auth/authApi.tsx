import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import LoginRequest from "./types";
import axios from "axios";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include", // Necessario per usare i cookie
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          axios.get(`${import.meta.env.VITE_API_URL}/csrf-token`, {
            withCredentials: true,
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getMe: builder.query<string, void>({
      query: () => "auth/me",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
