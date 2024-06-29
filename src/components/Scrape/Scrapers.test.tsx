import Scrapers from './Scrapers';
import { setupServer } from 'msw/node';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import { mswAuth, mswFollowedArtists, mswRaccoonUser } from '../../mocks/mockApi';

describe('Scrapers', () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    beforeEachTest();
    server.use(mswFollowedArtists.success(2), mswAuth.success(), mswRaccoonUser.success());
  });

  it('loads spotify in "Scraped" state and lastfm in "Not scraped"', async () => {
    const { findAllByRole } = await renderWithAct(<Scrapers />);

    expect(await findAllByRole('img')).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    const { container } = await renderWithAct(<Scrapers />);

    expect(container).toMatchSnapshot();
  });
});
