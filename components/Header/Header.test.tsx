import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { renderWithAct } from '../../utils/test-utils';

describe('Header', () => {
  // TODO write test
  it('shows Logout btn when user is logged in', async () => {
    const { container } = await renderWithAct(<Header />);

    expect(container).toMatchSnapshot();
  });

  xit('hides Logout btn when user is logged out', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
