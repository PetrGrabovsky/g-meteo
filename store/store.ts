import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geo-slice';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
