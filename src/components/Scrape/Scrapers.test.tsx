import Scrapers from './Scrapers';
import { render } from '@testing-library/react';

describe('Scrapers', () => {
  it('matches snapshot', () => {
    const { container } = render(<Scrapers />);

    expect(container).toMatchSnapshot();
  });
});
