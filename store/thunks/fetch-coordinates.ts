import { createAsyncThunk } from '@reduxjs/toolkit';
import { Coordinates } from '@/utils/types';

export const fetchCoordinates = createAsyncThunk<Coordinates, void, { rejectValue: string }>(
  'geo/fetchCoordinates',
  async (_, { rejectWithValue }) => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (error) {
        return rejectWithValue('Nelze získat polohu uživatele');
      }
    } else {
      return rejectWithValue('Geolokace není podporována tímto prohlížečem');
    }
  }
);
