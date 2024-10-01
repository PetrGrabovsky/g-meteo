import clsx from 'clsx';
import CityAutocomplete from './city-autocomplete';
import Brand from './brand';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { useAppSelector } from '@/store/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const isScrolled = useAppSelector((state) => state.ui.isScrolled);

  const handleLogoClick = () => {
    dispatch(fetchCoordinates());
  };

  return (
    <header
      className={clsx(
        isScrolled &&
          'sticky top-0 animate-fadeInDown bg-blue-950 bg-opacity-50 shadow-lg backdrop-blur-md backdrop-filter',
        'z-50 bg-blue-700 py-4 text-white shadow-md transition-all duration-500 ease-in-out'
      )}
    >
      <div className="container flex items-center justify-between">
        <h1 className="sr-only">Gmeteo - Předpověď počasí</h1>
        <Link
          onClick={handleLogoClick}
          href="/"
          passHref
          aria-label="Gmeteo - Domovská stránka"
          className={clsx(
            'text-2xl font-bold uppercase tracking-wide transition-transform duration-200 hover:scale-110',
            'z-50 flex animate-fadeIn cursor-pointer items-center space-x-1 hover:text-blue-300'
          )}
        >
          <Brand className="z-50 mt-1 h-10 w-10" primaryColor="text-white" secondaryColor="text-green-500" />
          <span>meteo</span>
        </Link>
        <CityAutocomplete />
      </div>
    </header>
  );
}
