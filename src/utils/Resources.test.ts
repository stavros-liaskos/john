import { mswRecommendedArtists } from '../mocks/mockApi';
import resources from './Resources';
import Endpoints from '../types/endpoints';
import { initServer } from './test-utils';

xdescribe('Resources', () => {
  const server = initServer();

  it('fetches resource', async () => {
    server.use(mswRecommendedArtists.success());
    const fetchedResources = resources.fetch(`${Endpoints.Recommended}?page=1&size=10`);
    await expect(fetchedResources).resolves.toBe(1);
  });
});
