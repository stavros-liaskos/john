import React, { useEffect, useState } from 'react';
import { ListProps } from './FollowedArtistList.types';
import Spotify from '../Icons/spotify';
import LastFm from '../Icons/lastfm';
import Button from '../Button/Button';
import { components } from '../../types/schema';

const ICON_SIZE = 30;

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['FollowedArtistsResponse']>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
      });
      const json = await data.json();
      setFollowedArtistList(json);
    };
    fetchData().catch(console.error);
  }, []);

  if (!followedArtistList?.rows || !i18n || !i18n.unfollow) {
    return null;
  }

  const unfollowArtist = (artistID: number) => {
    setArtistLoading(artistID);
    fetch(`${process.env.BE_BASE_URL}/me/unfollow`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ artistID }),
    })
      .then(() => {
        const newList = followedArtistList.rows!.filter(artist => artist.id !== artistID);
        setFollowedArtistList({
          total: newList.length,
          rows: newList,
        });
        console.log(`${artistID} successfully unfollowed`);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      })
      .finally(() => setArtistLoading(0));
  };

  return (
    <div className="overflow-auto w-full">
      {!followedArtistList?.rows && <p>You don not track any artists yet</p>}

      {followedArtistList.rows.map((artist, index: number) => (
        <div
          className="flex justify-between md:justify-center items-center dark:even:bg-gh-darkly even:bg-gray-100"
          key={index}
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
            onClick={() => unfollowArtist(artist.id!)} // TODO fix in BE: id must be required
            className={`btn-small lg:ml-8 my-2 ${index % 2 ? '!border-gh-dark' : ''}`}
            disabled={!!artistLoading && artist.id === artistLoading}
            loading={!!artistLoading && artist.id === artistLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default FollowedArtistList;
