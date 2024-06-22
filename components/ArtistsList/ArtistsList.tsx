import { components } from '../../types/schema';
import React from 'react';
import List from './components/List/List';

export type ArtistsListI18n = {
  btnTxt: string;
  noArtists: string;
};

export type ArtistsListProp = {
  i18n: ArtistsListI18n;
  artistsList: components['schemas']['FollowedArtistDto'][];
  onButtonClick: (artistID: number) => void;
  artistLoading: number;
};

const ArtistsList = ({ i18n, artistsList, onButtonClick, artistLoading }: ArtistsListProp) => {
  if (!i18n || !i18n.btnTxt || !i18n.noArtists || !onButtonClick) {
    return null;
  }

  return (
    <div className="overflow-auto w-full">
      {!artistsList?.length ? (
        <p className="rr-text">{i18n.noArtists}</p>
      ) : (
        <List artistsList={artistsList} i18n={i18n} onButtonClick={onButtonClick} artistLoading={artistLoading} />
      )}
    </div>
  );
};

export default ArtistsList;
