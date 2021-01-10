import 'react-native';

export const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...obj,
});
