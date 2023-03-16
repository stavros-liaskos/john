import { createContext, useContext } from 'react';

interface ThemeContextType {
  dark?: boolean;
  loaded: boolean;
  setDark: (dark: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  loaded: true,
  setDark: () => {}, // TODO check default
});
ThemeContext.displayName = 'ThemeContext';

export function useThemeContext() {
  return useContext(ThemeContext);
}
