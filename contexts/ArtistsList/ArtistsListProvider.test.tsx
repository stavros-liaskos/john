import { useArtistsListContext } from './ArtistsListContext';
import { cleanup } from '@testing-library/react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('ArtistsListContext', () => {
  beforeEach(() => {
    fetchMock.mockIf(/^https?:\/\/release-raccoon.com.*$/, req => {
      if (req.url.endsWith('/me/followed-artists')) {
        return Promise.resolve({ body: JSON.stringify({ json: followedArtists }) });
      } else {
        return Promise.reject({ status: 404 });
      }
    });

    beforeEachTest();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const ArtistList = () => {
    const { followedArtistList, loading } = useArtistsListContext();
    return (
      <div>
        {loading && <span>Loading</span>}
        {followedArtistList?.rows &&
          followedArtistList.rows.map((artist, key) => <span key={key}>Artist: {artist.name}</span>)}
      </div>
    );
  };

  it('gets/sets followed artists', async () => {
    const { findAllByText } = await renderWithAct(<ArtistList />);

    setTimeout(async () => {
      const artists = await findAllByText(/Artist/i);
      expect(artists).toHaveLength(2);
    }, 200);
  });
});
