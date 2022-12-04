import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
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
  });

  afterEach(() => {
    global.fetch = originFetch;
    jest.restoreAllMocks();
  });

  it('renders artists with "unfollow" btn', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const container = render(<FollowedArtistList i18n={listI18n} />);
    const buttons = await container.findAllByText('unfollow');

    expect(buttons).toHaveLength(2);
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mRes.json).toBeCalledTimes(1);

    expect(container).toMatchSnapshot();
  });

  it('unfollows artist on btn click', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const { findAllByText } = render(<FollowedArtistList i18n={listI18n} />);

    const buttons = await findAllByText('unfollow');

    expect(buttons).toHaveLength(2);
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mRes.json).toBeCalledTimes(1);

    const mRes1 = { json: jest.fn().mockResolvedValueOnce('OK') };
    global.fetch = jest.fn().mockResolvedValueOnce(mRes1);

    const logSpy = jest.spyOn(console, 'log');
    await act(() => {
      fireEvent['click'](buttons[0]);
    });
    const artists = await findAllByText('unfollow');
    expect(logSpy).toBeCalledWith('1700 successfully unfollowed');
    expect(artists).toHaveLength(1);
  });
});
