import clsx from 'clsx';

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
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Zadejte město..."
            className={clsx(
              'w-full rounded-lg bg-blue-500 bg-opacity-50 p-2 text-white placeholder-white transition',
              'duration-200 focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-4',
              'text-center text-sm focus:ring-blue-400'
            )}
          />
        </div>
      </div>
    </header>
  );
}
