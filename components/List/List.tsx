import React from 'react';
import { ListProps, ListEl } from './List.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';

const List: React.FunctionComponent<ListProps> = ({ list, i18n }) => {
  if (!list || !i18n || !i18n.unfollow) {
    return null;
  }

  return (
    <div className="border border-indigo-100">
      {list.map((el: ListEl, index: number) => (
        <div className="flex justify-between items-center px-8 even:bg-gray-100" key={index}>
          <p>{el.name}</p>
          <div className="flex">
            {el.lastFmUrl && (
              <a className="inline" href={el.lastFmUrl}>
                <LastFm />
              </a>
            )}
            {el.spotifyUrl && (
              <a className="inline" href={el.spotifyUrl}>
                <Spotify />
              </a>
            )}
          </div>
          <button className="py-2 px-3 bg-indigo-800 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
            {i18n.unfollow}
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
