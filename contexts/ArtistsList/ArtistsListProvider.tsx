import { FC, ReactNode, useEffect, useState } from 'react';
import { ArtistsListContext } from './ArtistsListContext';
import { components } from '../../types/schema';
import { getFollowedArtists } from '../../utils/getFollowedArtists';

interface ChildrenProps {
  children: ReactNode;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['FollowedArtistsResponse']>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFollowedArtists(setFollowedArtistList, setLoading);
  }, []);

  return (
    <ArtistsListContext.Provider value={{ followedArtistList, setFollowedArtistList, loading }}>
      {children}
    </ArtistsListContext.Provider>
  );
};

export default ArtistsListProvider;
