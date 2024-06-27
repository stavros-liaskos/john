import { useArtistsListContext } from './ArtistsListContext';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import { mswAuth, mswFollowedArtists } from '../../mocks/mockApi';
import { setupServer } from 'msw/node';

describe('ArtistsListContext', () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    beforeEachTest();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ArtistList = () => {
    const { followedArtistList, loading } = useArtistsListContext();
    return (
      <div>
        {loading && <span>Loading</span>}
        {followedArtistList.map((artist, key) => (
          <span key={key}>Artist: {artist.name}</span>
        ))}
      </div>
    );
  };

  it('gets/sets followed artists', async () => {
    server.use(mswFollowedArtists.success(2), mswAuth.success());
    const { findAllByText } = await renderWithAct(<ArtistList />);

    const artists = await findAllByText(/Artist/i);
    expect(artists).toHaveLength(2);
  });
});
