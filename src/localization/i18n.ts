import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en.json";
import tr from "./locales/tr.json";
import fi from "./locales/fi.json";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
  fi: {
    translation: fi,
  },
};

const deviceLanguage =
  Localization.getLocales()[0]?.languageCode ?? "en";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",

    resources,

    lng: deviceLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;