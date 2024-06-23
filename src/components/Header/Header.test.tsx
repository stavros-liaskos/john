import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { UserProvider } from '@auth0/nextjs-auth0/client';

describe('Header', () => {
  it('hides Logout btn when user is logged out', () => {
    const { findByText } = render(
      <UserProvider>
        <Header />
      </UserProvider>,
    );

    expect(findByText('Logout')).toMatchObject({});
  });

  it('shows Logout btn when user is logged in', async () => {
    const component = render(
      <UserProvider user={{ user: 'john.doe' }}>
        <Header />
      </UserProvider>,
    );

    expect(component.container).toMatchSnapshot();
  });
});
