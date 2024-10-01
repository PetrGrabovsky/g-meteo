import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './slices/geo-slice';
import weatherReducer from './slices/weather-slice';
import cityReducer from './slices/city-slice';
import uiReducer from './slices/ui-slice';

export const store = configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
    city: cityReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
