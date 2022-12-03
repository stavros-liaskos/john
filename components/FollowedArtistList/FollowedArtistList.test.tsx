import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import FollowedArtistList from './FollowedArtistList';
import { listI18n } from './FollowedArtistList.data';
import { beforeEachTest } from '../../utils/test-utils';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('List', () => {
  let originFetch: {
    (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  };
  beforeEach(() => {
    originFetch = global.fetch;

    beforeEachTest();
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ json: followedArtists }), { status: 200, statusText: 'OK' }));
  });

  afterEach(() => {
    global.fetch = originFetch;
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', async () => {
    await act(() => {
      // @ts-ignore
      render(<FollowedArtistList />);
    });
  });

  it('renders artists with "unfollow" btn', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    const container = render(<FollowedArtistList i18n={listI18n} />);
    const buttons = await waitFor(() => container.getAllByText('unfollow'));
    expect(buttons).toHaveLength(2);
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mRes.json).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();
  });
});
