import { configureStore } from "@reduxjs/toolkit";
import { tripsApi } from "./features/trips/tripsApi";
import themeReducer from "./features/themeSlice";
import { todosApi } from "./features/todos/todosApi";
import { authApi } from "./features/auth/authApi";
import { categoriesApi } from "./features/categories/categoriesApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    theme: themeReducer,
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
