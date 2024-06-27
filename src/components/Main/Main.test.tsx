import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { mswAuth, mswFollowedArtists, mswRecommendedArtists } from '../../mocks/mockApi';
import { setupServer } from 'msw/node';

describe('Main', () => {
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
    server.use(mswFollowedArtists.success(2));
  });

  it('renders without data without crashing', async () => {
    server.use(mswAuth.success());
    await renderWithAct(<Main />);
  });

  it('shows registration button', async () => {
    server.use(mswAuth.fail());
    const { findAllByText } = await renderWithAct(
      <UserProvider>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findAllByText(/Register/)).toHaveLength(1);
  });

  it('shows artist search for logged in user', async () => {
    server.use(mswAuth.success(), mswRecommendedArtists.success());

    const { findAllByRole } = await renderWithAct(
      <UserProvider user={{ user: 'john.doe' }}>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findAllByRole('textbox')).toHaveLength(2); // Search, Filter (Recommendations)
  });
});
