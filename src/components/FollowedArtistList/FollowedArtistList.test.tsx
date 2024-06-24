import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import FollowedArtistList, { filterArtists } from './FollowedArtistList';
import { followedArtistListI18n } from './FollowedArtistList.data';
import { beforeEachTest, render, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/fixtures/responses/followed-artists.json';
import { components } from '../../types/schema';
import { nockAuth, nockFollowedArtists, nockUnfollow } from '../../mocks/mockApi';

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
    nockAuth.success();
    nockFollowedArtists.success(2);
    const { findAllByText } = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);

    let buttons = await findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);

    nockUnfollow.success();
    await act(async () => {
      fireEvent.click(buttons[0]);
    });
  });

  it('matches snapshot', async () => {
    nockAuth.success();
    nockFollowedArtists.success(2);

    const component = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);
    let buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
    expect(component.container).toMatchSnapshot();
  });

  describe('filterArtists', () => {
    it.each<{
      inputValue: string;
      followedArtistList: components['schemas']['ArtistDto'][];
      result: components['schemas']['ArtistDto'][];
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
