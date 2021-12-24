import React from 'react';
import { render } from '@testing-library/react';
import Meta from 'components/Meta/Meta';

describe('Meta', () => {
  it('renders without data without crashing', () => {
    const component = render(<Meta />);
    expect(component).toMatchSnapshot();
  });
});
