import ArtistsList, { ArtistsListI18n } from '../ArtistsList/ArtistsList';
import React, { useEffect, useState } from 'react';
import { components } from '../../types/schema';
import { followArtist } from '../../utils/followArtist';

type RecommendationsI18n = {
  title: string;
  artistList: ArtistsListI18n;
};

const Recommendations = ({ i18n }: { i18n: RecommendationsI18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const [recommendedArtists, setRecommendedArtists] = useState<components['schemas']['FollowedArtistDto'][]>([]);

  useEffect(() => {
    // TODO add Suspense for data fetching
    fetchRecommendations(setRecommendedArtists);
  }, []);

  if (!i18n || !i18n.title) {
    return null;
  }

  return (
    <div className="flex flex-col flex-2 basis-24 lg:justify-center items-center mb-2 w-full">
      <h3 className={'h3'}>{i18n.title}</h3>
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={recommendedArtists}
        onButtonClick={handleFollow}
        artistLoading={artistLoading}
      />
    </div>
  );

  async function handleFollow(artist: components['schemas']['SearchResultArtistDto']) {
    artist?.id && setArtistLoading(artist.id);

    const finallyCb = () => {
      artistLoading && setArtistLoading(0);
    };
    await followArtist(artist, finallyCb);
  }
};

export function fetchRecommendations(
  setRecommendedArtists: React.Dispatch<React.SetStateAction<components['schemas']['FollowedArtistDto'][]>>,
) {
  fetch(`${process.env.BE_BASE_URL}/artists/recommended?page=0&size=10`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => res.json())
    .then((result: components['schemas']['FollowedArtistsResponse']) => {
      result?.rows && setRecommendedArtists(result?.rows);
    })
    .catch(console.error);
}

export default Recommendations;
