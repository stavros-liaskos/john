import { useEffect, useState } from 'react';

const isWindow = () => typeof window !== 'undefined';

function useDarkMode() {
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

  return { dark, loaded, setDark };
}

export default useDarkMode;
