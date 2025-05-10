import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import { tripsApi } from './features/trips/tripsApi';
import { categoriesApi } from './features/categories/categoriesApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(tripsApi.middleware).concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
