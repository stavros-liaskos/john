import { render } from '@testing-library/react';
import Recommendations from './Recommendations';
import { recommendationsI18n } from './Recommendations.data';

describe('Recommendations', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Recommendations />);
  });

  it('renders all elements', () => {
    const { getByText } = render(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Recommendations i18n={recommendationsI18n} />);
    expect(container).toMatchSnapshot();
  });
});
