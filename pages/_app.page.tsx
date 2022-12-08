import '../scripts/wdyr';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import ThemeProvider from '../contexts/Theme/ThemeProvider';
import ArtistsListProvider from '../contexts/ArtistsList/ArtistsListProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <ArtistsListProvider>
          <Component {...pageProps} />
        </ArtistsListProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
