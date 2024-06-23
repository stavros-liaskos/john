import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import Search from './Search';
import { searchI18n } from './Search.data';
import { beforeEachTest } from '../../utils/test-utils';
import fetchMock from 'jest-fetch-mock';
import artistSearch from '../../mocks/responses/artist-search.json';

const setup = () => {
  const { container, getByRole } = render(<Search i18n={searchI18n} />);
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

  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Search />);
  });

  it('should have the query that the user types in the input', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  it.each([
    { searchQuery: 'Sam Gendel', searchRes: artistSearch, result: 'should handle the search action of the user' },
    { searchQuery: 'No match', searchRes: { artists: artistSearch }, result: 'handles no search results' },
  ])('$result', async ({ searchQuery, searchRes }) => {
    const { container, input, searchBtn } = setup();
    fetchMock.mockResponseOnce(JSON.stringify(searchRes));

    fireEvent.change(input, { target: { value: searchQuery } });
    await act(() => {
      fireEvent.click(searchBtn);
    });

    if (searchQuery === 'No match') {
      expect(container).toHaveTextContent(searchI18n.searchList.noArtists);
    }
    expect(container).toMatchSnapshot();
  });
});
