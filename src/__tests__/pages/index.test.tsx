import React from 'react';
import { render } from '@testing-library/react';
import Home from 'pages/index';

describe('Index (Home)', () => {
  it('renders a heading', () => {
    const component = render(<Home />);

    const main = component.queryAllByRole('main');

    expect(main.length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});
