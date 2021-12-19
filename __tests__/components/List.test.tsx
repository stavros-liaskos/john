import React from 'react';
import { getAllByRole, render } from '@testing-library/react';
import List from '../../components/List/List';
import { listData } from '../../components/List/List.data';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('lists 2 artists', () => {
    const { container } = render(<List list={listData} />);
    const artistLogos = getAllByRole(container, 'img');

    expect(artistLogos.length).toEqual(2);
    expect(container).toMatchSnapshot();
  });
});
