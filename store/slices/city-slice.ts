import { City } from '@/utils/weather-api-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllCities } from '../thunks/fetch-all-cities';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action: PayloadAction<City[]>) => {
        state.allCities = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default citySlice.reducer;
