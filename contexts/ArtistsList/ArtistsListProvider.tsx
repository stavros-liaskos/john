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
    fetchData().catch(console.error);

    async function fetchData() {
      const data = await fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
        method: 'GET',
        credentials: 'include',
      });
      console.warn(`${process.env.BE_BASE_URL}/me/followed-artists`);
      const json: components['schemas']['FollowedArtistsResponse'] = await data.json();
      json?.rows && setFollowedArtistList(json.rows);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFollowedArtists();
  }, [getFollowedArtists]);

  return (
    <ArtistsListContext.Provider value={{ followedArtistList, getFollowedArtists, loading }}>
      {children}
    </ArtistsListContext.Provider>
  );
};

ArtistsListProvider.whyDidYouRender = true;
export default ArtistsListProvider;
