/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Swal from 'sweetalert2';

export const ApiErrorHandler = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  credentials: 'include',
});

export const baseQueryWithErrorHandler: typeof ApiErrorHandler = async (
  args,
  api,
  extraOptions
) => {
  const result = await ApiErrorHandler(args, api, extraOptions);
    
  if (result.error?.status === 422) {
    const errors = (result.error.data as any)?.message;    
    const messages = errors.map((error: any) => `${error.msg}`)
    

    Swal.fire({
      icon: 'error',
      title: 'Errore di validazione',
      html: Object.values(messages).join("<br>"),
    });
  }

  return result;
};
