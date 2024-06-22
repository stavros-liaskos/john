import React, { useState } from 'react';
import { ListI18n, ListProps } from './FollowedArtistList.types';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import ArtistsList from '../ArtistsList/ArtistsList';
import FormInput from '../FormInput/FormInput';
import { components } from '../../types/schema';

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, setFollowedArtistList } = useArtistsListContext();

  if (validateRequiredData(i18n, followedArtistList)) {
    return null;
  }

  return (
    <div>
      <h3 className={'rr-text'}>{i18n.title}</h3>
      <FormInput handleAction={handleFilter} i18n={i18n.formInput} actionEventTrigger={'onChange'} />
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={followedArtistList}
        onButtonClick={unfollowArtist}
        artistLoading={artistLoading}
      />
    </div>
  );

  // TODO write tests
  function handleFilter(input: string) {
    return followedArtistList.filter((followedArtistList: components['schemas']['FollowedArtistDto']) => {
      if (!input) {
        return followedArtistList;
      } else {
        return followedArtistList.name.includes(input);
      }
    });
  }

  function unfollowArtist(artistID: number) {
    setArtistLoading(artistID);
    fetch(`${process.env.BE_BASE_URL}/me/unfollow`, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ artistID }),
    })
      .then(() => {
        const newList = followedArtistList && followedArtistList.filter(artist => artist.id !== artistID);
        if (newList && newList.length !== followedArtistList?.length) {
          setFollowedArtistList(newList);
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

function validateRequiredData(i18n: ListI18n, followedArtistList: components['schemas']['FollowedArtistDto'][]) {
  return (
    !followedArtistList?.length ||
    !i18n ||
    !i18n?.title ||
    !i18n?.filter ||
    !i18n?.artistList.noArtists ||
    !i18n?.artistList.btnTxt ||
    !i18n?.formInput.label
  );
}
