/**
 * monkey patching the locale to avoid the error:
 * Something went wrong initializing the native ReactLocalization module
 * https://gist.github.com/MoOx/08b465c3eac9e36e683929532472d1e0
 */

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

const toLocaleString = Date.prototype.toLocaleString;
// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleString = (locale = 'en-US', ...args): string => {
  return toLocaleString.call(this, locale, ...args);
};
