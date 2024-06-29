import { MetadataRoute } from 'next';
import { metaI18n } from './src/i18n';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metaI18n.title,
    short_name: metaI18n.shortName,
    description: metaI18n.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
