import { createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '@/utils/weather-api-types';
import { RootState } from '../store';

const CITY_URL = '/city.list.json';

export const fetchAllCities = createAsyncThunk('city/fetchAllCities', async (_, { getState, rejectWithValue }) => {
  const state = getState() as RootState;

  if (state.city.allCities.length > 0) return state.city.allCities;

  try {
    const response = await fetch(CITY_URL);

    if (!response.ok) throw new Error('Nepodařilo se načíst města');

    const data: City[] = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
