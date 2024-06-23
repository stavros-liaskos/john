import { ArtistsListI18n } from '../ArtistsList/ArtistsList';

export interface SearchI18n {
  button: string;
  label: string;
  searchList: ArtistsListI18n;
}

export interface SearchProps {
  i18n: SearchI18n;
}
