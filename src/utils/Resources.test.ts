import { mswRecommendedArtists } from '../mocks/mockApi';
import resources from './Resources';
import Endpoints from '../types/endpoints';
import { initServer } from './test-utils';

describe('Resources', () => {
  const server = initServer();

  it('throws a promise that Suspense can use', () => {
    server.use(mswRecommendedArtists.success());
    try {
      resources.fetch(`${Endpoints.Recommended}?page=1&size=10`);
    } catch (e) {
      expect(e).toBeInstanceOf(Promise);
    }
  });
});
