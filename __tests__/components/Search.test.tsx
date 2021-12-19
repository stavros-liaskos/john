import React from 'react';
import { getByRole, fireEvent, render } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { searchI18n } from '../../components/Search/Search.data';

const setup = () => {
  const handleSearch = jest.fn();
  const { container } = render(<Search i18n={searchI18n} handleSearch={handleSearch} />);
  const searchBtn = getByRole(container, 'button');
  const input = getByRole(container, 'textbox');

  return {
    handleSearch,
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
    const { handleSearch, container, input, searchBtn } = setup();

    fireEvent.change(input, { target: { value: 'Nels Cline' } });
    fireEvent.click(searchBtn);
    expect(handleSearch).toHaveBeenCalledWith('Nels Cline');
    expect(container).toMatchSnapshot();
  });
});
