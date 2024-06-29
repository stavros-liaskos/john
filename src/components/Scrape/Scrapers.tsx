import ScrapeButton from './components/ScrapeButton';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { components } from '../../types/schema';
import Endpoints from '../../types/endpoints';
import { scrapersI18n } from '../../i18n';

const Scrapers = () => {
  const { user } = useUser();
  const [scrapers, setScrapers] = useState<{ spotify: boolean; lastfm: boolean }>({ spotify: false, lastfm: false });

  useEffect(() => {
    user?.email &&
      fetch(`${Endpoints.RaccoonUser}?email=${user.email}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => res.json())
        .then((raccoonUser: components['schemas']['RaccoonUser'][]) => {
          const isLastFmConnected = !!raccoonUser?.[0]?.lastfmUsername;
          const isSpotifyConnected = !!raccoonUser?.[0]?.spotifyEnabled;
          if (scrapers.spotify !== isSpotifyConnected || scrapers.lastfm !== isLastFmConnected) {
            setScrapers({ spotify: isSpotifyConnected, lastfm: isLastFmConnected });
          }
        })
        .catch(console.error);
  }, [user?.email]);

  return (
    <div className="flex lg:justify-center gap-2 mb-2 w-full">
      <ScrapeButton
        buttonText={scrapers.spotify ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'Spotify'}
        iconName={'Spotify'}
        connected={scrapers.spotify}
      />
      <ScrapeButton
        buttonText={scrapers.lastfm ? scrapersI18n.connected : scrapersI18n.connect}
        musicService={'LastFm'}
        iconName={'LastFm'}
        connected={scrapers.lastfm}
      />
    </div>
  );
};

export default Scrapers;
