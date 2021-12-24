import React from 'react';
import { render, getByRole, getAllByText, getByText } from '@testing-library/react';
import Main from 'components/Main/Main';
import { mainI18n } from 'components/Main/Main.data';
import { expect } from '@jest/globals';
import { listData } from 'components/List/List.data';
import { MainProps } from 'components/Main/Main.types';

const setup = (props?: Partial<MainProps>) => {
  const { container } = render(<Main className="" i18n={mainI18n} {...props} />);
  const search = getByText(container, 'Search');
  const unfollowBtns = getAllByText(container, 'unfollow');
  const input = getByRole(container, 'textbox');

  return { container, search, unfollowBtns, input };
};

describe('Main', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Main />);
  });

  it('show List of results ', async () => {
    const { container, search, unfollowBtns } = setup({
      defaultList: listData,
    });

    expect(search).toBeTruthy();
    expect(unfollowBtns.length).toEqual(3);
    expect(container).toMatchSnapshot();
  });
});
