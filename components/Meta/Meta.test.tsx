import React from 'react';
import Meta from './Meta';
import { render } from '@testing-library/react';

describe('Meta', () => {
  it('renders without data without crashing', () => {
    render(<Meta />);
  });
});
