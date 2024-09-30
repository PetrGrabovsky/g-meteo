import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { filterCities } from '@/store/thunks/filter-cities';
import clsx from 'clsx';

export default function CityInput() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.city.searchInput);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const cityLoading = useAppSelector((state) => state.city.loading);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const isLoading = cityLoading || weatherLoading;

  useEffect(() => {
    if (!isLoading && cityInputRef.current) cityInputRef.current.focus();
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
    dispatch(filterCities());
  };

  const handleInputBlur = () => {
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));
  };

  return (
    <input
      ref={cityInputRef}
      type="text"
      value={searchInput}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      placeholder={cityLoading ? 'Načítám města...' : weatherLoading ? 'Načítám počasí...' : 'Zadejte město...'}
      disabled={isLoading}
      maxLength={20}
      className={clsx(
        isLoading && 'cursor-not-allowed opacity-50',
        'w-full rounded-lg bg-blue-500 bg-opacity-50 p-2 text-white placeholder-white transition',
        'duration-200 focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-4',
        'animate-fadeIn text-center text-sm hover:scale-105 focus:scale-105 focus:ring-blue-400'
      )}
    />
  );
}
