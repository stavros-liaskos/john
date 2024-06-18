import React, { useState } from 'react';
import { ListProps } from './FollowedArtistList.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';
import Button from '../Button/Button';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';

const ICON_SIZE = 30;

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, setFollowedArtistList } = useArtistsListContext();

  if (!followedArtistList?.rows || !i18n || !i18n.unfollow) {
    return null;
  }

  function unfollowArtist(artistID: number) {
    setArtistLoading(artistID);
    fetch(`${process.env.BE_BASE_URL}/me/unfollow`, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ artistID }),
    })
      .then(() => {
        const newList = followedArtistList?.rows && followedArtistList.rows.filter(artist => artist.id !== artistID);
        if (newList && newList.length !== followedArtistList?.rows?.length) {
          setFollowedArtistList({
            total: newList.length,
            rows: newList,
          });
        }
        console.log(`${artistID} successfully unfollowed`);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      })
      .finally(() => setArtistLoading(0));
  }

  return (
    <div className="overflow-auto w-full">
      {!followedArtistList?.rows && <p>You don not track any artists yet</p>}

      {followedArtistList.rows.map((artist, index: number) => (
        <div
          className="flex justify-between md:justify-center items-center dark:even:bg-gh-darkly even:bg-gray-100"
          key={artist.id}
        >
          <p className="grow text-clip rr-text">{artist.name}</p>
          <div className="flex basis-2 mx-4 md:mx-8">
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
          <Button
            i18n={i18n.unfollow}
            handleClick={unfollowArtist}
            handleClickArg={artist.id}
            className={`btn-small lg:ml-8 my-2 ${index % 2 ? '!border-gh-dark' : ''}`}
            disabled={!!artistLoading && artist.id === artistLoading}
            loading={!!artistLoading && artist.id === artistLoading}
          />
        </div>
      ))}
    </div>
  );
};
FollowedArtistList.whyDidYouRender = true;
export default FollowedArtistList;
