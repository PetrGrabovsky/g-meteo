import { useEffect, useRef } from 'react';
import { fetchAllCities } from '@/store/thunks/fetch-all-cities';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { filterCities } from '@/store/thunks/filter-cities';
import clsx from 'clsx';
import { City } from '@/utils/weather-api-types';
import { setCoordinates } from '@/store/slices/geo-slice';

export default function CityAutocomplete() {
  const dispatch = useAppDispatch();
  const allCities = useAppSelector((state) => state.city.allCities);
  const cityLoading = useAppSelector((state) => state.city.loading);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const searchInput = useAppSelector((state) => state.city.searchInput);
  const citySuggestions = useAppSelector((state) => state.city.citySuggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = cityLoading || weatherLoading;

  useEffect(() => {
    if (!allCities.length) {
      dispatch(fetchAllCities());
    }
  }, [dispatch, allCities.length]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
    dispatch(filterCities());
  };

  const handleInputBlur = () => {
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));
  };

  const handleCityClick = (city: City) => {
    dispatch(setCoordinates({ latitude: city.coord.lat, longitude: city.coord.lon }));
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));

    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative w-48 animate-fadeIn">
      <input
        ref={inputRef}
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
      {citySuggestions.length > 0 && (
        <div
          className={clsx(
            'absolute z-10 mt-2 w-full animate-fadeIn overflow-hidden rounded-lg border border-gray-200 bg-white',
            'shadow-lg'
          )}
        >
          <ul className="max-h-60">
            {citySuggestions.map((city) => (
              <li
                key={city.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleCityClick(city);
                }}
                className={clsx(
                  'cursor-pointer px-4 py-2 text-gray-700 transition-colors duration-200',
                  'flex items-center justify-center hover:bg-blue-500 hover:text-white'
                )}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
