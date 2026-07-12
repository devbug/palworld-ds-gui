import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ko from './locales/ko';

const LANGUAGE_STORAGE_KEY = 'language';

export const SUPPORTED_LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' }
] as const;

export type TLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export const getSavedLanguage = (): TLanguageCode => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (SUPPORTED_LANGUAGES.some((language) => language.code === saved)) {
    return saved as TLanguageCode;
  }

  return 'ko';
};

export const changeLanguage = (language: TLanguageCode) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  i18n.changeLanguage(language);
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko }
  },
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: {
    // React가 이미 XSS를 방지하므로 이스케이프 불필요
    escapeValue: false
  }
});

export default i18n;
