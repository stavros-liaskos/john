import React from 'react';
import Sun from '../Icons/sun';
import Moon from '../Icons/moon';
import { useThemeContext } from '../../contexts/Theme/ThemeContext';

const DARK_MODE_ICON_SIZE = 28;

const DarkMode: React.FunctionComponent = () => {
  const { dark, loaded, setDark } = useThemeContext();

  return (
    <button className="m-3" onClick={() => setDark(!dark)} data-testid={dark && loaded ? 'sun' : 'moon'}>
      {dark && loaded ? (
        <Sun colour="white" width={DARK_MODE_ICON_SIZE} height={DARK_MODE_ICON_SIZE} />
      ) : (
        <Moon width={DARK_MODE_ICON_SIZE} height={DARK_MODE_ICON_SIZE} />
      )}
    </button>
  );
};

export default DarkMode;
