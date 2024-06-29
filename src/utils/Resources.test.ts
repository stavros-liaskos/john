import { setupServer } from 'msw/node';
import { mswRecommendedArtists } from '../mocks/mockApi';
import resources from './Resources';

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
    const fetchedResources = resources.fetch(`${process.env.BE_BASE_URL}/artists/recommended?page=0&size=10`);
    await expect(fetchedResources).resolves.toBe(1);
  });
});
