import React from 'react';
import { getAllByText, render } from '@testing-library/react';
import List from 'components/List/List';
import { listData, listI18n } from 'components/List/List.data';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('lists 2 artists', () => {
    const { container } = render(<List list={listData} i18n={listI18n} />);
    const unfollowBtns = getAllByText(container, 'unfollow');

    expect(unfollowBtns.length).toEqual(3);
    expect(container).toMatchSnapshot();
  });
});
