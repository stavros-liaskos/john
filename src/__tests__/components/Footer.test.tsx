import React from 'react';
import { getByText, render } from '@testing-library/react';
import Footer from 'components/Footer/Footer';
import { footerI18n } from 'components/Footer/Footer.data';
import { contain } from '@hapi/hoek';

describe('Footer', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Footer />);
  });

  it('renders with data', () => {
    const { container } = render(<Footer className="" i18n={footerI18n} />);
    const footerPowered = getByText(container, 'Powered by');

    expect(footerPowered).toContainHTML(footerI18n.powered);
    expect(container).toMatchSnapshot();
  });
});
