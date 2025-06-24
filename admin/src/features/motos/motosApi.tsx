import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreateMotoDto, Moto, UpdateMotoDto } from "./types";
import { baseQueryWithErrorHandler } from "../ApiErrorHandler";

export const motosApi = createApi({
  reducerPath: "motosApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ["Motos"],
  endpoints: (builder) => ({
    getMotos: builder.query<Moto[], void>({
      query: () => "moto",
      providesTags: ["Motos"],
    }),
    getMoto: builder.query<Moto, string>({
      query: (_id) => `moto/${_id}`,
      providesTags: (_result, _error, _id) => [{ type: "Motos", _id }],
    }),
    createMoto: builder.mutation<Moto, CreateMotoDto>({
      query: (moto) => {
        const formData = new FormData();
        formData.append("name", moto.name);
        formData.append("consumo", moto.consumo);
        if (moto.segment) formData.append("segment", moto.segment);
        if (moto.image) formData.append("image", moto.image);

        return {
          url: "moto",
          method: "POST",
          body: moto,
        };
      },
      invalidatesTags: ["Motos"],
    }),
    updateMoto: builder.mutation<Moto, UpdateMotoDto>({
      query: (moto) => {
        const formData = new FormData();
        formData.append("name", moto.name);
        formData.append("consumo", moto.consumo);
        if (moto.segment) formData.append("segment", moto.segment);
        if (moto.image) formData.append("image", moto.image);        

        return {
          url: `moto/${moto._id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_res, _err, _id) => [{ type: "Motos", _id }],
    }),
    deleteMoto: builder.mutation<void, string>({
      query: (_id) => ({
        url: `moto/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, _id) => [{ type: "Motos", _id }],
    }),
  }),
});

export const {
  useGetMotosQuery,
  useGetMotoQuery,
  useCreateMotoMutation,
  useUpdateMotoMutation,
  useDeleteMotoMutation,
} = motosApi;
