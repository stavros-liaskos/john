import { FunctionComponent, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const isWindow = () => typeof window !== 'undefined';

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [dark, setDark] = useState<boolean>(
    isWindow() &&
      (localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (dark) {
      root.classList.add('dark');
      isWindow() && localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      isWindow() && localStorage.removeItem('theme');
    }
  }, [dark, setDark]);

  return <ThemeContext.Provider value={{ dark, loaded, setDark }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;