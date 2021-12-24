export interface ListEl {
  name: string;
  lastFmUrl?: string;
  spotifyUrl?: string;
}

export interface ListI18n {
  unfollow: string;
}

export interface ListProps {
  list?: ListEl[];
  i18n: ListI18n;
}
