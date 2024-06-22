import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { components } from '../../types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['FollowedArtistDto'][];
  setFollowedArtistList: Dispatch<SetStateAction<components['schemas']['FollowedArtistDto'][]>>;
  loading: boolean;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
