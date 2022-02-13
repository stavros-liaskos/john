import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Button />);
  });

  it('renders an enabled button by default and not a loading spinner', () => {
    const { container } = render(<Button i18n="Click Me!" />);

    // TODO validate disabled attribute
    // TODO validate spinner doesn't exist
    expect(container).toMatchSnapshot();
  });

  it('renders a disabled button', () => {
    const { container } = render(<Button i18n="No Action" disabled={true} />);

    // TODO validate disabled attribute
    expect(container).toMatchSnapshot();
  });

  it('renders a spinner when loading', () => {
    const { container } = render(<Button i18n="No Action" loading={true} />);

    // TODO validate spinner exists
    expect(container).toMatchSnapshot();
  });

  it('calls to action when button clicked', () => {
    const clickHandler = jest.fn();
    const { container } = render(<Button i18n="Click Me!" loading={true} onClick={clickHandler} />);

    // TODO clickHandler have been called
    expect(container).toMatchSnapshot();
  });
});
