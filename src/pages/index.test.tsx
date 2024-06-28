import React from 'react';
import Home from './index.page';
import { beforeEachTest, renderWithAct } from '../utils/test-utils';
import { setupServer } from 'msw/node';
import { mswAuth, mswFollowedArtists, mswRecommendedArtists } from '../mocks/mockApi';

describe('Home', () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    beforeEachTest();
    server.use(mswAuth.success(), mswRecommendedArtists.success(), mswFollowedArtists.success(2));
  });

  it('renders a heading', async () => {
    const component = await renderWithAct(<Home />);
    const { container } = component;

    expect(container).toMatchSnapshot();
  });
});
