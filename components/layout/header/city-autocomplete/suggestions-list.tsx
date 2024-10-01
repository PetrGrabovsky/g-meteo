import clsx from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { setCoordinates } from '@/store/slices/geo-slice';
import { setSearchInput, setCitySuggestions } from '@/store/slices/city-slice';
import { City } from '@/utils/weather-api-types';

interface SuggestionsListProps {
  citySuggestions: City[];
}

export default function SuggestionsList({ citySuggestions }: SuggestionsListProps) {
  const dispatch = useAppDispatch();

  const handleCityClick = (city: City) => {
    dispatch(setCoordinates({ latitude: city.coord.lat, longitude: city.coord.lon }));
    dispatch(setSearchInput(''));
    dispatch(setCitySuggestions([]));
  };

  return (
    <>
      {citySuggestions.length > 0 && (
        <div
          id="citySuggestions"
          role="listbox"
          aria-labelledby="cityInput"
          className={clsx(
            'absolute z-10 mt-2 w-full animate-fadeIn overflow-hidden rounded-lg border border-gray-200 bg-white',
            'shadow-lg'
          )}
        >
          <ul className="max-h-60">
            {citySuggestions.map((city) => (
              <li
                key={city.id}
                role="option"
                aria-selected={false}
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
