import { createContext } from 'react';
import { Locale } from './i18n';

export type LanguageContextType = {
  language: Locale;
  setLanguage: (lang: Locale) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: Locale.en,
  setLanguage: () => null,
});
