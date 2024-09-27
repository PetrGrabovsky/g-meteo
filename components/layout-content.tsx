'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import clsx from 'clsx';

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <Provider store={store}>
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
      <main className="container flex-1 py-10 shadow-inner">{children}</main>
      <footer
        className={clsx(
          'mt-auto rounded-t-lg bg-gradient-to-t from-blue-900 to-blue-700 py-6 text-gray-300 shadow-inner'
        )}
      >
        <div className="container text-right">
          <p>&copy; 2024 Petr Grabovský</p>
        </div>
      </footer>
    </Provider>
  );
}
