import React from 'react';
import { getAllByRole, getAllByTestId, render } from '@testing-library/react';
import List from '../../components/List/List';
import { listData } from '../../components/List/List.data';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('lists 2 artists', () => {
    const component = render(<List list={listData} />);
    const artistLogos = getAllByRole(component.container, 'img');

    expect(artistLogos.length).toEqual(2);
    expect(component).toMatchSnapshot();
  });
});
