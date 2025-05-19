/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Swal from "sweetalert2";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? (parts.pop()!.split(";").shift() ?? null) : null;
}

export const ApiErrorHandler = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const arg = api?.arg as FetchArgs;
    const method = arg?.method?.toUpperCase() ?? "GET";

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const token = getCookie("Host-me-x-csrf-token");

      if (token) {
        headers.set("X-CSRF-Token", token);
      }
    }

    return headers;
  },
});

export const baseQueryWithErrorHandler: typeof ApiErrorHandler = async (
  args,
  api,
  extraOptions
) => {
  const result = await ApiErrorHandler(args, api, extraOptions);

  if (result.error?.status === 422) {
    const errors = (result.error.data as any)?.message;
    const messages = errors.map((error: any) => `${error.msg}`);

    Swal.fire({
      icon: "error",
      title: "Errore di validazione",
      html: Object.values(messages).join("<br>"),
    });
  }

  return result;
};
