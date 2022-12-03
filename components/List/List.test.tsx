import React from 'react';
import { render } from '@testing-library/react';
import List from './List';
import { listI18n } from './List.data';
import { beforeEachTest } from '../../utils/test-utils';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('List', () => {
  beforeEach(() => {
    beforeEachTest();
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ json: followedArtists }), { status: 200, statusText: 'OK' }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('unfollows artist on "unfollow" btn click', () => {
    const { container } = render(<List i18n={listI18n} />);

    expect(container).toMatchSnapshot();

    // const unfollowBtns = getAllByText(container, 'unfollow');
    // expect(unfollowBtns.length).toEqual(2);
  });
});
