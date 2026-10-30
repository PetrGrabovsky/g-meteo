import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gmeteo - předpověď počasí na 5 dní pro celý svět',
  description:
    'S aplikací Gmeteo získáte přesnou a aktuální předpověď počasí na 5 dní pro libovolné místo na světě. Stačí zadat své město nebo povolit určování polohy a okamžitě se dozvíte, jaké počasí vás čeká.',
  keywords: [
    'počasí',
    'předpověď',
    '5ti denní předpověď',
    'Gmeteo',
    'předpověď počasí',
    'světové počasí',
    'počasí ve městě',
    'meteorologie',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
  },
  authors: [
    {
      name: 'Petr Grabovský',
      url: 'https://github.com/PetrGrabovsky',
    },
  ],
  openGraph: {
    title: 'Gmeteo - Předpověď počasí na 5 dní pro celý svět',
    description:
      'S aplikací Gmeteo získáte přesnou a aktuální předpověď počasí na 5 dní pro libovolné místo na světě. Stačí zadat své město nebo povolit určování polohy a okamžitě se dozvíte, jaké počasí vás čeká.',
    url: 'https://g-meteo-eight.vercel.app/',
    type: 'website',
  },
};
