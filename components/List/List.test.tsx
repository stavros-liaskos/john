import React from 'react';
import { getAllByText, render } from '@testing-library/react';
import List from './List';
import { listData, listI18n } from './List.data';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('unfollows artist on "unfollow" btn click', () => {
    const { container } = render(<List list={listData} i18n={listI18n} />);

    const unfollowBtns = getAllByText(container, 'unfollow');
    expect(unfollowBtns.length).toEqual(3);
    expect(container).toMatchSnapshot();
  });
});
