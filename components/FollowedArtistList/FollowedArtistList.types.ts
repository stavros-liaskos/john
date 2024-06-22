import { ArtistsListI18n } from '../ArtistsList/ArtistsList';

export type ListProps = {
  i18n: {
    title: string;
    filter: string;
    artistList: ArtistsListI18n;
    formInput: {
      label: string;
    };
  };
};
