export interface ListEl {
  followedByUser: boolean;
  name: string;
  lastfmUri?: string;
  spotifyUri?: string;
}

export interface ListI18n {
  unfollow: string;
}

export interface ListProps {
  list?: ListEl[];
  i18n: ListI18n;
}
