import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GridSnap Time Card & Wage Calculator',
    short_name: 'GridSnap Work Tools',
    description:
      'Free, private client-side time card calculator with lunch break deductions, FLSA overtime calculation, and instant PDF/CSV export.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
