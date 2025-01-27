import ArtistsList, { ArtistsListI18n } from '../ArtistsList/ArtistsList';
import React from 'react';
import { components } from '../../types/schema';
import followArtist from '../../utils/followArtist';
import resources from '../../utils/Resources';
import Endpoints from '../../types/endpoints';

type RecommendationsI18n = {
  title: string;
  artistList: ArtistsListI18n;
};

const Recommendations = ({ i18n }: { i18n: RecommendationsI18n }) => {
  const [artistLoading, setArtistLoading] = React.useState<number>(0);
  const url = `${Endpoints.Recommended}?page=1&size=10`;

  const { rows: recommendedArtists } = resources.fetch(url) as components['schemas']['FollowedArtistsResponse'];

  if (!i18n || !i18n.title) {
    return null;
  }

  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full">
      <h3 className={'h3'}>{i18n.title}</h3>
      <ArtistsList
        i18n={i18n.artistList}
        artistsList={recommendedArtists!}
        onButtonClick={handleFollow}
        artistLoading={artistLoading}
      />
    </div>
  );

  async function handleFollow(artist: components['schemas']['SearchResultArtistDto']) {
    artist?.id && setArtistLoading(artist.id);

    const resetArtistLoadingSpinner = () => {
      artistLoading && setArtistLoading(0);
    };
    await followArtist(artist, resetArtistLoadingSpinner);
  }
};

Recommendations.whyDidYouRender = true;
export default Recommendations;
