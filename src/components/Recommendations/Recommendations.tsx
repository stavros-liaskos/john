import ArtistsList, { ArtistsListI18n } from '../ArtistsList/ArtistsList';
import React, { useState } from 'react';
import { components } from '../../types/schema';
import { followArtist } from '../../utils/followArtist';
import resources from '../../utils/Resources';

type RecommendationsI18n = {
  title: string;
  artistList: ArtistsListI18n;
};

const Recommendations = ({ i18n }: { i18n: RecommendationsI18n }) => {
  const [artistLoading, setArtistLoading] = useState<number>(0);
  const url = `${process.env.BE_BASE_URL}/artists/recommended?page=0&size=10`;

  const recommendedArtists = resources.fetch(url);

  if (!i18n || !i18n.title) {
    return null;
  }

  return (
    <div className="flex flex-col flex-2 basis-24 lg:justify-center items-center mb-2 w-full">
      <h3 className={'h3'}>{i18n.title}</h3>
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={recommendedArtists.rows}
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

Recommendations.whyDidYouRender = true;
export default Recommendations;
