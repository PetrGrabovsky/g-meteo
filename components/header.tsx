import clsx from 'clsx';
import CityInput from './city-input';

export default function Header() {
  return (
    <header className="bg-blue-700 bg-opacity-80 py-4 text-white shadow-md">
      <div className="container flex items-center justify-between">
        <h1
          className={clsx(
            'text-2xl font-bold uppercase tracking-wide transition-transform duration-200 hover:scale-110',
            'cursor-default hover:text-blue-300'
          )}
        >
          G-meteo
        </h1>
        <CityInput />
      </div>
    </header>
  );
}
