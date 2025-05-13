import { configureStore } from "@reduxjs/toolkit";
import { tripsApi } from "./features/trips/tripsApi";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tripsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
