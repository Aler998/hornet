import { createApi } from '@reduxjs/toolkit/query/react';
import type { Trip } from './types';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';


export const tripsApi = createApi({
  reducerPath: 'tripsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: 'include',
  }),
  tagTypes: ['Trips'],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      query: () => 'trips',
      providesTags: ['Trips'],
    }),
    getTrip: builder.query<Trip, string>({
      query: (id) => `trips/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Trips', id }],
    })
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery
} = tripsApi;
