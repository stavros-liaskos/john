import ScrapeButton from './components/ScrapeButton';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { components } from '../../types/schema';

const Scrapers = () => {
  const { user } = useUser();
  const [scrapers, setScrapers] = useState<{ spotify: boolean; lastfm: boolean }>({ spotify: false, lastfm: false });

  useEffect(() => {
    user?.email &&
      fetch(`${process.env.BE_BASE_URL}/raccoon-user?email=${user.email}`, {
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
        buttonText={scrapers.spotify ? 'Connected' : 'Connect'}
        musicService={'Spotify'}
        iconName={'Spotify'}
        connected={scrapers.spotify}
      />
      <ScrapeButton
        buttonText={scrapers.lastfm ? 'Connected' : 'Connect'}
        musicService={'LastFm'}
        iconName={'LastFm'}
        connected={scrapers.lastfm}
      />
    </div>
  );
};

export default Scrapers;
