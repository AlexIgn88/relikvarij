import React, { ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import { Theme, ThemeContext, Themes } from './theme-context';

const STORAGE_KEY = 'theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return Themes.light;
    return (localStorage.getItem(STORAGE_KEY) as Theme) || Themes.light;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    const html = document.documentElement;
    html.classList.remove(Themes.light, Themes.dark);
    html.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === Themes.light ? Themes.dark : Themes.light));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
