import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import Search from './Search';
import { searchI18n } from './Search.data';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import artistSearch from '../../mocks/fixtures/responses/artist-search.json';
import { nockAuth, nockFollowedArtists, nockSearch } from '../../mocks/mockApi';
import { components } from '../../types/schema';

const setup = async () => {
  nockAuth.success();
  nockFollowedArtists.success(2);
  const { container, getByRole } = await renderWithAct(<Search i18n={searchI18n} />);
  const searchBtn = getByRole('button');
  const input = getByRole('textbox');

  return {
    container,
    searchBtn,
    input,
  };
};

describe('Search', () => {
  beforeEach(() => {
    beforeEachTest();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Search />);
  });

  it('should have the query that the user types in the input', async () => {
    const { input } = await setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  // TODO snapshots are wrong! Fix when integrating react testing library
  xit.each<{ searchQuery: string; searchRes: components['schemas']['ArtistSearchResponse']; goal: string }>([
    { searchQuery: 'Sam Gendel', searchRes: artistSearch, goal: 'should handle the search action of the user' },
    { searchQuery: 'No match', searchRes: {}, goal: 'handles no search results' },
  ])('$goal', async ({ searchQuery, searchRes }) => {
    nockSearch.success(searchRes, searchQuery);
    const { container, input, searchBtn } = await setup();

    fireEvent.change(input, { target: { value: searchQuery } });
    await act(async () => {
      fireEvent.click(searchBtn);
    });

    if (searchQuery === 'No match') {
      expect(container).toHaveTextContent(searchI18n.searchList.noArtists);
    }
    expect(container).toMatchSnapshot();
  });
});
