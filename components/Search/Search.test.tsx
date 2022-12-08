import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Search from './Search';
import { searchI18n } from './Search.data';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import fetchMock from 'jest-fetch-mock';
import followedArtists from '../../mocks/responses/followed-artists.json';
import artistSearch from '../../mocks/responses/artist-search.json';

const setup = async () => {
  const { container, findByRole } = await renderWithAct(<Search i18n={searchI18n} />);
  const searchBtn = await findByRole('button');
  const input = await findByRole('textbox');

  return {
    container,
    searchBtn,
    input,
  };
};

describe('Search', () => {
  beforeEach(() => {
    beforeEachTest();

    fetchMock.mockIf(/^https?:\/\/release-raccoon.com.*$/, req => {
      if (req.url.endsWith('/me/followed-artists')) {
        return Promise.resolve({ body: JSON.stringify({ json: followedArtists }) });
      } else {
        return Promise.reject({ status: 404 });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Search />);
  });

  it('should have the query that the user types in the input', async () => {
    const { input } = await setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  it('should handle the search action of the user', async () => {
    const { container, input, searchBtn } = await setup();

    fetchMock.mockIf(/^https?:\/\/release-raccoon.com.*$/, req => {
      if (req.url.endsWith('Nels+Cline')) {
        return Promise.resolve({ body: JSON.stringify({ json: artistSearch }) });
      } else {
        return Promise.reject({ status: 404 });
      }
    });

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    await act(() => {
      fireEvent.click(searchBtn);
    });
    // TODO add nock
    // expect(handleSearch).toHaveBeenCalledWith('Nels Cline');
    expect(container).toMatchSnapshot();
  });
});
