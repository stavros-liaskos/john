import React, { useState } from 'react';
import { ListProps, ListEl } from './List.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';

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
    <div className="border border-indigo-100">
      {list.map((artist: ListEl, index: number) => (
        <div className="flex justify-between items-center px-8 even:bg-gray-100" key={index}>
          <p>{artist.name}</p>
          <div className="flex basis-2">
            {artist.lastfmUri && (
              <a className="inline" href={artist.lastfmUri}>
                <LastFm />
              </a>
            )}
            {artist.spotifyUri && (
              <a className="inline" href={artist.spotifyUri}>
                <Spotify />
              </a>
            )}
          </div>
          <button
            className="py-2 px-3 bg-indigo-800 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
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
