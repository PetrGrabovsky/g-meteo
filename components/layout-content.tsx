'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import clsx from 'clsx';
import Header from './header';

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <Provider store={store}>
      <Header />
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
