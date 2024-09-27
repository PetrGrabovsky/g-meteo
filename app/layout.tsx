import { ReactNode } from 'react';
import './globals.css';
import { inter } from '@/utils/fonts';
import clsx from 'clsx';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs">
      <body className={clsx(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}
