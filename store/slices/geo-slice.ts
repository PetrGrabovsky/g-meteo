import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from '@/utils/types';
import { fetchCoordinates } from '../thunks/fetch-coordinates';

interface GeoState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}

const PRAGUE_COORDINATES: Coordinates = {
  latitude: 50.083328,
  longitude: 14.46667,
};

// Praha se ukáže hned, poloha uživatele ji nahradí, až (a pokud) ji povolí
const initialState: GeoState = {
  coordinates: PRAGUE_COORDINATES,
  loading: true,
  error: null,
};

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setCoordinates(state, action: PayloadAction<Coordinates>) {
      state.coordinates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoordinates.fulfilled, (state, action: PayloadAction<Coordinates>) => {
        state.loading = false;
        state.coordinates = action.payload;
      })
      .addCase(fetchCoordinates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCoordinates } = geoSlice.actions;
export default geoSlice.reducer;
