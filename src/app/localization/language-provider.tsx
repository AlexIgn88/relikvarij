import React, { FC, useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { Locale } from './i18n';
import { LanguageContext } from './language-context';

type Props = {
  children: React.ReactNode;
};

const LanguageProvider: FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<Locale>((localStorage.getItem('lang') as Locale) || Locale.en);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
