import { AppDispatch, RootState } from '../store';
import { setCitySuggestions } from '../slices/city-slice';
import { debounce } from 'lodash';
import { City } from '@/utils/weather-api-types';

// Vrací města na základě vstupu
const filterCitiesByInput = (allCities: City[], searchInput: string): City[] => {
  const trimmedSearchInput = searchInput.trim().toLowerCase();

  if (!trimmedSearchInput) return [];

  return allCities.filter((city) => city.name.toLowerCase().startsWith(trimmedSearchInput)).slice(0, 10);
};

// Debounced funkce pro optimalizaci výkonu
const debouncedFilterCities = debounce((dispatch: AppDispatch, getState: () => RootState) => {
  const {
    city: { allCities, searchInput },
  } = getState();

  const filteredCities = filterCitiesByInput(allCities, searchInput);

  dispatch(setCitySuggestions(filteredCities));
}, 500);

// Thunk pro filtrování měst
export const filterCities = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { allCities } = getState().city;

  if (!allCities.length) return;

  debouncedFilterCities(dispatch, getState);
};
