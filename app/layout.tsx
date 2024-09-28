import { ReactNode } from 'react';
import './globals.css';
import { inter } from '@/utils/fonts';
import clsx from 'clsx';
import { Metadata } from 'next';
import LayoutContent from '@/components/layout-content';

export const metadata: Metadata = {
  title: 'g-meteo - předpověď počasí na 6 dní pro celý svět',
  description:
    'S aplikací g-meteo získáte přesnou a aktuální předpověď počasí na 6 dní pro jakékoliv místo na světě. Zadejte své město a zjistěte více o počasí.',
  keywords: [
    'počasí',
    'předpověď',
    '6denní předpověď',
    'g-meteo',
    'předpověď počasí',
    'světové počasí',
    'počasí ve městě',
    'meteorologie',
  ],
  authors: [
    {
      name: 'Petr Grabovský',
      url: 'https://github.com/PetrGrabovsky',
    },
  ],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'G-METEO - Předpověď počasí na 6 dní pro celý svět',
    description: 'Získejte přesnou předpověď počasí na 6 dní pro jakékoliv místo na světě s aplikací G-METEO.',
    url: 'https://g-meteo-eight.vercel.app/',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
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
