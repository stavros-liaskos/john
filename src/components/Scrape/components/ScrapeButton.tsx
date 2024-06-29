import React from 'react';
import Spotify from '../../Icons/spotify';
import LastFm from '../../Icons/lastfm';
import IconTypes from '../../Icons/iconTypes';
import Button from '../../Button/Button';
import Endpoints from '../../../types/endpoints';

export type MusicServiceType = 'Spotify' | 'LastFm';
const ICON_SIZE = 30;

const ScrapeButton = ({
  buttonText,
  musicService,
  iconName,
  connected,
}: {
  buttonText: string;
  musicService: MusicServiceType;
  iconName: MusicServiceType;
  connected: boolean;
}) => {
  if (!musicService || !buttonText || !iconName) {
    return null;
  }

  const MusicServiceIcon = getMusicServiceIcon(iconName);

  return (
    <div className="flex justify-center items-center mb-2 w-full">
      <Button
        className={`flex justify-between py-2 px-3 w-full md:w-48${connected ? ' !rr-text-confirm' : ''}`}
        i18n={buttonText}
        handleClick={() => handleScrape(musicService)}
        disabled={connected}
      >
        <MusicServiceIcon width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
    </div>
  );
};

export function getMusicServiceIcon(iconName: MusicServiceType): React.FunctionComponent<IconTypes> {
  const components = {
    Spotify,
    LastFm,
  };
  return components[iconName];
}

export async function handleScrape(musicService: MusicServiceType) {
  await fetch(`${getMusicServiceUrl(musicService)}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => res.json())
    .then(() => {
      console.log('Scraped successfully. Show notification');
    })
    .catch(() => {
      console.log('Scrape failed. Show notification');
    });
}

export function getMusicServiceUrl(musicService: MusicServiceType): string {
  switch (musicService) {
    case 'LastFm':
      return Endpoints.ScrapeLastFM;
    case 'Spotify':
      return Endpoints.ScrapeSpotify;
    default:
      throw new Error(`Failed to getMusicServicePath for: ${musicService}`);
  }
}

export default ScrapeButton;
