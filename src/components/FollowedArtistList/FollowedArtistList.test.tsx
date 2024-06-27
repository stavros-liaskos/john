import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import FollowedArtistList, { filterArtists } from './FollowedArtistList';
import { followedArtistListI18n } from './FollowedArtistList.data';
import { render, renderWithAct } from '../../utils/test-utils';
import followedArtists from '../../mocks/fixtures/responses/followed-artists.json';
import { components } from '../../types/schema';
import { mswAuth, mswFollowedArtists, mswUnfollow } from '../../mocks/mockApi';
import { setupServer } from 'msw/node';

describe('FollowedArtistList', () => {
  const server = setupServer();
  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders artists with "unfollow" btn', async () => {
    server.use(mswFollowedArtists.success(), mswAuth.success());
    const fetchSpy = jest.spyOn(window, 'fetch');
    const component = render(<FollowedArtistList i18n={followedArtistListI18n} />);
    const buttons = await component.findAllByText(followedArtistListI18n.artistList.btnTxt);

    expect(buttons).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('unfollows artist on btn click', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(2), mswUnfollow.success());
    const { findAllByText } = await renderWithAct(<FollowedArtistList i18n={followedArtistListI18n} />);

    let buttons = await findAllByText(followedArtistListI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);

    await act(async () => {
      fireEvent.click(buttons[0]);
    });
  });

  it('matches snapshot', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(2));

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
