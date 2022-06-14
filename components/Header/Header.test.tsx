import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { UserProvider } from '@auth0/nextjs-auth0';

describe('Header', () => {
  it('hides Logout btn when user is logged out', () => {
    const component = render(
      <UserProvider>
        <Header />
      </UserProvider>,
    );

    expect(component.findByText('Logout')).toMatchObject({});
  });

  it('shows Logout btn when user is logged in', () => {
    const component = render(
      <UserProvider user={{ user: 'john.doe' }}>
        <Header />
      </UserProvider>,
    );

    const { container } = component;

    expect(component.findByText('Logout')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
