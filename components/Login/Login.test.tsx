import React from 'react';
import { fireEvent, renderWithAct } from '../../utils/test-utils';
import Login from './Login';

const props = {
  i18n: {
    welcome: 'Welcome to Release Raccoon!',
    loginBtn: 'Register',
    text: "Receive your favorite artists' music in your email every week!",
    artistsCount: 'Artists',
    releasesCount: 'Releases',
  },
  handleRegister: () => {},
  counters: {
    artistsCounter: 4965,
    releasesCounter: 3816,
  },
};

describe('Login', () => {
  it('renders without data without crashing', async () => {
    // @ts-ignore
    await renderWithAct(<Login />);
  });

  it('renders with data without crashing', async () => {
    const { container } = await renderWithAct(<Login {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('redirects when Register btn is clicked', async () => {
    const handleRegister = jest.fn();
    const { getByText } = await renderWithAct(<Login {...props} handleRegister={handleRegister} />);

    fireEvent.click(getByText(/Register/));
    expect(handleRegister).toHaveBeenCalledTimes(1);
  });
});
