import React from 'react';
import Home from './index.page';
import { renderWithAct } from '../utils/test-utils';

describe('Home', () => {
  it('renders a heading', async () => {
    const component = await renderWithAct(<Home />);
    const { container } = component;

    // expect(component.getByText('Loading...')).toBe('Loading...');
    expect(container).toMatchSnapshot(); // TODO fix
  });
});
