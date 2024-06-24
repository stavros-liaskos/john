import { useArtistsListContext } from './ArtistsListContext';
import { cleanup } from '@testing-library/react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import { nockAuth, nockFollowedArtists } from '../../mocks/mockApi';

describe('ArtistsListContext', () => {
  beforeEach(() => {
    nockAuth.success();
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
        {followedArtistList.map((artist, key) => (
          <span key={key}>Artist: {artist.name}</span>
        ))}
      </div>
    );
  };

  it('gets/sets followed artists', async () => {
    nockFollowedArtists.success(2);
    const { findAllByText } = await renderWithAct(<ArtistList />);

    const artists = await findAllByText(/Artist/i);
    expect(artists).toHaveLength(2);
  });
});
