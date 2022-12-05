import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { components } from '../../types/schema';

interface ArtistsListContextType {
  followedArtistList?: components['schemas']['FollowedArtistsResponse'];
  setFollowedArtistList?: Dispatch<SetStateAction<components['schemas']['FollowedArtistsResponse'] | undefined>>;
}

export const ArtistsListContext = createContext<ArtistsListContextType>( {} );
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
