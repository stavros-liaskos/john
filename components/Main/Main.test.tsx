import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import { expect } from '@jest/globals';

describe('Main', () => {
  beforeEach(() => beforeEachTest());

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Main />);
  });

  it('show List of results ', async () => {
    const { container } = await renderWithAct(<Main {...props} />);

    // expect(search).toBeTruthy();
    // expect(unfollowBtns.length).toEqual(3);
    expect(container).toMatchSnapshot(); // TODO fix
  });
});
