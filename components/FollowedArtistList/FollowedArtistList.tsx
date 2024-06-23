import React, { useState } from 'react';
import { ListI18n, ListProps } from './FollowedArtistList.types';
import { useArtistsListContext } from '../../contexts/ArtistsList/ArtistsListContext';
import ArtistsList from '../ArtistsList/ArtistsList';
import FormInput from '../FormInput/FormInput';
import { components } from '../../types/schema';

const FollowedArtistList: React.FunctionComponent<ListProps> = ({ i18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const { followedArtistList, setFollowedArtistList } = useArtistsListContext();
  const [filterInput, setFilterInput] = useState('');

  if (validateRequiredData(i18n, followedArtistList)) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 flex-shrink-2 lg:justify-center items-center mb-2 border-b-2 rr-border w-full">
      <h3 className={'h3'}>{i18n.title}</h3>
      <FormInput handleAction={setFilterInput} i18n={i18n.formInput} actionEventTrigger={'onChange'} />
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={filterArtists(filterInput, followedArtistList)}
        onButtonClick={artist => artist?.id && unfollowArtist(artist.id)}
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

export function filterArtists(
  inputValue: string = '',
  followedArtistList: components['schemas']['FollowedArtistDto'][],
): components['schemas']['FollowedArtistDto'][] {
  return followedArtistList.filter(followedArtistList => {
    if (inputValue === ' ' || inputValue.length === 1) {
      return true;
    } else {
      return followedArtistList.name.includes(inputValue);
    }
  });
}
