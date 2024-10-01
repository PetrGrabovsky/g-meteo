import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAllCities } from '@/store/thunks/fetch-all-cities';
import CityInput from './city-input';
import SuggestionsList from './suggestions-list';

export default function CityAutocomplete() {
  const dispatch = useAppDispatch();
  const citySuggestions = useAppSelector((state) => state.city.citySuggestions);
  const allCities = useAppSelector((state) => state.city.allCities);

  useEffect(() => {
    if (!allCities.length) dispatch(fetchAllCities());
  }, [dispatch, allCities.length]);

  return (
    <div role="search" aria-label="Vyhledávání měst" className="relative w-48 animate-fadeIn">
      <CityInput citySuggestions={citySuggestions} />
      <SuggestionsList citySuggestions={citySuggestions} />
    </div>
  );
}
