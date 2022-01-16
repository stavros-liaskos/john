import React from 'react';
import { getByRole, fireEvent, render } from '@testing-library/react';
import Search from './Search';
import { searchI18n } from './Search.data';

const setup = () => {
  const { container } = render(<Search i18n={searchI18n} />);
  const searchBtn = getByRole(container, 'button');
  const input = getByRole(container, 'textbox');

  return {
    container,
    searchBtn,
    input,
  };
};

describe('Search', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Search />);
  });

  it('should have the query that the user types in the input', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    expect(input).toHaveValue('Nels Cline');
  });

  it('should handle the search action of the user', () => {
    const { container, input, searchBtn } = setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    fireEvent.click(searchBtn);
    // TODO add nock
    // expect(handleSearch).toHaveBeenCalledWith('Nels Cline');
    expect(container).toMatchSnapshot();
  });
});
