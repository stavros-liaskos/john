import React from 'react';
import { render } from '@testing-library/react';
import DarkMode from 'components/DarkMode/DarkMode';
import { LocalStorageMock } from '@react-mock/localstorage';

describe('DarkMode', () => {
  it('show Spotlight on dark mode', () => {
    const { container } = render(
      <LocalStorageMock items={{ theme: 'dark' }}>
        {localStorage.theme === 'dark' && <p>asdf</p>}
        <DarkMode />
      </LocalStorageMock>,
    );

    // todo
    // expect(getByTestId(container, 'spotlight')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  xit('show Moon on light mode', () => {
    // todo
  });
});
