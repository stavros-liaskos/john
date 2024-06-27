import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { nockAuth, nockFollowedArtists, nockRecommendedArtists } from '../../mocks/mockApi';

describe('Main', () => {
  beforeEach(() => {
    beforeEachTest();
    nockAuth.success();
    nockFollowedArtists.success(2);
  });

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Main />);
  });

  it('shows registration button', async () => {
    nockAuth.success(); // TODO requires two calls for auth. Is it a rerender or expected? Fix
    const { findAllByText } = await renderWithAct(
      <UserProvider>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findAllByText(/Register/)).toHaveLength(1);
  });

  it('shows artist search for logged in user', async () => {
    nockRecommendedArtists.success();
    const { findByRole } = await renderWithAct(
      <UserProvider user={{ user: 'john.doe' }}>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findByRole('textbox')).toBeTruthy();
  });
});
