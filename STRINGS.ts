import * as Localization from 'react-native-localize';

import en from './assets/langs/en.json';
import i18n from 'i18n-js';
import ko from './assets/langs/ko.json';

const locales = Localization.getLocales();

if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageTag;
}

i18n.fallbacks = true;
i18n.translations = { en, ko };

export const getString = (param: string, mapObj?: Record<string, unknown>): string => {
  if (mapObj) {
    return i18n.t(param, mapObj);
  }
  return i18n.t(param);
};
