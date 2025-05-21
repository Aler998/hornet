import { createApi } from "@reduxjs/toolkit/query/react";
import type { Todo } from "./types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
