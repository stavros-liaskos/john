import React, { useState } from 'react';
import { ListProps, ListEl } from './List.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';

const ICON_SIZE = 30;

const List: React.FunctionComponent<ListProps> = ({ list, i18n }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!list || !i18n || !i18n.unfollow) {
    return null;
  }

  const followArtist = (artistData: ListEl) => {
    setDisabled(true);
    fetch('/me/unfollow', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(artistData),
    })
      .then(() => {
        console.log(`${artistData.name} successfully unfollowed`);
      })
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
      })
      .finally(() => {
        setTimeout(() => setDisabled(false), 2000);
      });
  };

  return (
    <div className="border dark:border-slate-800">
      {list.map((artist: ListEl, index: number) => (
        <div className="flex justify-between items-center px-8 dark:even:bg-gray-800 even:bg-gray-100" key={index}>
          <p className="grow dark:text-slate-400">{artist.name}</p>
          <div className="flex basis-2 mx-8">
            {artist.lastfmUri && (
              <a className="inline" href={artist.lastfmUri}>
                <LastFm width={ICON_SIZE} height={ICON_SIZE} />
              </a>
            )}
            {artist.spotifyUri && (
              <a className="inline" href={artist.spotifyUri}>
                <Spotify width={ICON_SIZE} height={ICON_SIZE} />
              </a>
            )}
          </div>
          <button
            className="py-1 px-3 ml-8 my-2 text-sm font-semibold rounded shadow border-2 dark:text-slate-400 dark:border-slate-800 border-black"
            onClick={() => followArtist(artist)}
            disabled={disabled}
          >
            {i18n.unfollow}
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
