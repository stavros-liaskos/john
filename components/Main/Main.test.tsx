import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import { expect } from '@jest/globals';
import followedArtists from '../../mocks/responses/followed-artists.json';

describe('Main', () => {
  beforeEach(() => {
    beforeEachTest();
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ json: followedArtists }), { status: 200, statusText: 'OK' }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Main />);
  });

  xit('show List of results ', async () => {
    const { container } = await renderWithAct(<Main {...props} />);

    // expect(search).toBeTruthy();
    // expect(unfollowBtns.length).toEqual(3);
    expect(container).toMatchSnapshot(); // TODO fix
  });
});
