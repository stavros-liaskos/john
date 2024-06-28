import followedArtists from './fixtures/responses/followed-artists.json';
import auth from './fixtures/responses/auth.json';
import raccoonUser from './fixtures/responses/raccoon-user.json';
import { components } from '../types/schema';
import { http, HttpResponse } from 'msw';

export const mswAuth = {
  success: () =>
    http.get('/api/auth/me', () => {
      return HttpResponse.json(auth, { status: 200 });
    }),
  fail: () =>
    http.get('/api/auth/me', () => {
      return HttpResponse.error();
    }),
};

export const mswFollowedArtists = {
  success: (artistQuantity: number = 2) => {
    followedArtists.rows.splice(1, 2 - artistQuantity);
    return http.get('/me/followed-artists', () => {
      return HttpResponse.json(followedArtists, { status: 200 });
    });
  },
};

export const mswRecommendedArtists = {
  success: () =>
    http.get('/artists/recommended', () => {
      return HttpResponse.json(followedArtists, { status: 200 });
    }),
};

export const mswScrape = {
  success: () =>
    http.get('/scrape-taste/spotify', () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  fail: () =>
    http.get('/scrape-taste/spotify', () => {
      return HttpResponse.error();
    }),
};

export const mswFollow = {
  success: () =>
    http.post('/me/follow', () => {
      return HttpResponse.json('OK', { status: 200 });
    }),
  fail: () =>
    http.post('/me/follow', () => {
      return HttpResponse.error();
    }),
};

export const mswUnfollow = {
  success: () =>
    http.delete('/me/unfollow', () => {
      return HttpResponse.json('OK', { status: 200 });
    }),
};

export const mswSearch = {
  success: (res: components['schemas']['ArtistSearchResponse']) =>
    http.get('/artist/search', () => {
      return HttpResponse.json(res, { status: 200 });
    }),
};

export const mswRaccoonUser = {
  success: () =>
    http.get('/raccoon-user', () => {
      return HttpResponse.json(raccoonUser, { status: 200 });
    }),
};
