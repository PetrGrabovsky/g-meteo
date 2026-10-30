/** @type {import('next').NextConfig} */
const nextConfig = {
  // Seznam měst čte route /api/cities ze souboru, Vercel ho musí přibalit
  outputFileTracingIncludes: {
    '/api/cities': ['./data/city.list.json'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
    ],
  },
};

export default nextConfig;
