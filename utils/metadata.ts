import { Metadata } from 'next';

const title = 'Gmeteo - předpověď počasí na 5 dní pro celý svět';
const description =
  'Předpověď počasí na 5 dní pro jakékoli město na světě nebo pro vaši polohu: denní maximum a noční minimum teploty, vlhkost a vítr.';

// Open Graph a Twitter karta dávají odkazu náhled na sociálních sítích (obrázek je app/opengraph-image.png).
export const metadata: Metadata = {
  metadataBase: new URL('https://g-meteo-eight.vercel.app'),
  title,
  description,
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
    type: 'website',
    siteName: 'Gmeteo',
    locale: 'cs_CZ',
    url: '/',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
};
