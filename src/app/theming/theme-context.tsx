import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
