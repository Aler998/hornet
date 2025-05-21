import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { tripsApi } from "./features/trips/tripsApi";
import { categoriesApi } from "./features/categories/categoriesApi";
import { todosApi } from "./features/todos/todosApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tripsApi.middleware)
      .concat(todosApi.middleware)
      .concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
