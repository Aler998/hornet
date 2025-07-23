import { createApi } from "@reduxjs/toolkit/query/react";
import type { Category } from "./types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
      providesTags: ["Categories"],
    }),
    getTrip: builder.query<Category, string>({
      query: (id) => `categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Categories", id }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetTripQuery } = categoriesApi;
