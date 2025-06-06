import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import LoginRequest, { User } from "./types";
import axios from "axios";
import { csrfToken } from "../ApiErrorHandler";

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
          console.error(err);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken(),
        },
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => "auth/me",
      transformResponse: (response: User[]) => response[0],
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
