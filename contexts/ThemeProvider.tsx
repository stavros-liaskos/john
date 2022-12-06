import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const isWindow = () => typeof window !== 'undefined';

interface ChildrenProps {
  children: ReactElement;
}

const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(isWindow() && localStorage.theme);
  const [loaded, setLoaded] = useState(false);

  const value = useMemo(() => ({ dark, loaded, setDark }), [dark, loaded]);
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
  }, [dark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
