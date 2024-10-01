import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRef } from 'react';
import { setCoordinates } from '@/store/slices/geo-slice';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { City } from '@/utils/weather-api-types';

export default function SuggestionsList() {
  const dispatch = useAppDispatch();
  const citySuggestions = useAppSelector((state) => state.city.citySuggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCityClick = (city: City) => {
    dispatch(setCoordinates({ latitude: city.coord.lat, longitude: city.coord.lon }));
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));

    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <>
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
    </>
  );
}
