import ArtistsList, { ArtistsListI18n } from '../ArtistsList/ArtistsList';
import React, { useEffect, useState } from 'react';
import { components } from '../../types/schema';

type RecommendationsI18n = {
  title: string;
  artistList: ArtistsListI18n;
};

const Recommendations = ({ i18n }: { i18n: RecommendationsI18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const [recommendedArtists, setRecommendedArtists] = useState<components['schemas']['FollowedArtistsResponse']>(
    [] as components['schemas']['FollowedArtistsResponse'],
  );

  useEffect(() => {
    // TODO add Suspense for data fetching
    fetchRecommendations(setRecommendedArtists);
  }, []);

  if (!i18n || !i18n.title) {
    return null;
  }

  return (
    <div>
      <h3 className={'rr-text'}>{i18n.title}</h3>
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={recommendedArtists}
        onButtonClick={followArtist}
        artistLoading={artistLoading}
      />
    </div>
  );

  function followArtist() {
    setArtistLoading(1);
    // TODO unite functionality with follow fn from Search
  }
};

export function fetchRecommendations(
  setRecommendedArtists: React.Dispatch<React.SetStateAction<components['schemas']['FollowedArtistsResponse']>>,
) {
  fetch(`${process.env.BE_BASE_URL}/artists/recommended?page=0&size=10`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => res.json())
    .then(result => {
      return setRecommendedArtists(result.artists); // TODO handle no results
    })
    .catch(console.error);
}

export default Recommendations;
