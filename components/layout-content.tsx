'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from './header';
import Footer from './footer';

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <Provider store={store}>
      <Header />
      <main className="container flex-1 py-10 shadow-inner">{children}</main>
      <Footer />
    </Provider>
  );
}
