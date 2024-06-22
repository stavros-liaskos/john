import React, { useState } from 'react';
import { ListProps } from './FollowedArtistList.types';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import ArtistsList from '../ArtistsList/ArtistsList';

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, setFollowedArtistList } = useArtistsListContext();

  if (
    !followedArtistList?.rows ||
    !i18n ||
    !i18n?.title ||
    !i18n?.filter ||
    !i18n?.artistList.noArtists ||
    !i18n?.artistList.btnTxt ||
    !i18n?.formInput.label
  ) {
    return null;
  }

  return (
    <div>
      <h3 className={'rr-text'}>{i18n.title}</h3>
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={followedArtistList}
        onButtonClick={unfollowArtist}
        artistLoading={artistLoading}
      />
    </div>
  );

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
};
FollowedArtistList.whyDidYouRender = true;
export default FollowedArtistList;
