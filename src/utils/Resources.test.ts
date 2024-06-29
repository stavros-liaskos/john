import { setupServer } from 'msw/node';
import { mswRecommendedArtists } from '../mocks/mockApi';
import resources from './Resources';
import Endpoints from '../types/endpoints';

xdescribe('Resources', () => {
  const server = setupServer();
  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('fetches resource', async () => {
    server.use(mswRecommendedArtists.success());
    const fetchedResources = resources.fetch(`${Endpoints.Recommended}?page=0&size=10`);
    await expect(fetchedResources).resolves.toBe(1);
  });
});
