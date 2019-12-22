import en from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';
import ko from 'date-fns/locale/ko';

// need dynamic import
export const getLocaleFromLocaleString = (localeString: string): Locale => {
  if (localeString === 'ko') {
    return ko;
  } else if (localeString === 'ja') {
    return ja;
  } else {
    return en;
  }
};
