import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { searchI18n } from '../../components/Search/Search.data';

describe('Search', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Search />);
  });

  it('renders with data', () => {
    const component = render(<Search i18n={searchI18n} />);
    const searchBtn = getByTestId(component.container, 'search-button');

    expect(searchBtn).toHaveTextContent('Search');
    expect(component).toMatchSnapshot();
  });
});
