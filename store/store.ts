import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geo-slice';
import weatherReducer from './slices/weather-slice';
import cityReducer from './slices/city-slice';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
    city: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
