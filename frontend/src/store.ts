import { configureStore } from "@reduxjs/toolkit";
import { tripsApi } from "./features/trips/tripsApi";
import themeReducer from "./features/themeSlice";
import { todosApi } from "./features/todos/todosApi";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tripsApi.middleware).concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
