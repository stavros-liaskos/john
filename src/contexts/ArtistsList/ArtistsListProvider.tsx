import { FC, ReactNode, useEffect, useState } from 'react';
import { ArtistsListContext } from './ArtistsListContext';
import { components } from '../../types/schema';

interface ChildrenProps {
  children: ReactNode;
}

const ArtistsListProvider: FC<ChildrenProps> = ({ children }) => {
  const [followedArtistList, setFollowedArtistList] = useState<components['schemas']['ArtistDto'][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFollowedArtists();
  }, []);

  return (
    <ArtistsListContext.Provider value={{ followedArtistList, setFollowedArtistList, loading }}>
      {children}
    </ArtistsListContext.Provider>
  );

  async function getFollowedArtists() {
    setLoading(true);
    await fetchData().catch(console.error);

    async function fetchData() {
      const data = await fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
        method: 'GET',
        // credentials: 'include',
      });
      const json: components['schemas']['FollowedArtistsResponse'] = await data.json();
      json?.rows && setFollowedArtistList(json.rows);
      setLoading(false);
    }
  }
};

export default ArtistsListProvider;
