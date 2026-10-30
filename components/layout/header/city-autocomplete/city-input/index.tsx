import clsx from 'clsx';
import { Dispatch, SetStateAction, useRef, KeyboardEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { filterCities } from '@/store/thunks/filter-cities';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { City } from '@/utils/weather-api-types';

interface CityInputProps {
  selectedIndex: number | null;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
  citySuggestions: City[];
  handleCitySelect: (city: City) => void;
}

export default function CityInput({
  selectedIndex,
  setSelectedIndex,
  citySuggestions,
  handleCitySelect,
}: CityInputProps) {
  const dispatch = useAppDispatch();

  const searchInput = useAppSelector((state) => state.city.searchInput);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  const cityInputRef = useRef<HTMLInputElement>(null);
  const isExpanded = citySuggestions.length > 0;
  const isLoading = weatherLoading;

  // Autofocus na input pouze na větších zařízeních
  useEffect(() => {
    if (!isMobile && !isLoading && cityInputRef.current) cityInputRef.current.focus();
  }, [isLoading, isMobile]);

  // Při změně v inputu, vyhledávání měst
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
    dispatch(filterCities());
    setSelectedIndex(null);
  };

  // Zpracování stisku kláves pro navigaci
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && cityInputRef.current) {
      cityInputRef.current.blur();
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev === null || prev === citySuggestions.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev === null || prev === 0 ? citySuggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      const selectedCity = citySuggestions[selectedIndex];
      handleCitySelect(selectedCity);
    }
  };

  // Skrytí návrhů při ztrátě focusu
  const handleInputBlur = () => {
    setTimeout(() => {
      if (!document.activeElement?.closest('ul')) {
        dispatch(setSearchInput(''));
        dispatch(setCitySuggestions([]));
      }
    }, 100);
  };

  const getPlaceholder = (): string => {
    if (weatherLoading) return 'Načítám předpověď...';
    return 'Zadejte město...';
  };

  return (
    <>
      <label htmlFor="cityInput" className="sr-only">
        Zadejte město
      </label>
      <input
        id="cityInput"
        ref={cityInputRef}
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        placeholder={getPlaceholder()}
        disabled={isLoading}
        role="combobox"
        aria-expanded={isExpanded}
        aria-autocomplete="list"
        aria-controls={isExpanded ? 'citySuggestions' : undefined}
        aria-activedescendant={selectedIndex !== null ? `suggestion-${selectedIndex}` : undefined}
        className={clsx(
          'w-full rounded-lg bg-blue-500/50 p-2 text-white transition placeholder:text-white',
          'duration-200 focus:bg-blue-500 focus:shadow-lg focus:ring-4 focus:outline-hidden',
          'animate-fadeIn text-center text-sm hover:scale-105 focus:scale-105 focus:ring-blue-400',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
    </>
  );
}
