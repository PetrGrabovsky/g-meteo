import { createSlice } from '@reduxjs/toolkit';
import { WeatherState } from '@/utils/types';
import { fetchWeatherData } from '../thunks/fetch-weather-data';

const initialState: WeatherState = {
  city: '',
  dailyRecords: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.dailyRecords = action.payload.dailyRecords;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
