import { createApi } from "@reduxjs/toolkit/query/react";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "./types";
import { baseQueryWithErrorHandler } from "../ApiErrorHandler";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getCategory: builder.query<Category, string>({
      query: (slug) => `categories/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Categories", slug }],
    }),
    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (trip) => ({
        url: "categories",
        method: "POST",
        body: trip,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryDto>({
      query: ({ slug, ...rest }) => ({
        url: `categories/${slug}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: (_res, _err, { slug }) => [{ type: "Categories", slug }],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (slug) => ({
        url: `categories/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, slug) => [{ type: "Categories", slug }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
