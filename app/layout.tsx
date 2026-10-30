import { ReactNode } from 'react';
import './globals.css';
import { inter } from '@/utils/fonts';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { metadata as myMetadata } from '@/utils/metadata';
import Layout from '@/components/layout';

export const metadata: Metadata = myMetadata;

// Výchozí viewport doplní Next.js sám, zoom zůstává povolený
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs">
      <body
        className={clsx(
          inter.className,
          'flex min-h-screen flex-col bg-linear-to-b from-blue-500 to-blue-900 text-white antialiased'
        )}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
