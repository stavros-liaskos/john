import { FC, ReactElement, useEffect, useState } from 'react';
import { ArtistsListContext } from './ArtistsListContext';
import { components } from '../../types/schema';
import { getFollowedArtists } from '../../utils/getFollowedArtists';

interface ChildrenProps {
  children: ReactElement;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['FollowedArtistsResponse'] | undefined>();

  useEffect(() => {
    getFollowedArtists(setFollowedArtistList);
  }, []);

  return <ArtistsListContext.Provider value={{ followedArtistList, setFollowedArtistList }}>{children}</ArtistsListContext.Provider>;
};

export default ArtistsListProvider;