import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "./types";
import { baseQueryWithErrorHandler } from "../ApiErrorHandler";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
    getTodo: builder.query<Todo, string>({
      query: (_id) => `todos/${_id}`,
      providesTags: (_result, _error, _id) => [{ type: "Todos", _id }],
    }),
    createTodo: builder.mutation<Todo, CreateTodoDto>({
      query: (trip) => ({
        url: "todos",
        method: "POST",
        body: trip,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, UpdateTodoDto>({
      query: (todo) => ({
        url: `todos/${todo._id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: (_res, _err, _id) => [{ type: "Todos", _id }],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (_id) => ({
        url: `todos/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, _id) => [{ type: "Todos", _id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
