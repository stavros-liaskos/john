import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { ArtistsListContext } from './ArtistsListContext';
import { components } from '../../types/schema';

interface ChildrenProps {
  children: ReactNode;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['ArtistDto'][]>([]);
  const [loading, setLoading] = useState(false);
  const getFollowedArtists = useCallback(() => {
    setLoading(true);

    fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then((followedArtistsResponse: components['schemas']['FollowedArtistsResponse']) => {
        followedArtistsResponse?.rows &&
          JSON.stringify(followedArtistsResponse?.rows) !== JSON.stringify(followedArtistList) &&
          setFollowedArtistList(followedArtistsResponse.rows);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getFollowedArtists();
  }, []);

  return (
    <ArtistsListContext.Provider value={{ followedArtistList, getFollowedArtists, loading }}>
      {children}
    </ArtistsListContext.Provider>
  );
};

ArtistsListProvider.whyDidYouRender = true;
export default ArtistsListProvider;
