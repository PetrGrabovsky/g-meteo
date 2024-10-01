'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from './header';
import Footer from './footer';

interface LayoutContentProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutContentProps) {
  return (
    <Provider store={store}>
      <Header />
      <main className="container flex flex-grow flex-col shadow-inner">{children}</main>
      <Footer />
    </Provider>
  );
}
