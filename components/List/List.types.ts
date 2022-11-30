import { components } from '../../types/schema';

export interface ListProps {
  list: components['schemas']['ArtistDto'][];
  i18n: { unfollow: string };
}
