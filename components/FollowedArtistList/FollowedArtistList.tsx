import React, { useState } from 'react';
import { ListProps } from './FollowedArtistList.types';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import ArtistsList from '../ArtistsList/ArtistsList';

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, setFollowedArtistList } = useArtistsListContext();

  if (!followedArtistList?.rows || !i18n || !i18n.btnTxt) {
    return null;
  }

  // TODO remove from this scope
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
    <ArtistsList
      i18n={i18n}
      artistsList={followedArtistList}
      onButtonClick={unfollowArtist}
      artistLoading={artistLoading}
    />
  );
};
FollowedArtistList.whyDidYouRender = true;
export default FollowedArtistList;
