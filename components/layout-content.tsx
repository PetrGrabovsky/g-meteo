'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <Provider store={store}>
      <header className="bg-blue-700 bg-opacity-80 py-4 text-white shadow-md">
        <div className="container">
          <h1 className="text-3xl font-bold">G-meteo</h1>
        </div>
      </header>
      <main className="container flex-1">{children}</main>
      <footer className="bg-blue-700">
        <div className="container text-right">
          <p>Všechna práva vyhrazena &copy; 2024</p>
        </div>
      </footer>
    </Provider>
  );
}
