import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

export enum Locale {
  en = 'en',
  ru = 'ru',
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || Locale.en,
  interpolation: { escapeValue: false },
});

export default i18n;
