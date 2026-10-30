import { City } from '@/utils/weather-api-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  citySuggestions: City[];
  searchInput: string;
}

const initialState: CityState = {
  citySuggestions: [],
  searchInput: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCitySuggestions(state, action: PayloadAction<City[]>) {
      state.citySuggestions = action.payload;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
  },
});

export const { setCitySuggestions, setSearchInput } = citySlice.actions;
export default citySlice.reducer;
