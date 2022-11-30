import React from 'react';
import Home from './index.page';
import { renderWithAct } from '../utils/test-utils';
import followedArtists from '../mocks/responses/followed-artists.json';

describe('Home', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ json: followedArtists }), { status: 200, statusText: 'OK' }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a heading', async () => {
    const component = await renderWithAct(<Home />);
    const { container } = component;

    expect(container).toMatchSnapshot(); // TODO fix
  });
});
