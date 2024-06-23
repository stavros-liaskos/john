import React from 'react';
import Login from './Login';
import { render } from '@testing-library/react';

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
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Login />);
  });

  it('renders login button', () => {
    const { container } = render(<Login {...props} />);

    expect(container).toMatchSnapshot();
  });
});
