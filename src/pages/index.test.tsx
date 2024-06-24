import React from 'react';
import Home from './index.page';
import { renderWithAct } from '../utils/test-utils';
// import followedArtists from '../mocks/responses/followed-artists.json';

const user = {
  given_name: 'John',
  family_name: 'Doe',
  nickname: 'Johnny',
  name: 'John Doe',
  picture: 'https://lh3.googleusercontent.com/a/<uuid>',
  locale: 'en',
  updated_at: '2022-12-02T11:30:32.374Z',
  email: 'john.doe@gmail.com',
  email_verified: true,
  sub: 'google-oauth2|<hash>',
  sid: 'sid',
};

describe('Home', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ json: user }), { status: 200, statusText: 'OK' }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a heading', async () => {
    const component = await renderWithAct(<Home />);
    const { container } = component;

    expect(container).toMatchSnapshot();
  });
});
