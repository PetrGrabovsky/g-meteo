import { City } from '@/utils/weather-api-types';
import { createSlice } from '@reduxjs/toolkit';

interface CityState {
  allCities: City[];
  citySuggestions: City[];
  activeCity: City | null;
  searchInput: string;
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  allCities: [],
  citySuggestions: [],
  activeCity: null,
  searchInput: '',
  loading: false,
  error: null,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
});

export default citySlice.reducer;
