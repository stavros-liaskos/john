import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import FollowedArtistList, { filterArtists } from './FollowedArtistList';
import { followedArtistListI18n } from './FollowedArtistList.data';
import { beforeEachTest, render, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/responses/followed-artists.json';
import { components } from '../../types/schema';

describe('FollowedArtistList', () => {
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

    const component = render(<FollowedArtistList i18n={followedArtistListI18n} />);
    const buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);

    expect(buttons).toHaveLength(2);
    // expect(mockedFetch).toHaveBeenCalledTimes(1); // TODO fix
    expect(mRes.json).toHaveBeenCalledTimes(1);
  });

  it('unfollows artist on btn click', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const { findAllByText } = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);

    const buttons = await findAllByText(followedArtistListI18n.artistList.btnTxt);

    expect(buttons).toHaveLength(2);
    // expect(mockedFetch).toBeCalledTimes(1); TODO fix
    expect(mRes.json).toBeCalledTimes(1);

    const mRes1 = { json: jest.fn().mockResolvedValueOnce('OK') };
    global.fetch = jest.fn().mockResolvedValueOnce(mRes1);

    const logSpy = jest.spyOn(console, 'log');
    await act(async () => {
      await act(() => {
        fireEvent.click(buttons[0]);
      });
    });
    const artists = await findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(logSpy).toBeCalledWith('1700 successfully unfollowed');
    expect(artists).toHaveLength(1);
  });

  it('matches snapshot', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const component = render(<FollowedArtistList i18n={followedArtistListI18n} />);
    await act(() => {});

    expect(component.container).toMatchSnapshot();
  });

  describe('filterArtists', () => {
    it.each<{
      inputValue: string;
      followedArtistList: components['schemas']['FollowedArtistDto'][];
      result: components['schemas']['FollowedArtistDto'][];
    }>([
      { inputValue: '', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: ' ', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: '1', followedArtistList: followedArtists.rows, result: followedArtists.rows },
      { inputValue: 'noMatch', followedArtistList: followedArtists.rows, result: [] },
      {
        inputValue: 'Ill Considered',
        followedArtistList: followedArtists.rows,
        result: followedArtists.rows.slice(-1),
      },
    ])('returns filtered artists for input $inputValue', ({ inputValue, followedArtistList, result }) => {
      expect(filterArtists(inputValue, followedArtistList)).toEqual(result);
    });
  });
});
