import nock from 'nock';
import followedArtists from './fixtures/responses/followed-artists.json';
import { components } from '../types/schema';

export const nockAuth = {
  success: () => nockAPI().get(`/api/auth/me`).reply(200),
};

export const nockFollowedArtists = {
  success: (artistQuantity: number = 2) => {
    followedArtists.rows.splice(1, 2 - artistQuantity);
    nockAPI().get('/me/followed-artists').reply(200, followedArtists);
  },
};

export const nockRecommendedArtists = {
  success: () => nockAPI().get('/artists/recommended').query({ page: 0, size: 10 }).reply(200, followedArtists),
};

export const nockScrape = {
  success: () => nockAPI().get('/scrape-taste/spotify').reply(200, {}),
  fail: () => nockAPI().get('/scrape-taste/spotify').reply(200),
};

export const nockFollow = {
  success: () => nockAPI().post('/me/follow').reply(200),
};

export const nockUnfollow = {
  success: () => nockAPI().delete('/me/unfollow').reply(200),
};

export const nockSearch = {
  success: (res: components['schemas']['ArtistSearchResponse'], searchQuery: string) =>
    nockAPI().get('/artist/search').query({ pattern: searchQuery }).reply(200, res),
};

function nockAPI() {
  return nock(process.env.BE_BASE_URL!);
}
