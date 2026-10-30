import { AppDispatch, RootState } from '../store';
import { setCitySuggestions } from '../slices/city-slice';
import { debounce } from 'lodash';
import { City } from '@/utils/weather-api-types';

let abortController: AbortController | null = null;

// Vrací města na základě vstupu (hledá se na serveru)
const fetchCitiesByInput = async (searchInput: string, signal: AbortSignal): Promise<City[]> => {
  const response = await fetch(`/api/cities?q=${encodeURIComponent(searchInput)}`, { signal });

  if (!response.ok) throw new Error('Nepodařilo se načíst města');

  return response.json();
};

// Debounced funkce pro optimalizaci výkonu
const debouncedFilterCities = debounce(async (dispatch: AppDispatch, getState: () => RootState) => {
  const searchInput = getState().city.searchInput.trim();

  // Zruší předchozí požadavek, aby starší odpověď nepřepsala novější
  abortController?.abort();

  if (!searchInput) {
    dispatch(setCitySuggestions([]));
    return;
  }

  abortController = new AbortController();

  try {
    const filteredCities = await fetchCitiesByInput(searchInput, abortController.signal);

    // Mezitím mohl uživatel vstup změnit nebo město vybrat
    if (getState().city.searchInput.trim() === searchInput) dispatch(setCitySuggestions(filteredCities));
  } catch {
    // Zrušený nebo neúspěšný požadavek návrhy nemění
  }
}, 500);

// Thunk pro filtrování měst
export const filterCities = () => (dispatch: AppDispatch, getState: () => RootState) => {
  debouncedFilterCities(dispatch, getState);
};
