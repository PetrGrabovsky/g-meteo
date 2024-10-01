import clsx from 'clsx';
import { City } from '@/utils/weather-api-types';
import { useRef, MouseEvent, useEffect } from 'react';

interface SuggestionsListProps {
  selectedIndex: number | null;
  citySuggestions: City[];
  handleCitySelect: (city: City) => void;
}

export default function SuggestionsList({ citySuggestions, selectedIndex, handleCitySelect }: SuggestionsListProps) {
  const suggestionsListRef = useRef<HTMLUListElement>(null); // Reference na seznam

  // Posune seznam tak, aby bylo vybrané město viditelné
  useEffect(() => {
    if (selectedIndex !== null && suggestionsListRef.current) {
      const selectedOption = suggestionsListRef.current.children[selectedIndex];
      if (selectedOption) {
        (selectedOption as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  // Zabrání zavření seznamu při kliknutí na scrollbar
  const handleMouseDownOnList = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {citySuggestions.length > 0 && (
        <div
          id="citySuggestions"
          role="listbox"
          aria-labelledby="cityInput"
          className={clsx(
            'absolute z-10 mt-2 w-full overflow-hidden rounded-lg',
            'scrollable animate-fadeIn border border-gray-200 bg-white shadow-lg'
          )}
        >
          <ul ref={suggestionsListRef} onMouseDown={handleMouseDownOnList} className="max-h-80 overflow-y-auto pr-2">
            {citySuggestions.map((city, index) => (
              <li
                id={`suggestion-${index}`}
                key={city.id}
                role="option"
                aria-selected={selectedIndex === index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleCitySelect(city);
                }}
                className={clsx(
                  selectedIndex === index && 'bg-blue-500 text-white',
                  'w-full cursor-pointer rounded-r-lg px-4 py-2 text-gray-700 transition-colors duration-200',
                  'flex items-center justify-between',
                  'hover:bg-blue-500 hover:text-white'
                )}
              >
                <span className="w-full text-left">{city.name}</span>
                <div
                  className={clsx(
                    'ml-2 flex-shrink-0 rounded-full bg-blue-500 text-white',
                    'flex h-8 w-8 items-center justify-center text-xs font-bold'
                  )}
                >
                  {city.country}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
