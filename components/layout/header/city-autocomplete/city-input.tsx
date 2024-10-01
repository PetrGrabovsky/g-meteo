import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { filterCities } from '@/store/thunks/filter-cities';
import clsx from 'clsx';
import { City } from '@/utils/weather-api-types';

interface CityInputProps {
  citySuggestions: City[];
}

export default function CityInput({ citySuggestions }: CityInputProps) {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.city.searchInput);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const cityError = useAppSelector((state) => state.city.error);

  const cityLoading = useAppSelector((state) => state.city.loading);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const isLoading = cityLoading || weatherLoading;

  const isMobile = useAppSelector((state) => state.ui.isMobile);

  useEffect(() => {
    if (!isMobile && !isLoading && cityInputRef.current) cityInputRef.current.focus();
  }, [isLoading, isMobile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
    dispatch(filterCities());
  };

  const handleInputBlur = () => {
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && cityInputRef.current) cityInputRef.current.blur();
  };

  const getPlaceholder = (): string => {
    if (cityError) return '❌';
    if (cityLoading) return 'Načítám města...';
    if (weatherLoading) return 'Načítám počasí...';
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
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholder()}
        disabled={isLoading || !!cityError}
        maxLength={20}
        aria-controls="citySuggestions"
        aria-haspopup="listbox"
        aria-expanded={citySuggestions.length > 0 ? 'true' : 'false'}
        className={clsx(
          'w-full rounded-lg bg-blue-500 bg-opacity-50 p-2 text-white placeholder-white transition',
          'duration-200 focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-4',
          'animate-fadeIn text-center text-sm hover:scale-105 focus:scale-105 focus:ring-blue-400',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
    </>
  );
}
