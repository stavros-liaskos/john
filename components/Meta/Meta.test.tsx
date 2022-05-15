import React from 'react';
import Meta from './Meta';
import { renderWithAct } from '../../utils/test-utils';

describe('Meta', () => {
  it('renders without data without crashing', async () => {
    await renderWithAct(<Meta />);
  });
});
