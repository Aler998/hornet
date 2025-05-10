import { createApi } from '@reduxjs/toolkit/query/react';
import type { Trip, CreateTripDto, UpdateTripDto } from './types';
import { baseQueryWithErrorHandler } from '../ApiErrorHandler';


export const tripsApi = createApi({
  reducerPath: 'tripsApi',
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ['Trips'],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      query: () => 'trips',
      providesTags: ['Trips'],
    }),
    getTrip: builder.query<Trip, string>({
      query: (id) => `trips/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Trips', id }],
    }),
    createTrip: builder.mutation<Trip, CreateTripDto>({
      query: (trip) => {

        const formData = new FormData();
        trip.images?.forEach((file) => {
          formData.append('images', file);
        });
        trip.tracks?.forEach((file) => {
          formData.append('tracks', file);
        });

        formData.append("category", trip.category);
        formData.append("slug", trip.slug);
        formData.append("title", trip.title);
        if (trip.start) {
          formData.append("start", trip.start.format());
        }
        if (trip.end) {
          formData.append("end", trip.end.format());
        }
        formData.append("description", trip.description);
        formData.append("rating", trip.rating.toString());
        formData.append("km", trip.km.toString());
        formData.append("liters", trip.liters.toString());

        return ({
          url: 'trips',
          method: 'POST',
          body: formData,
        })
      },
      invalidatesTags: ['Trips'],
    }),
    updateTrip: builder.mutation<Trip, UpdateTripDto>({
      query: ({ slug, ...rest }) => {

        const formData = new FormData();
        rest.images?.forEach((file) => {
          formData.append('images', file);
        });
        rest.tracks?.forEach((file) => {
          formData.append('tracks', file);
        });

        formData.append("category", rest.category);
        formData.append("title", rest.title);
        if (rest.newSlug) {
          formData.append("newSlug", rest.newSlug);
        }
        if (rest.start) {
          formData.append("start", rest.start.format());
        }
        if (rest.end) {
          formData.append("end", rest.end.format());
        }
        formData.append("description", rest.description);
        formData.append("rating", rest.rating.toString());
        formData.append("km", rest.km.toString());
        formData.append("liters", rest.liters.toString());

        return ({
          url: `trips/${slug}`,
          method: 'PUT',
          body: formData,
        })
      },
      invalidatesTags: (_res, _err, { slug }) => [{ type: 'Trips', slug }],
    }),
    deleteTrip: builder.mutation<void, string>({
      query: (slug) => ({
        url: `trips/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, slug) => [{ type: 'Trips', slug }],
    }),
    deleteTripImage: builder.mutation<void, { slug: string, image: string }>({
      query: ({ slug, image }) => ({
        url: `trips/${slug}/images/${image}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, slug, image) => [{ type: 'Trips', slug, image }],
    }),
    deleteTripTrack: builder.mutation<void, { slug: string, track: string }>({
      query: ({ slug, track }) => ({
        url: `trips/${slug}/tracks/${track}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, slug, track) => [{ type: 'Trips', slug, track }],
    }),
    downloadTrack: builder.query<Blob, { slug: string, track: string }>({
      query: ({ slug, track }) => ({
        url: `trips/${slug}/tracks/${track}`,
        responseHandler: async (response) => response.blob(),
      }),
    })
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useDeleteTripImageMutation,
  useDeleteTripTrackMutation,
  useLazyDownloadTrackQuery
} = tripsApi;
