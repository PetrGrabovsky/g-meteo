import clsx from 'clsx';
import CityInput from './city-input';
import Brand from './brand';

export default function Header() {
  return (
    <header className="bg-blue-700 bg-opacity-80 py-4 text-white shadow-md">
      <div className="container flex items-center justify-between">
        <h1 className="sr-only">Gmeteo - Předpověď počasí</h1>
        <div
          aria-hidden="true"
          className={clsx(
            'text-2xl font-bold uppercase tracking-wide transition-transform duration-200 hover:scale-110',
            'flex cursor-default items-center space-x-1 hover:text-blue-300'
          )}
        >
          <Brand className="h-10 w-10" primaryColor="text-white" secondaryColor="text-green-500" />
          <span>Meteo</span>
        </div>
        <CityInput />
      </div>
    </header>
  );
}
