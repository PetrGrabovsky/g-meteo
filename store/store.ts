import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geo-slice';
import weatherReducer from './slices/weather-slice';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
