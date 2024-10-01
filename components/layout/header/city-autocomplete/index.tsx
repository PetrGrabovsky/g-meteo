import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { setCoordinates } from '@/store/slices/geo-slice';
import { fetchAllCities } from '@/store/thunks/fetch-all-cities';
import { City } from '@/utils/weather-api-types';
import CityInput from './city-input';
import SuggestionsList from './suggestions-list';

export default function CityAutocomplete() {
  const dispatch = useAppDispatch();
  const citySuggestions = useAppSelector((state) => state.city.citySuggestions);
  const allCities = useAppSelector((state) => state.city.allCities);
  const containerRef = useRef<HTMLDivElement>(null); // Pro detekci kliknutí mimo komponentu
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Aktuálně vybraný návrh

  // Načte města při prvním vykreslení
  useEffect(() => {
    if (!allCities.length) dispatch(fetchAllCities());
  }, [dispatch, allCities.length]);

  // Přidá event listener pro kliknutí mimo komponentu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Kliknutí mimo komponentu, uzavře návrhy
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      dispatch(setSearchInput(''));
      dispatch(setCitySuggestions([]));
    }
  };

  // Zpracování výběru města
  const handleCitySelect = (city: City) => {
    dispatch(setCoordinates({ latitude: city.coord.lat, longitude: city.coord.lon }));
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));
  };

  return (
    <div
      ref={containerRef}
      role="combobox"
      aria-expanded={citySuggestions.length > 0}
      aria-haspopup="listbox"
      aria-owns="citySuggestions"
      aria-label="Vyhledávání měst"
      className="relative w-48 animate-fadeIn"
      tabIndex={-1}
    >
      <CityInput
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        citySuggestions={citySuggestions}
        handleCitySelect={handleCitySelect}
      />
      <SuggestionsList
        selectedIndex={selectedIndex}
        citySuggestions={citySuggestions}
        handleCitySelect={handleCitySelect}
      />
    </div>
  );
}
