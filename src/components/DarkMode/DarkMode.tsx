import React from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import Spotlight from '../Icons/spotlight';
import Moon from '../Icons/moon';

const DarkMode: React.FunctionComponent = () => {
  const { dark, setDark } = useDarkMode();

  return (
    <>
      {dark ? (
        <button onClick={() => setDark(!dark)} data-testid="spotlight">
          <Spotlight />
        </button>
      ) : (
        <button onClick={() => setDark(!dark)}>
          <Moon />
        </button>
      )}
    </>
  );
};

export default DarkMode;
