import React from 'react';
import { useLanguage } from 'src/app/localization/useLanguage';
import { Locale } from 'src/app/localization/i18n';
import s from './language-toggle.module.scss';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === Locale.en ? Locale.ru : Locale.en);
  };

  return (
    <button onClick={toggleLanguage} className={s.button}>
      {language === Locale.en ? 'EN' : 'RU'}
    </button>
  );
};

export default LanguageToggle;
