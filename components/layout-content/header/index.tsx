import clsx from 'clsx';
import CityAutocomplete from '@/components/layout-content/header/city-autocomplete';
import Brand from './brand';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';

export default function Header() {
  const dispatch = useAppDispatch();

  const handleLogoClick = () => {
    dispatch(fetchCoordinates());
  };

  return (
    <header className="bg-blue-700 bg-opacity-80 py-4 text-white shadow-md">
      <div className="container flex items-center justify-between">
        <h1 className="sr-only">Gmeteo - Předpověď počasí</h1>
        <Link
          onClick={handleLogoClick}
          href="/"
          passHref
          aria-label="Gmeteo - Domovská stránka"
          className={clsx(
            'text-2xl font-bold uppercase tracking-wide transition-transform duration-200 hover:scale-110',
            'flex animate-fadeIn cursor-pointer items-center space-x-1 hover:text-blue-300'
          )}
        >
          <Brand className="mt-1 h-10 w-10" primaryColor="text-white" secondaryColor="text-green-500" />
          <span>meteo</span>
        </Link>
        <CityAutocomplete />
      </div>
    </header>
  );
}
