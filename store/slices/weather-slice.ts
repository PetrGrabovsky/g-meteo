import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState } from '@/utils/types';

const initialState: WeatherState = {
  city: '',
  dailyRecords: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<WeatherState>) {
      state.city = action.payload.city;
      state.dailyRecords = action.payload.dailyRecords;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
