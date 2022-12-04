import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import { expect } from '@jest/globals';
import followedArtists from '../../mocks/responses/followed-artists.json';
import { UserProvider } from '@auth0/nextjs-auth0';
import fetchMock from 'jest-fetch-mock';

describe('Main', () => {
  beforeEach(() => {
    beforeEachTest();

    fetchMock.mockIf(/^https?:\/\/release-raccoon.com.*$/, req => {
      if (req.url.endsWith('/me/followed-artists')) {
        return Promise.resolve({ body: JSON.stringify({ json: followedArtists }) });
      } else {
        return Promise.reject({ status: 404 });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Main />);
  });

  it('shows registration button', async () => {
    const { findByText } = await renderWithAct(
      <UserProvider>
        <Main {...props} />
      </UserProvider>,
    );

    const registerBtn = await findByText(/Register/);
    expect(registerBtn.closest('a')).toHaveAttribute('href', '/api/auth/login');
  });

  it('shows artist search for logged in user', async () => {
    const { findByText } = await renderWithAct(
      <UserProvider user={{ user: 'john.doe' }}>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findByText('Search')).toBeTruthy();
  });
});
