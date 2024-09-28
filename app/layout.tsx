import { ReactNode } from 'react';
import './globals.css';
import { inter } from '@/utils/fonts';
import clsx from 'clsx';
import { Metadata } from 'next';
import { metadata as myMetadata } from '@/utils/metadata';
import LayoutContent from '@/components/layout-content';
import Head from '@/components/head';

export const metadata: Metadata = myMetadata;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs">
      <Head />
      <body
        className={clsx(
          inter.className,
          'flex min-h-screen flex-col bg-gradient-to-b from-blue-500 to-blue-900 text-white antialiased'
        )}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
