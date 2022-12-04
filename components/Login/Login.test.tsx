import React from 'react';
import { renderWithAct } from '../../utils/test-utils';
import Login from './Login';

const props = {
  i18n: {
    welcome: 'Welcome to Release Raccoon!',
    loginBtn: 'Register',
    text: "Receive your favorite artists' music in your email every week!",
    artistsCount: 'Artists',
    releasesCount: 'Releases',
  },
};

describe('Login', () => {
  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Login />);
  });

  it('renders login button', async () => {
    const { container, findByText } = await renderWithAct(<Login {...props} />);

    const registerBtn = await findByText(/Register/);
    expect(container).toMatchSnapshot();
    expect(registerBtn.closest('a')).toHaveAttribute('href', '/api/auth/login');
  });
});
