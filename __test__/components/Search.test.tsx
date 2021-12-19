import React from 'react';
import { getByRole, getByTestId, getByText, render } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { searchI18n } from '../../components/Search/Search.data';

describe('Search', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Search />);
  });

  it('renders with data', () => {
    const component = render(<Search i18n={searchI18n} />);
    const searchBtn = getByRole(component.container, 'button');

    expect(searchBtn).toHaveTextContent('Search');
    expect(component).toMatchSnapshot();
  });
});
