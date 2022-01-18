import React from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import Spotlight from '../Icons/spotlight';
import Moon from '../Icons/moon';

const DARK_MODE_ICON_SIZE = 28;

const DarkMode: React.FunctionComponent = () => {
  const { dark, loaded, setDark } = useDarkMode();

  return (
    <button className="m-3" onClick={() => setDark(!dark)} data-testid={dark && loaded ? 'spotlight' : ''}>
      {dark && loaded ? (
        <Spotlight colour="white" width={DARK_MODE_ICON_SIZE} height={DARK_MODE_ICON_SIZE} />
      ) : (
        <Moon width={DARK_MODE_ICON_SIZE} height={DARK_MODE_ICON_SIZE} />
      )}
    </button>
  );
};

export default DarkMode;
