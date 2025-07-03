import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import RU from './locales/ru.json';
import EN from './locales/en.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    "en": EN,
    "ru": RU,
    "ru-RU": RU,
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en', 'ru-RU', 'ru'],
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false
        }
    });

console.debug(i18n.language)

export default i18n;