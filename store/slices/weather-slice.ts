import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherDayRecord {
  date: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherState {
  city: string;
  dailyRecords: WeatherDayRecord[];
}

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
