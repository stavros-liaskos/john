import { MetadataRoute } from 'next';
import { metaI18n } from './src/i18n';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metaI18n.title,
    short_name: metaI18n.shortName,
    description: metaI18n.description,
    start_url: metaI18n.startUrl,
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/app_icons/64.png',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/app_icons/192.png',
        sizes: '192x192',
        type: 'image/x-icon',
      },
      {
        src: '/app_icons/512.png',
        sizes: '512x512',
        type: 'image/x-icon',
      },
    ],
  };
}
