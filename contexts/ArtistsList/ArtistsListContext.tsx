import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { components } from '../../types/schema';

interface ArtistsListContextType {
  followedArtistList: components['schemas']['ArtistDto'][];
  setFollowedArtistList: Dispatch<SetStateAction<components['schemas']['ArtistDto'][]>>;
  loading: boolean;
}

export const ArtistsListContext: React.Context<ArtistsListContextType> = createContext<ArtistsListContextType>(
  undefined as unknown as ArtistsListContextType,
);
ArtistsListContext.displayName = 'ArtistsListContext';

export function useArtistsListContext() {
  return useContext(ArtistsListContext);
}
