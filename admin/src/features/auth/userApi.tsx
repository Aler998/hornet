import { createApi } from "@reduxjs/toolkit/query/react";
import { UpdateUserDto, User } from "./types";
import { baseQueryWithErrorHandler, csrfToken } from "../ApiErrorHandler";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    updateUser: builder.mutation<User, UpdateUserDto>({
      query: (body) => {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("username", body.username);
        formData.append("email", body.email);
        if (body.profile) formData.append("profile", body.profile);
        if (body.cover) formData.append("cover", body.cover);

        return {
          url: `user/update`,
          method: "PUT",
          body: formData,
          headers: {
            "X-CSRF-Token": csrfToken(),
          },
        };
      },
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
