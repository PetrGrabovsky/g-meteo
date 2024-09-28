import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gmeteo - předpověď počasí na 6 dní pro celý svět',
  description:
    'S aplikací Gmeteo získáte přesnou a aktuální předpověď počasí na 6 dní pro jakékoliv místo na světě. Zadejte své město a zjistěte více o počasí.',
  keywords: [
    'počasí',
    'předpověď',
    '6denní předpověď',
    'Gmeteo',
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
    title: 'Gmeteo - Předpověď počasí na 6 dní pro celý svět',
    description: 'Získejte přesnou předpověď počasí na 6 dní pro jakékoliv místo na světě s aplikací Gmeteo.',
    url: 'https://g-meteo-eight.vercel.app/',
    type: 'website',
  },
};
