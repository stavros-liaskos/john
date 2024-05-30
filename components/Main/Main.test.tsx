import React from 'react';
import { beforeEachTest, renderWithAct } from '../../utils/test-utils';
import Main from './Main';
import props from './Main.data';
import followedArtists from '../../mocks/responses/followed-artists.json';
import { UserProvider } from '@auth0/nextjs-auth0/client';
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

  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Main />);
  });

  it('shows registration button', async () => {
    const { findAllByText } = await renderWithAct(
      <UserProvider>
        <Main {...props} />
      </UserProvider>,
    );

    expect(await findAllByText(/Register/)).toHaveLength(1);
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
