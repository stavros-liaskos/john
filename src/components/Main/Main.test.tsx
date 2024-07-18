import React from 'react';
import { resetMocks, renderWithAct, initServer } from '../../utils/test-utils';
import Main from './Main';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { mswAuth, mswFollowedArtists, mswRaccoonUser, mswRecommendedArtists } from '../../mocks/mockApi';

describe('Main', () => {
  const server = initServer();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    resetMocks();
    server.use(mswFollowedArtists.success(2));
  });

  it('renders without data without crashing', async () => {
    server.use(mswAuth.success(), mswRecommendedArtists.success(), mswRaccoonUser.success());

    // @ts-ignore
    await renderWithAct(<Main />);
  });

  it('shows registration button', async () => {
    server.use(mswAuth.fail());
    const { findAllByText } = await renderWithAct(
      <UserProvider>
        <Main />
      </UserProvider>,
    );

    expect(await findAllByText(/Register/)).toHaveLength(1);
  });

  it('shows artist search for logged in user', async () => {
    server.use(mswAuth.success(), mswRecommendedArtists.success());

    const { findAllByRole } = await renderWithAct(
      <UserProvider user={{ user: 'john.doe' }}>
        <Main />
      </UserProvider>,
    );

    expect(await findAllByRole('textbox')).toHaveLength(2); // Search, Filter (Recommendations)
  });
});
