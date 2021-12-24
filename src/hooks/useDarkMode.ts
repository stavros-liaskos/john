import { useEffect, useState } from 'react';

const isWindow = () => typeof window !== 'undefined';

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(
    isWindow() &&
      (localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)),
  );

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

  return { dark, setDark };
}

export default useDarkMode;
